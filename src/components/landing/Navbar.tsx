"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WebDriveVersionBadge } from "@/components/common/WebDriveVersionBadge";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Github, Sparkles, ExternalLink } from "lucide-react";

export function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow">
            W
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            webdrive
          </span>
          <WebDriveVersionBadge variant="tag" />
        </Link>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#playground" className="hover:text-foreground transition-colors">
            Playground
          </a>
          <a href="#theming" className="hover:text-foreground transition-colors">
            Theming
          </a>
          <a href="#comparison" className="hover:text-foreground transition-colors">
            Comparison
          </a>
          <Link href="/dashboard" className="text-primary font-semibold hover:underline flex items-center gap-1">
            Live App Demo
            <ExternalLink className="h-3 w-3" />
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.npmjs.com/package/webdrive"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-mono">
              <WebDriveVersionBadge variant="npm" />
            </Button>
          </a>

          <a
            href="https://github.com/Abhi-6284/webdrive"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </Button>
          </a>

          <ThemeToggle className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </header>
  );
}
