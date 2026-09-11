import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { StatCard } from "@/components/ui/StatCard";
import { Zap, AlertTriangle, Video, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function DashboardHomePage() {
  const session = await auth();
  const userId = session!.user!.id;

  const profile = await prisma.playerProfile.findUnique({ where: { userId } });
  if (!profile) redirect("/onboarding");

  const sessions = await prisma.trainingSession.findMany({
    where: { userId },
    include: { rallies: true },
    orderBy: { recordedAt: "desc" },
  });

  const allRallies = sessions.flatMap((s) => s.rallies);
  const totalSessions = sessions.length;
  const totalRallies = allRallies.length;
  const wins = allRallies.filter((r) => r.outcome === "won").length;
  const winRate = totalRallies > 0 ? Math.round((wins / totalRallies) * 100) : null;

  const lagValues = allRallies.filter((r) => r.anticipationLagMs != null).map((r) => r.anticipationLagMs!);
  const avgLag = lagValues.length > 0 ? Math.round(lagValues.reduce((a, b) => a + b, 0) / lagValues.length) : null;

  const unforced = allRallies.filter((r) => r.errorType === "unforced").length;
  const errorRate = totalRallies > 0 ? Math.round((unforced / totalRallies) * 100) : null;

  const recentSessions = sessions.slice(0, 4);

  return (
    <main className="section-stack" aria-labelledby="dashboard-heading">
      {/* Welcome */}
      <header className="card-glass glow-accent-sm p-8">
        <h1 id="dashboard-heading" className="text-heading-1">
          Welcome back{session!.user!.name ? `, ${session!.user!.name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-body-muted mt-2">
          {totalSessions === 0
            ? "You haven't uploaded a session yet — start by recording a match and uploading it."
            : `You've recorded ${totalSessions} session${totalSessions === 1 ? "" : "s"} across ${totalRallies} rally${totalRallies === 1 ? "" : "ies"}.`}
        </p>
        {totalSessions === 0 && (
          <Link href="/dashboard/upload" className="btn-primary glow-accent-sm inline-block mt-6">
            Upload your first session
          </Link>
        )}
      </header>

      {/* KPIs */}
      <section aria-label="Key performance indicators">
        <h2 className="text-heading-3 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Anticipation Lag"
            value={avgLag !== null ? `${avgLag}ms` : "—"}
            icon={<Zap size={16} />}
          />
          <StatCard
            label="Unforced Errors"
            value={errorRate !== null ? `${errorRate}%` : "—"}
            icon={<AlertTriangle size={16} />}
          />
          <StatCard
            label="Win Rate"
            value={winRate !== null ? `${winRate}%` : "—"}
            icon={<Trophy size={16} />}
          />
          <StatCard
            label="Sessions Recorded"
            value={totalSessions}
            icon={<Video size={16} />}
          />
        </div>
      </section>

      {/* Player profile summary */}
      <section aria-label="Player profile summary" className="card-base">
        <h2 className="text-heading-3 mb-4">Your profile</h2>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <dt className="text-label">Experience</dt>
            <dd className="text-body mt-1">{profile.yearsPlaying} yrs</dd>
          </div>
          <div>
            <dt className="text-label">Skill level</dt>
            <dd className="text-body mt-1 capitalize">{profile.skillLevel}</dd>
          </div>
          <div>
            <dt className="text-label">Play style</dt>
            <dd className="text-body mt-1 capitalize">{profile.playStyle}</dd>
          </div>
          <div>
            <dt className="text-label">Dominant hand</dt>
            <dd className="text-body mt-1 capitalize">{profile.dominantHand}</dd>
          </div>
        </dl>
      </section>

      {/* Recent sessions */}
      <section aria-label="Recent sessions">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-3">Recent sessions</h2>
          <Link href="/dashboard/sessions" className="text-small text-accent hover:underline">
            View all
          </Link>
        </div>
        {recentSessions.length === 0 ? (
          <div className="card-base text-center py-10">
            <TrendingUp className="mx-auto text-muted-foreground mb-3" size={28} />
            <p className="text-body-muted">No sessions yet — your recent activity will show up here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentSessions.map((s) => (
              <Link key={s.id} href={`/dashboard/sessions/${s.id}`} className="card-interactive">
                <div className="flex items-center justify-between">
                  <span className="text-body font-medium capitalize">{s.focusModule.replace("_", " ")}</span>
                  <span className="badge-muted capitalize">{s.status}</span>
                </div>
                <p className="text-small mt-2">{new Date(s.recordedAt).toLocaleDateString()} · {s.sessionType}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}