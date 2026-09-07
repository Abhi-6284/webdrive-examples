"use client";

import { useState, useEffect } from "react";

export const DEFAULT_NPM_DOWNLOADS = 596;

export interface NpmDownloadsData {
  downloads: number;
  formatted: string;
  period: string;
  isLoading: boolean;
}

export function useNpmDownloads(): NpmDownloadsData {
  const [downloads, setDownloads] = useState<number>(DEFAULT_NPM_DOWNLOADS);
  const [formatted, setFormatted] = useState<string>("596");
  const [period, setPeriod] = useState<string>("last-month");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDownloads() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/npm-downloads").catch(() =>
          fetch("https://api.npmjs.org/downloads/point/last-month/webdrive")
        );
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.downloads === "number" && isMounted) {
            setDownloads(data.downloads);
            setFormatted(
              data.formatted ||
                (data.downloads >= 1000
                  ? `${(data.downloads / 1000).toFixed(1)}k+`
                  : data.downloads.toLocaleString())
            );
            if (data.period) {
              setPeriod(data.period);
            }
          }
        }
      } catch {
        // Retain fallback
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchDownloads();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    downloads,
    formatted,
    period,
    isLoading,
  };
}
