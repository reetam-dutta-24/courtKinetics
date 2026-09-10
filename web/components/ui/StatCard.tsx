import type { ReactNode } from "react";
import { Card } from "./Card";
import { clsx } from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <Card variant="glass" className={clsx("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-label">{label}</span>
        {icon && <span className="text-accent">{icon}</span>}
      </div>
      <span className="text-stat">{value}</span>
      {trend && (
        <span
          className={clsx(
            "text-small font-medium",
            trend.direction === "up" && "text-accent",
            trend.direction === "down" && "text-red-400",
            trend.direction === "neutral" && "text-muted-foreground"
          )}
        >
          {trend.value}
        </span>
      )}
    </Card>
  );
}