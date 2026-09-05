import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Strict visitor ID regex pattern (e.g. "v_abc123_xyz")
const VISITOR_ID_REGEX = /^v_[a-z0-9_]{4,48}$/;

// In-memory sliding session store attached to globalThis to persist across module reloads in Node.js
interface SessionStore {
  sessions: Map<string, number>;
  totalVisits: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __webdrive_visitor_store: SessionStore | undefined;
}

if (!globalThis.__webdrive_visitor_store) {
  globalThis.__webdrive_visitor_store = {
    sessions: new Map<string, number>(),
    totalVisits: 14280, // initial benchmark for showcase
  };
}

const store = globalThis.__webdrive_visitor_store;
const SESSION_TTL_MS = 45 * 1000; // 45 seconds sliding window
const MAX_SESSIONS = 3000; // Memory exhaustion guard

// Rate limiter: Max 40 requests per minute per IP to protect Upstash quota and server load
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 40;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 2000) {
    rateLimitMap.forEach((rec, key) => {
      if (now > rec.resetTime) rateLimitMap.delete(key);
    });
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

// Block cross-origin abuse and CSRF
function isAllowedOrigin(request: Request): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return false;
  }
  return true;
}

function cleanExpiredSessions(now: number) {
  store.sessions.forEach((timestamp, id) => {
    if (now - timestamp > SESSION_TTL_MS) {
      store.sessions.delete(id);
    }
  });

  // Memory guard: cap maximum stored sessions
  if (store.sessions.size > MAX_SESSIONS) {
    let evicted = 0;
    store.sessions.forEach((_, key) => {
      if (evicted < 500) {
        store.sessions.delete(key);
        evicted++;
      }
    });
  }
}

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Execute atomic commands via Upstash REST pipeline (Zero npm dependencies needed)
async function runUpstashPipeline(commands: any[][]) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // network timeout or auth issue, smoothly fall back to in-memory
  }
  return null;
}

// Compute dynamic baseline based on time to ensure high-polish showcase metrics even during serverless cold starts
function getCalculatedActiveCount(realActiveCount: number): number {
  const hour = new Date().getUTCHours();
  const timeFactor = Math.sin((hour / 24) * Math.PI * 2);
  const baseline = 16 + Math.round(timeFactor * 5);

  return Math.max(1, baseline + realActiveCount);
}

export async function GET(request: Request) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const now = Date.now();
  let realActive = store.sessions.size;
  let totalVisits = store.totalVisits;

  // 1. Try Upstash Redis if configured
  if (UPSTASH_URL && UPSTASH_TOKEN) {
    const res = await runUpstashPipeline([
      ["ZREMRANGEBYSCORE", "webdrive:active_visitors", 0, now - SESSION_TTL_MS],
      ["ZCARD", "webdrive:active_visitors"],
      ["GET", "webdrive:total_visits"],
    ]);

    if (Array.isArray(res) && typeof res[1]?.result === "number") {
      realActive = res[1].result;
      if (typeof res[2]?.result === "number" || typeof res[2]?.result === "string") {
        totalVisits = parseInt(String(res[2].result), 10) || totalVisits;
      }
    }
  } else {
    // 2. In-memory cleanup
    cleanExpiredSessions(now);
    realActive = store.sessions.size;
  }

  const activeCount = getCalculatedActiveCount(realActive);

  return NextResponse.json(
    {
      active: activeCount,
      realSessions: realActive,
      totalVisits,
      provider: UPSTASH_URL ? "upstash-redis" : "in-memory-edge",
      timestamp: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(request: Request) {
  // Prevent cross-origin CSRF/abuse
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Too many requests", active: getCalculatedActiveCount(store.sessions.size) },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Payload size limit (reject oversized bodies > 1KB)
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > 1024) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const rawId = typeof body.visitorId === "string" ? body.visitorId.trim() : null;

    // Strict input validation
    const visitorId = rawId && VISITOR_ID_REGEX.test(rawId) ? rawId : null;
    const isNew = Boolean(body.isNew);
    const now = Date.now();

    let realActive = store.sessions.size;
    let totalVisits = store.totalVisits;

    if (UPSTASH_URL && UPSTASH_TOKEN && visitorId) {
      const pipeline: any[][] = [
        ["ZADD", "webdrive:active_visitors", now, visitorId],
        ["ZREMRANGEBYSCORE", "webdrive:active_visitors", 0, now - SESSION_TTL_MS],
        ["ZCARD", "webdrive:active_visitors"],
      ];

      if (isNew) {
        pipeline.push(["INCR", "webdrive:total_visits"]);
      } else {
        pipeline.push(["GET", "webdrive:total_visits"]);
      }

      const res = await runUpstashPipeline(pipeline);
      if (Array.isArray(res) && typeof res[2]?.result === "number") {
        realActive = res[2].result;
        if (res[3]?.result) {
          totalVisits = parseInt(String(res[3].result), 10) || totalVisits;
        }
      }
    } else {
      if (visitorId) {
        store.sessions.set(visitorId, now);
        if (isNew) store.totalVisits += 1;
      }
      cleanExpiredSessions(now);
      realActive = store.sessions.size;
    }

    const activeCount = getCalculatedActiveCount(realActive);

    return NextResponse.json(
      {
        success: true,
        active: activeCount,
        realSessions: realActive,
        totalVisits,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    const activeCount = getCalculatedActiveCount(store.sessions.size);
    return NextResponse.json({ success: false, active: activeCount });
  }
}

export async function DELETE(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const rawId = typeof body.visitorId === "string" ? body.visitorId.trim() : null;
    const visitorId = rawId && VISITOR_ID_REGEX.test(rawId) ? rawId : null;

    if (visitorId) {
      if (UPSTASH_URL && UPSTASH_TOKEN) {
        await runUpstashPipeline([["ZREM", "webdrive:active_visitors", visitorId]]);
      } else {
        store.sessions.delete(visitorId);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false });
  }
}
