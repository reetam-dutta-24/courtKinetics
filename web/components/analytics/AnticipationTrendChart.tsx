"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

interface TrendPoint {
  date: string;
  avgLagMs: number;
}

export function AnticipationTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
        <YAxis stroke="var(--muted-foreground)" fontSize={12} unit="ms" />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="avgLagMs"
          name="Anticipation Lag"
          stroke="var(--accent)"
          strokeWidth={2.5}
          dot={{ fill: "var(--accent)", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}