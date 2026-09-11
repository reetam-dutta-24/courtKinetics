"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Reviews" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-20 navbar-surface ">
      <div className="page-container h-full flex items-center justify-between">
        <span className="text-heading-3 text-gradient-accent">CourtKinetics</span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-small hover:text-accent transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/api/auth/signin" className="btn-secondary">Log In</Link>
          <Link href="/api/auth/signin" className="btn-primary glow-accent-sm">Sign Up</Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden navbar-surface  px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-body">
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/api/auth/signin" className="btn-secondary flex-1 justify-center">Log In</Link>
            <Link href="/api/auth/signin" className="btn-primary flex-1 justify-center">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}