"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

interface Slice {
  name: string;
  value: number;
}

const COLORS = ["var(--accent)", "var(--accent-secondary)", "var(--muted-foreground)"];

export function ErrorBreakdownChart({ data }: { data: Slice[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}