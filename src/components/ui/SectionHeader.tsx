import Link from "next/link";
import MaterialIcon from "./MaterialIcon";

type SectionHeaderProps = {
  title: string;
  /** If provided, renders a "Ver todo" style link */
  action?: {
    label: string;
    href: string;
    icon?: string;
  };
  /** Eyebrow label above the title */
  eyebrow?: string;
  className?: string;
};

/**
 * Section header used throughout dashboards and listing pages.
 * Renders an h2 on the left and an optional action link on the right.
 *
 * Pattern from panel_de_control_fisiatr_a_ucn:
 *   <h2>Resúmenes de Archivo</h2>
 *   <button>Histórico <history icon/></button>
 */
export default function SectionHeader({
  title,
  action,
  eyebrow,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "flex items-center justify-between mb-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        {eyebrow && (
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
            {eyebrow}
          </span>
        )}
        <h2 className="font-headline text-2xl font-bold text-on-surface">
          {title}
        </h2>
      </div>

      {action && (
        <Link
          href={action.href}
          className="flex items-center gap-1 text-sm font-bold text-primary hover:underline transition-colors"
        >
          {action.label}
          {action.icon && (
            <MaterialIcon name={action.icon} size={20} className="text-sm" />
          )}
        </Link>
      )}
    </div>
  );
}
