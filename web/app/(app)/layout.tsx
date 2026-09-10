import type { ReactNode } from "react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { NavLink } from "@/components/ui/NavLink";
import {
  LayoutDashboard,
  Video,
  Upload,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/sessions", label: "Sessions", icon: <Video size={18} /> },
  { href: "/upload", label: "Upload", icon: <Upload size={18} /> },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border p-4 gap-6 shrink-0">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="text-heading-3 text-gradient-accent">CourtKinetics</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
          ))}
        </nav>

        <div className="border-t border-border pt-4 flex flex-col gap-3">
          <span className="text-label px-2">Theme</span>
          <div className="px-2">
            <ThemeSwitcher />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <span className="text-heading-3 text-gradient-accent">CourtKinetics</span>
          {/* Mobile nav toggle will go here later */}
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="page-container py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}