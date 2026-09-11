import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { moduleLabel } from "@/lib/constants";
import { ExportButton } from "@/components/sessions/ExportButton";
import { Clock, AlertTriangle } from "lucide-react";

const prisma = new PrismaClient();

export default async function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const userId = session!.user!.id;
  const { id } = await params;

  const trainingSession = await prisma.trainingSession.findUnique({
    where: { id },
    include: { rallies: { orderBy: { startTimeSeconds: "asc" } } },
  });

  if (!trainingSession || trainingSession.userId !== userId) {
    notFound();
  }

  const wins = trainingSession.rallies.filter((r) => r.outcome === "won").length;
  const isReady = trainingSession.status === "ready";

  return (
    <main aria-labelledby="session-heading" className="section-stack">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 id="session-heading" className="text-heading-1 capitalize">{trainingSession.sessionType} Session</h1>
            <span className="badge-accent">{moduleLabel(trainingSession.focusModule)}</span>
          </div>
          <p className="text-body-muted mt-2">
            {new Date(trainingSession.recordedAt).toLocaleDateString(undefined, {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>
        <ExportButton sessionId={trainingSession.id} rallies={trainingSession.rallies} />
      </header>

      {!isReady ? (
        <div className="card-base text-center py-16">
          <Clock className="mx-auto text-muted-foreground mb-4" size={32} />
          <p className="text-body-muted">
            This session is <span className="capitalize">{trainingSession.status}</span> — analysis isn't ready yet.
          </p>
        </div>
      ) : trainingSession.rallies.length === 0 ? (
        <div className="card-base text-center py-16">
          <AlertTriangle className="mx-auto text-muted-foreground mb-4" size={32} />
          <p className="text-body-muted">No rally data recorded for this session.</p>
        </div>
      ) : (
        <>
          <section aria-label="Session summary" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card-base">
              <span className="text-label">Rallies</span>
              <p className="text-stat mt-1">{trainingSession.rallies.length}</p>
            </div>
            <div className="card-base">
              <span className="text-label">Record</span>
              <p className="text-stat mt-1">{wins}–{trainingSession.rallies.length - wins}</p>
            </div>
          </section>

          <section aria-label="Rally breakdown">
            <h2 className="text-heading-3 mb-4">Rally-by-rally</h2>
            <div className="card-base overflow-x-auto">
              <table className="w-full text-small">
                <thead>
                  <tr className="text-label text-left border-b border-border">
                    <th className="py-2 pr-4">#</th>
                    <th className="py-2 pr-4">Outcome</th>
                    <th className="py-2 pr-4">Error Type</th>
                    <th className="py-2 pr-4">Anticipation Lag</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingSession.rallies.map((r, i) => (
                    <tr key={r.id} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-4">{i + 1}</td>
                      <td className="py-2.5 pr-4">
                        <span className={r.outcome === "won" ? "text-accent" : "text-red-400"}>{r.outcome}</span>
                      </td>
                      <td className="py-2.5 pr-4 capitalize">{r.errorType ?? "—"}</td>
                      <td className="py-2.5 pr-4">{r.anticipationLagMs != null ? `${r.anticipationLagMs}ms` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
}