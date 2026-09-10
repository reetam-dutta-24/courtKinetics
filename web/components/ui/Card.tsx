import { type HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type CardVariant = "base" | "glass" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  base: "card-base",
  glass: "card-glass",
  interactive: "card-interactive",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "glass", className, ...props }, ref) => (
    <div ref={ref} className={clsx(variantClasses[variant], className)} {...props} />
  )
);
Card.displayName = "Card";