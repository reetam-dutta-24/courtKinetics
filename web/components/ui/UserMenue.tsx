"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!session?.user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-muted transition-colors"
      >
        <span className="h-9 w-9 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 overflow-hidden">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={session.user.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <User size={16} />
          )}
        </span>
        <span className="text-small text-left truncate">{session.user.name ?? session.user.email}</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full card-base p-1">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-small text-red-400 hover:bg-muted transition-colors"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}