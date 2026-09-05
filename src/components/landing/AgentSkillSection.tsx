import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CopySkillCommand } from "@/components/common/CopySkillCommand";
import { Bot, Sparkles } from "lucide-react";

export function AgentSkillSection() {

  return (
    <section className="py-20 border-t bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-primary/30 shadow-xl relative overflow-hidden bg-card/90 backdrop-blur">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Bot className="h-44 w-44 text-primary" />
          </div>

          <CardContent className="p-8 sm:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Agent Ready</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Supercharge with AI Agent Skills
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
                Teach your AI coding assistants (Google Antigravity, Claude Code, Cursor, GitHub Copilot) how to scaffold, customize, and troubleshoot WebDrive tours automatically.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 w-full md:w-auto">
              <CopySkillCommand />
              <span className="text-[11px] text-muted-foreground text-center">
                Or: <code>npx skills add Abhi-6284/webdrive</code>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
