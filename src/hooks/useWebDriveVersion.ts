"use client";

import { useState, useEffect } from "react";

export const DEFAULT_WEBDRIVE_VERSION = "1.1.3";

export function useWebDriveVersion() {
  const [version, setVersion] = useState<string>(DEFAULT_WEBDRIVE_VERSION);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchVersion() {
      try {
        setIsLoading(true);
        // Try local route first (cached), fallback directly to npm registry
        const res = await fetch("/api/version").catch(() =>
          fetch("https://registry.npmjs.org/webdrive/latest")
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.version && isMounted) {
            setVersion(data.version);
          }
        }
      } catch {
        // Retain fallback version
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchVersion();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    version,
    displayVersion: `v${version}`,
    isLoading,
  };
}
