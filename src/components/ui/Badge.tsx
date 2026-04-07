import { type ReactNode } from "react";

type BadgeVariant =
  | "filled-primary"    // bg-primary text-white — "DESTACADO", journal labels
  | "filled-secondary"  // bg-secondary text-white
  | "outlined-primary"  // bg-primary/10 text-primary border — header journal tags
  | "outlined-secondary"// bg-secondary/10 text-secondary border
  | "surface";          // bg-surface-container text-on-surface-variant — neutral tags

type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  "filled-primary":    "bg-primary text-on-primary",
  "filled-secondary":  "bg-secondary text-on-secondary",
  "outlined-primary":  "bg-primary/10 text-primary border border-primary/20",
  "outlined-secondary":"bg-secondary/10 text-secondary border border-secondary/20",
  "surface":           "bg-surface-container text-on-surface-variant",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-3 py-1 text-[10px]",
  md: "px-4 py-2 text-xs",
};

export default function Badge({
  children,
  variant = "outlined-primary",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-bold uppercase tracking-wider whitespace-nowrap",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
