"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

const THEME_OPTIONS = [
  { id: "court-cyan", label: "Court Cyan", color: "#22D3EE" },
  { id: "match-point", label: "Match Point", color: "#84CC16" },
  { id: "china-masters", label: "China Masters", color: "#DC2626" },
  { id: "nightshade", label: "Nightshade", color: "#C084FC" },
  { id: "stealth", label: "Stealth", color: "#E5E5E5" },
  { id: "daylight", label: "Daylight", color: "#0E7490" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoids a hydration mismatch: we don't know the saved theme until
  // after the component mounts client-side, so we render nothing until then.
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {THEME_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setTheme(opt.id)}
          title={opt.label}
          className={clsx(
            "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
            theme === opt.id ? "border-foreground scale-110" : "border-border"
          )}
          style={{ backgroundColor: opt.color }}
        />
      ))}
    </div>
  );
}