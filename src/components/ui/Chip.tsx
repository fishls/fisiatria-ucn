import { type ReactNode } from "react";

type ChipVariant = "active" | "inactive" | "keyword";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  icon?: string;
  /** Only for interactive chips (filter bars) */
  onClick?: () => void;
  className?: string;
};

const variantClasses: Record<ChipVariant, string> = {
  // Active filter chip — secondary-container fill
  active:
    "bg-secondary-container text-on-secondary-container font-bold",
  // Inactive filter chip — surface-container-high
  inactive:
    "bg-surface-container-high text-on-surface-variant font-semibold hover:bg-surface-container-highest transition-colors",
  // Article keyword chip — white bg with primary border + editorial shadow
  keyword:
    "bg-white text-primary border border-primary/20 font-medium editorial-shadow",
};

export default function Chip({
  children,
  variant = "inactive",
  icon,
  onClick,
  className,
}: ChipProps) {
  const base = [
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm whitespace-nowrap",
    variantClasses[variant],
    onClick ? "cursor-pointer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={base}>
        {icon && (
          <span
            className="material-symbols-outlined text-sm filled"
            aria-hidden
          >
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }

  return (
    <span className={base}>
      {icon && (
        <span className="material-symbols-outlined text-sm" aria-hidden>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
