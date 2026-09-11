import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { BarChart3 } from "lucide-react";
import { AnticipationTrendChart } from "@/components/analytics/AnticipationTrendChart";
import { ErrorBreakdownChart } from "@/components/analytics/ErrorBreakDownChart";
import { ModuleDistributionChart } from "@/components/analytics/ModuleDistributionChart";

const prisma = new PrismaClient();

export default async function AnalyticsPage() {
  const session = await auth();
  const userId = session!.user!.id;

  const profile = await prisma.playerProfile.findUnique({ where: { userId } });
  if (!profile) redirect("/onboarding");

  const sessions = await prisma.trainingSession.findMany({
    where: { userId },
    include: { rallies: true },
    orderBy: { recordedAt: "asc" },
  });

  const allRallies = sessions.flatMap((s) => s.rallies);

  if (sessions.length === 0) {
    return (
      <main aria-labelledby="analytics-heading" className="section-stack">
        <header>
          <h1 id="analytics-heading" className="text-heading-1">Analytics</h1>
          <p className="text-body-muted mt-1">Trends and breakdowns across your recorded sessions.</p>
        </header>
        <div className="card-base text-center py-16">
          <BarChart3 className="mx-auto text-muted-foreground mb-4" size={32} />
          <p className="text-body-muted">No data yet — charts will appear once you've uploaded and processed sessions.</p>
        </div>
      </main>
    );
  }

  const trendData = sessions
    .filter((s) => s.rallies.some((r) => r.anticipationLagMs != null))
    .map((s) => {
      const lags = s.rallies.filter((r) => r.anticipationLagMs != null).map((r) => r.anticipationLagMs!);
      return {
        date: new Date(s.recordedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        avgLagMs: Math.round(lags.reduce((a, b) => a + b, 0) / lags.length),
      };
    });

  const errorCounts = { Unforced: 0, Forced: 0, None: 0 };
  allRallies.forEach((r) => {
    if (r.errorType === "unforced") errorCounts.Unforced++;
    else if (r.errorType === "forced") errorCounts.Forced++;
    else errorCounts.None++;
  });
  const errorData = Object.entries(errorCounts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  const moduleCounts: Record<string, number> = {};
  sessions.forEach((s) => {
    const label = s.focusModule.replace("_", " ");
    moduleCounts[label] = (moduleCounts[label] || 0) + 1;
  });
  const moduleData = Object.entries(moduleCounts).map(([module, count]) => ({ module, count }));

  return (
    <main aria-labelledby="analytics-heading" className="section-stack">
      <header>
        <h1 id="analytics-heading" className="text-heading-1">Analytics</h1>
        <p className="text-body-muted mt-1">Trends and breakdowns across your recorded sessions.</p>
      </header>

      <section aria-label="Anticipation lag trend" className="card-base">
        <h2 className="text-heading-3 mb-4">Anticipation lag over time</h2>
        {trendData.length > 0 ? (
          <AnticipationTrendChart data={trendData} />
        ) : (
          <p className="text-body-muted py-12 text-center">No anticipation data recorded yet.</p>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section aria-label="Error type breakdown" className="card-base">
          <h2 className="text-heading-3 mb-4">Error breakdown</h2>
          {errorData.length > 0 ? (
            <ErrorBreakdownChart data={errorData} />
          ) : (
            <p className="text-body-muted py-12 text-center">No error data recorded yet.</p>
          )}
        </section>

        <section aria-label="Sessions by focus module" className="card-base">
          <h2 className="text-heading-3 mb-4">Sessions by module</h2>
          <ModuleDistributionChart data={moduleData} />
        </section>
      </div>
    </main>
  );
}