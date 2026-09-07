"use client";

import { useEffect, useRef } from "react";
import { WebDrive } from "webdrive";

export function MultiPageTourResume() {
  const activeTourRef = useRef<WebDrive | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const isMultiPage =
      urlParams.get("tour") === "multipage" ||
      localStorage.getItem("webdrive_multipage_active") === "true";

    if (isMultiPage) {
      localStorage.removeItem("webdrive_multipage_active");

      const timer = setTimeout(() => {
        const tour = new WebDrive({
          id: "saas-multipage-onboarding-step2",
          animate: true,
          showProgress: true,
          steps: [
            {
              element: "#metrics-grid",
              title: "🎉 Page 2: Tour Resumed Across Routes!",
              description:
                "You navigated seamlessly from /examples to /dashboard. WebDrive detected the route change and resumed the walkthrough on this new page.",
              position: "bottom",
              doneButtonText: "Return to Examples ↩",
            },
          ],
          onComplete: () => {
            window.location.href = "/examples#multi-page-tour";
          },
          onClose: () => {
            // Tour dismissed
          },
        });

        activeTourRef.current = tour;
        tour.start().catch((err) => {
          console.error("[WebDrive] Error resuming multi-page tour:", err);
        });
      }, 400);

      return () => {
        clearTimeout(timer);
        if (activeTourRef.current) {
          activeTourRef.current.destroy();
        }
      };
    }
  }, []);

  return null;
}
