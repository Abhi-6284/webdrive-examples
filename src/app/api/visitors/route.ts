import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

function cleanExpiredSessions(now: number) {
  store.sessions.forEach((timestamp, id) => {
    if (now - timestamp > SESSION_TTL_MS) {
      store.sessions.delete(id);
    }
  });
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
    // network timeout or auth issue, smoothly fall back
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

export async function GET() {
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
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = body.visitorId ? String(body.visitorId) : null;
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
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = body.visitorId ? String(body.visitorId) : null;

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
