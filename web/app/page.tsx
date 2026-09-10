import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="page-container py-16 section-stack">
      <h1 className="text-display text-foreground">CourtKinetics</h1>
      <p className="text-body-muted">Theme + component test page.</p>

      <ThemeSwitcher />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Anticipation Lag" value="142ms" trend={{ value: "↓ 8ms this week", direction: "up" }} />
        <StatCard label="Unforced Errors" value="12%" trend={{ value: "↑ 2% this week", direction: "down" }} />
        <StatCard label="Sessions Recorded" value="7" />
      </div>

      <Card variant="interactive" className="glow-accent-sm">
        <h3 className="text-heading-3">Sample Card</h3>
        <p className="text-body-muted mt-2">Hover me to see the interactive card effect.</p>
        <div className="flex gap-2 mt-4">
          <Badge variant="accent">Singles</Badge>
          <Badge variant="muted">Processed</Badge>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </main>
  );
}