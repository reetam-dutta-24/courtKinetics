"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { clsx } from "clsx";

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={clsx(isActive ? "nav-link-active" : "nav-link")}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}