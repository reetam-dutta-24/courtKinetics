import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

type BadgeVariant = "accent" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: "badge-accent",
  muted: "badge-muted",
};

export function Badge({ variant = "muted", className, ...props }: BadgeProps) {
  return <span className={clsx(variantClasses[variant], className)} {...props} />;
}