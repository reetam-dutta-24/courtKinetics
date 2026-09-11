"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      data-theme="court-cyan"
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center px-6"
    >
      <span className="p-4 rounded-2xl bg-red-500/15 text-red-400 mb-6">
        <AlertOctagon size={32} />
      </span>
      <h1 className="text-heading-1">Something went wrong.</h1>
      <p className="text-body-muted mt-3 max-w-sm">
        An unexpected error occurred. Try again, or head back to the homepage.
      </p>
      <div className="flex gap-3 mt-8">
        <button onClick={() => reset()} className="btn-primary glow-accent-sm">
          Try Again
        </button>
        <a href="/" className="btn-secondary">Back to Home</a>
      </div>
    </div>
  );
}