import React from "react";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 text-sm text-muted-foreground">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              W
            </div>
            <span className="font-bold text-foreground">webdrive</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Framework-Agnostic UI Tour & Onboarding Library. MIT Licensed.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <a
            href="https://www.npmjs.com/package/webdrive"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>NPM Package</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <a
            href="https://github.com/Abhi-6284/webdrive"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>

          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Live App Demo
          </Link>
        </div>
      </div>
    </footer>
  );
}
