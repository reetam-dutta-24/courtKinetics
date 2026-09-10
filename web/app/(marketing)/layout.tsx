import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="court-cyan" className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}