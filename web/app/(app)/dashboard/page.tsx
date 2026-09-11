import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { StatCard } from "@/components/ui/StatCard";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();

  const profile = await prisma.playerProfile.findUnique({
    where: { userId: session!.user!.id },
  });
  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div className="section-stack">
      <div>
        <h1 className="text-heading-1">Dashboard</h1>
        <p className="text-body-muted mt-1">Your performance at a glance.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Anticipation Lag" value="—" />
        <StatCard label="Unforced Errors" value="—" />
        <StatCard label="Sessions Recorded" value="0" />
      </div>
    </div>
  );
}