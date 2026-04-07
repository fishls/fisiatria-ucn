import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "pill" | "rounded";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: string;
  iconPosition?: "left" | "right";
  /** Show trailing arrow that slides on hover */
  trailingArrow?: boolean;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  // Filled gradient — primary CTAs throughout the app
  primary:
    "gradient-primary text-on-primary shadow-md hover:opacity-90 active:scale-[0.98]",
  // Solid secondary — Compartir, secondary actions
  secondary:
    "bg-secondary text-on-secondary hover:opacity-90 active:scale-95",
  // Ghost — low-priority: PDF download, "Ver todo", etc.
  ghost:
    "text-primary hover:bg-primary/10 active:scale-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const shapeClasses: Record<ButtonShape, string> = {
  pill:    "rounded-full",
  rounded: "rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  shape = "pill",
  icon,
  iconPosition = "left",
  trailingArrow = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        "inline-flex items-center justify-center gap-2 font-label font-bold transition-all duration-200 group",
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-lg" aria-hidden>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-lg" aria-hidden>
          {icon}
        </span>
      )}
      {trailingArrow && (
        <span
          className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1"
          aria-hidden
        >
          arrow_forward
        </span>
      )}
    </button>
  );
}
