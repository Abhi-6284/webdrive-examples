import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FrameworkPlayground } from "@/components/landing/FrameworkPlayground";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { ThemingSection } from "@/components/landing/ThemingSection";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { AgentSkillSection } from "@/components/landing/AgentSkillSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <FrameworkPlayground />
        <FeatureBento />
        <ThemingSection />
        <ComparisonTable />
        <AgentSkillSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
