import Link from "next/link";
import { FOCUS_MODULES } from "@/lib/constants";

export function ModuleFilterTabs({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by hypothesis module">
      <Link
        href="/dashboard/sessions"
        role="tab"
        aria-selected={!active}
        className={!active ? "badge-accent" : "badge-muted hover:bg-muted/70"}
      >
        All
      </Link>
      {FOCUS_MODULES.map((m) => (
        <Link
          key={m.value}
          href={`/dashboard/sessions?module=${m.value}`}
          role="tab"
          aria-selected={active === m.value}
          className={active === m.value ? "badge-accent" : "badge-muted hover:bg-muted/70"}
        >
          {m.label}
        </Link>
      ))}
    </div>
  );
}