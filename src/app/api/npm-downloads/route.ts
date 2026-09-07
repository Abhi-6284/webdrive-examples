import { NextResponse } from "next/server";

const FALLBACK_DOWNLOADS = 596;
const PACKAGE_NAME = "webdrive";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${PACKAGE_NAME}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // Cache server-side for 5 minutes
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const downloads = typeof data.downloads === "number" ? data.downloads : FALLBACK_DOWNLOADS;
      const formatted =
        downloads >= 1000
          ? `${(downloads / 1000).toFixed(1)}k+`
          : downloads.toLocaleString();

      return NextResponse.json(
        {
          downloads,
          formatted,
          period: "last-month",
          start: data.start,
          end: data.end,
          package: PACKAGE_NAME,
          source: "npm-api",
          updatedAt: new Date().toISOString(),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }
  } catch {
    // Gracefully fallback on timeout or network block
  }

  return NextResponse.json({
    downloads: FALLBACK_DOWNLOADS,
    formatted: FALLBACK_DOWNLOADS.toLocaleString(),
    period: "last-month",
    package: PACKAGE_NAME,
    source: "fallback",
    updatedAt: new Date().toISOString(),
  });
}
