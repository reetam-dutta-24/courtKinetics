import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Video } from "lucide-react";
import { ModuleFilterTabs } from "@/components/sessions/ModuleFilterTabs";
import { moduleLabel } from "@/lib/constants";

const prisma = new PrismaClient();

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const session = await auth();
  const userId = session!.user!.id;

  const profile = await prisma.playerProfile.findUnique({ where: { userId } });
  if (!profile) redirect("/onboarding");

  const { module } = await searchParams;

  const sessions = await prisma.trainingSession.findMany({
    where: { userId, ...(module ? { focusModule: module } : {}) },
    include: { rallies: true },
    orderBy: { recordedAt: "desc" },
  });

  return (
    <main aria-labelledby="sessions-heading" className="section-stack">
      <header>
        <h1 id="sessions-heading" className="text-heading-1">Sessions</h1>
        <p className="text-body-muted mt-1">Every session you've recorded, with the analysis behind it.</p>
      </header>

      <ModuleFilterTabs active={module} />

      {sessions.length === 0 ? (
        <div className="card-base text-center py-16">
          <Video className="mx-auto text-muted-foreground mb-4" size={32} />
          <p className="text-body-muted">
            {module ? `No sessions found for "${moduleLabel(module)}".` : "No sessions recorded yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((s) => {
            const wins = s.rallies.filter((r) => r.outcome === "won").length;
            return (
              <Link key={s.id} href={`/dashboard/sessions/${s.id}`} className="card-interactive">
                <div className="flex items-center justify-between">
                  <span className="badge-accent">{moduleLabel(s.focusModule)}</span>
                  <span className="badge-muted capitalize">{s.status}</span>
                </div>
                <p className="text-heading-3 mt-4 capitalize">{s.sessionType}</p>
                <p className="text-small mt-1">{new Date(s.recordedAt).toLocaleDateString()}</p>
                <p className="text-small mt-3">
                  {s.rallies.length} {s.rallies.length === 1 ? "rally" : "rallies"} · {wins}W–{s.rallies.length - wins}L
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}