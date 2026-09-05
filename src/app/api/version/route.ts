import { NextResponse } from "next/server";

const FALLBACK_VERSION = "1.1.3";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("https://registry.npmjs.org/webdrive/latest", {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // Cache server-side for 5 minutes
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.version) {
        return NextResponse.json(
          {
            version: data.version,
            source: "npm-registry",
          },
          {
            headers: {
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
          }
        );
      }
    }
  } catch {
    // Registry timeout or network failure, smoothly return fallback
  }

  return NextResponse.json({
    version: FALLBACK_VERSION,
    source: "fallback",
  });
}
