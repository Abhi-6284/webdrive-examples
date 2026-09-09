"use client";
import { useCallback } from "react";
import type { PlaygroundConfig } from "@/components/playground/types";

export function usePlaygroundShare() {
  const serialize = useCallback((config: PlaygroundConfig): string => {
    try {
      return btoa(encodeURIComponent(JSON.stringify(config)));
    } catch {
      return "";
    }
  }, []);

  const deserialize = useCallback((encoded: string): PlaygroundConfig | null => {
    try {
      return JSON.parse(decodeURIComponent(atob(encoded))) as PlaygroundConfig;
    } catch {
      return null;
    }
  }, []);

  const getShareUrl = useCallback(
    (config: PlaygroundConfig): string => {
      const encoded = serialize(config);
      return `${window.location.origin}/playground#share=${encoded}`;
    },
    [serialize]
  );

  const loadFromHash = useCallback((): PlaygroundConfig | null => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    const match = hash.match(/[#&]share=([^&]+)/);
    if (!match) return null;
    return deserialize(match[1]);
  }, [deserialize]);

  return { getShareUrl, loadFromHash };
}
