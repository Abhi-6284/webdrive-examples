import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            {/* Welcome Banner */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Analytics & System Velocity
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome to the WebDrive Next.js App Router showcase. Click <strong>&quot;Start Tour&quot;</strong> in the header to launch the onboarding tour.
              </p>
            </div>

            {/* Metrics Cards */}
            <MetricsGrid />

            {/* Live Activity & Async Demo */}
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}
