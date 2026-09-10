import { StatCard } from "@/components/ui/StatCard";

export default function DashboardPage() {
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