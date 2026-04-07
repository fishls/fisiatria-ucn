import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

type CalendarEventRowProps = {
  month: string;
  day: number | string;
  weekday: string;
  sourceTags?: string[];
  featured?: boolean;
  title: string;
  speakerName: string;
  speakerAvatarUrl?: string;
  time: string;
  href: string;
  /** Current/upcoming entry gets the accent stripe and full opacity */
  isActive?: boolean;
};

/**
 * CalendarEventRow — timeline row for the Programación Académica page.
 * Pattern from programaci_n_acad_mica_detallada lines 124–183.
 * Active entries get a left accent stripe; future entries use reduced opacity.
 */
export default function CalendarEventRow({
  month,
  day,
  weekday,
  sourceTags = [],
  featured = false,
  title,
  speakerName,
  speakerAvatarUrl,
  time,
  href,
  isActive = false,
}: CalendarEventRowProps) {
  return (
    <Link href={href}>
      <article
        className={[
          "rounded-2xl p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group",
          isActive
            ? "bg-surface-container-lowest"
            : "bg-surface-container-lowest/60",
          !isActive && "opacity-70",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Left accent stripe — only for active/current entry */}
        {isActive && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl"
            aria-hidden
          />
        )}

        {/* Date block */}
        <div
          className={[
            "md:w-32 flex flex-col items-center justify-center bg-surface-container-low rounded-xl py-4 shrink-0",
            !isActive && "opacity-70",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            className={[
              "text-sm font-bold uppercase tracking-tighter",
              isActive ? "text-secondary" : "text-on-surface-variant",
            ].join(" ")}
          >
            {month}
          </span>
          <span
            className={[
              "text-4xl font-extrabold",
              isActive ? "text-on-surface" : "text-on-surface-variant",
            ].join(" ")}
          >
            {day}
          </span>
          <span className="text-xs font-bold text-on-surface-variant uppercase">
            {weekday}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Source tags */}
          {(sourceTags.length > 0 || featured) && (
            <div className="flex flex-wrap gap-2">
              {sourceTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-surface-container-highest text-[10px] font-bold uppercase text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
              {featured && (
                <span className="px-2 py-0.5 rounded bg-orange-100 text-[10px] font-bold uppercase text-primary">
                  Destacado
                </span>
              )}
            </div>
          )}

          <h3
            className={[
              "text-xl font-bold leading-tight",
              isActive
                ? "text-on-surface group-hover:text-secondary transition-colors"
                : "text-on-surface",
            ].join(" ")}
          >
            {title}
          </h3>

          {/* Speaker + time */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-2">
              {speakerAvatarUrl ? (
                <img
                  src={speakerAvatarUrl}
                  alt={speakerName}
                  className="w-8 h-8 rounded-full bg-slate-200 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <MaterialIcon name="person" size={20} className="text-sm text-on-surface-variant" />
                </div>
              )}
              <span className="font-bold text-sm text-on-surface">{speakerName}</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <MaterialIcon name="schedule" size={20} className="text-sm" />
              <span className="text-sm font-medium">{time}</span>
            </div>
          </div>
        </div>

        {/* Chevron */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            aria-label="Ver detalle"
            className={[
              "p-3 rounded-full transition-colors",
              isActive
                ? "bg-surface-container hover:bg-secondary-container/20 text-secondary"
                : "hover:bg-surface-container text-on-surface-variant",
            ].join(" ")}
          >
            <MaterialIcon name="chevron_right" />
          </button>
        </div>
      </article>
    </Link>
  );
}
