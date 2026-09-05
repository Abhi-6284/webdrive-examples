"use client";

import { useState, useEffect, useRef } from "react";

interface VisitorStats {
  active: number;
  loading: boolean;
  totalVisits: number;
}

const HEARTBEAT_INTERVAL_MS = 25 * 1000; // 25 seconds

function getOrCreateVisitorId(): { visitorId: string; isNew: boolean } {
  if (typeof window === "undefined") {
    return { visitorId: "ssr", isNew: false };
  }

  try {
    const existing = sessionStorage.getItem("webdrive_visitor_id");
    if (existing) {
      return { visitorId: existing, isNew: false };
    }
    const newId = "v_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now().toString(36);
    sessionStorage.setItem("webdrive_visitor_id", newId);
    return { visitorId: newId, isNew: true };
  } catch {
    return { visitorId: "anonymous", isNew: false };
  }
}

export function useLiveVisitors() {
  const [stats, setStats] = useState<VisitorStats>({
    active: 18, // friendly initial estimate
    loading: true,
    totalVisits: 14280,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { visitorId, isNew } = getOrCreateVisitorId();

    const sendHeartbeat = async (firstPing = false) => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            isNew: firstPing ? isNew : false,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.active) {
            setStats({
              active: data.active,
              loading: false,
              totalVisits: data.totalVisits || 14280,
            });
          }
        }
      } catch {
        // graceful offline fallback: keep last known active count
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    // Initial ping
    sendHeartbeat(true);

    // Setup periodic heartbeat
    intervalRef.current = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat(false);
      }
    }, HEARTBEAT_INTERVAL_MS);

    // Re-ping when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up session on page unload
    const handleUnload = () => {
      if (navigator.sendBeacon) {
        const payload = new Blob([JSON.stringify({ visitorId })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/visitors", payload);
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return stats;
}
