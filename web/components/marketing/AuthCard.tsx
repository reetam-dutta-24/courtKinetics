import type { ReactNode } from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div
      data-theme="court-cyan"
      className="min-h-screen bg-background text-foreground grid lg:grid-cols-2"
    >
      {/* Left: atmosphere panel, hidden on small screens */}
      <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden">
        <div className="glow-bg-radial" />
        <div className="relative z-10 max-w-md text-center">
          <span className="text-heading-3 text-gradient-accent block mb-4">
            CourtKinetics
          </span>
          <h2 className="text-heading-1">Welcome back to your game.</h2>
          <p className="text-body-muted mt-4">
            Anticipation timing, error patterns, and positioning — measured from
            your own footage.
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm card-glass p-8">
          <Link
            href="/"
            className="text-heading-3 text-gradient-accent lg:hidden block mb-6"
          >
            CourtKinetics
          </Link>
          <h1 className="text-heading-1">{title}</h1>
          <p className="text-body-muted mt-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="text-small mt-8 text-center">
            {footerText}{" "}
            <Link href={footerLinkHref} className="text-accent hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
