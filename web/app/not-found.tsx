import Link from "next/link";
import { CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div
      data-theme="court-cyan"
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center px-6"
    >
      <span className="p-4 rounded-2xl bg-accent/15 text-accent mb-6">
        <CompassIcon size={32} />
      </span>
      <h1 className="text-heading-1">Out of bounds.</h1>
      <p className="text-body-muted mt-3 max-w-sm">
        This page doesn&apos;t exist — the shuttle landed somewhere off the court.
      </p>
      <Link href="/" className="btn-primary glow-accent-sm mt-8">
        Back to Home
      </Link>
    </div>
  );
}