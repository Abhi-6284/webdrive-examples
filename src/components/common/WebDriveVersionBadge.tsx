"use client";

import React from "react";
import { useWebDriveVersion } from "@/hooks/useWebDriveVersion";

interface WebDriveVersionBadgeProps {
  variant?: "tag" | "text" | "npm" | "pill";
  prefix?: string;
  className?: string;
}

export function WebDriveVersionBadge({
  variant = "tag",
  prefix = "v",
  className = "",
}: WebDriveVersionBadgeProps) {
  const { version } = useWebDriveVersion();

  if (variant === "text") {
    return <span className={className}>{prefix}{version}</span>;
  }

  if (variant === "pill") {
    return (
      <span className={className}>
        {prefix}{version} Live on NPM
      </span>
    );
  }

  if (variant === "npm") {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className="font-bold text-red-500">npm</span>
        <span>{prefix}{version}</span>
      </span>
    );
  }

  return (
    <span
      className={`rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary inline-flex items-center transition-opacity duration-200 ${className}`}
    >
      {prefix}{version}
    </span>
  );
}
