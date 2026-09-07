import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WebDriveVersionBadge } from "@/components/common/WebDriveVersionBadge";
import { LiveVisitorsBadge } from "@/components/common/LiveVisitorsBadge";
import { NpmDownloadsBadge } from "@/components/common/NpmDownloadsBadge";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Github } from "lucide-react";

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
          <Link href="/examples" className="text-foreground hover:text-primary font-semibold transition-colors flex items-center gap-1.5">
            <span>Examples</span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">16+</span>
          </Link>
          <a href="/#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="/#playground" className="hover:text-foreground transition-colors">
            Playground
          </a>
          <a href="/#theming" className="hover:text-foreground transition-colors">
            Theming
          </a>
          <a href="/#comparison" className="hover:text-foreground transition-colors">
            Comparison
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <LiveVisitorsBadge variant="pill" className="hidden lg:inline-flex" />

          {/* Flex NPM Downloads Badge */}
          <NpmDownloadsBadge variant="navbar" className="hidden sm:inline-flex" />

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
