"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { WebDrive, type WebDriveOptions, type WebDriveStep } from "webdrive";

export interface UseWebDriveReturn {
  tour: WebDrive | null;
  isActive: boolean;
  currentStepIndex: number;
  currentStep: WebDriveStep | null;
  start: (startIndex?: number) => Promise<void>;
  stop: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  goTo: (index: number) => Promise<void>;
  reset: () => Promise<void>;
}

export function useWebDrive(options: WebDriveOptions): UseWebDriveReturn {
  const tourRef = useRef<WebDrive | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [currentStep, setCurrentStep] = useState<WebDriveStep | null>(null);

  // Initialize WebDrive only in browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tourInstance = new WebDrive({
      ...options,
      onStart: () => {
        setIsActive(true);
        setCurrentStepIndex(tourInstance.getCurrentStepIndex());
        setCurrentStep(tourInstance.getCurrentStep());
        options.onStart?.();
      },
      onStepChange: (step, index) => {
        setCurrentStepIndex(index);
        setCurrentStep(step);
        options.onStepChange?.(step, index);
      },
      onClose: () => {
        setIsActive(false);
        setCurrentStepIndex(-1);
        setCurrentStep(null);
        options.onClose?.();
      },
      onComplete: () => {
        setIsActive(false);
        setCurrentStepIndex(-1);
        setCurrentStep(null);
        options.onComplete?.();
      },
    });

    tourRef.current = tourInstance;

    return () => {
      tourInstance.destroy();
      tourRef.current = null;
    };
  }, []); // Run once on mount

  const start = useCallback(async (startIndex: number = 0) => {
    if (tourRef.current) {
      await tourRef.current.start(startIndex);
    }
  }, []);

  const stop = useCallback(async () => {
    if (tourRef.current) {
      await tourRef.current.stop();
    }
  }, []);

  const next = useCallback(async () => {
    if (tourRef.current) {
      await tourRef.current.next();
    }
  }, []);

  const previous = useCallback(async () => {
    if (tourRef.current) {
      await tourRef.current.previous();
    }
  }, []);

  const goTo = useCallback(async (index: number) => {
    if (tourRef.current) {
      await tourRef.current.goTo(index);
    }
  }, []);

  const reset = useCallback(async () => {
    if (tourRef.current) {
      await tourRef.current.reset();
    }
  }, []);

  return {
    tour: tourRef.current,
    isActive,
    currentStepIndex,
    currentStep,
    start,
    stop,
    next,
    previous,
    goTo,
    reset,
  };
}
