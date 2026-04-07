import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

type SavedArticleCardProps = {
  source: string;
  sourceVariant?: "primary" | "secondary";
  title: string;
  tags?: string[];
  date: string;
  href: string;
  pdfLabel?: string;
};

/**
 * SavedArticleCard — bookmark card used in the Guardados page.
 * Pattern from guardados_fisiatr_a_ucn lines 143–165.
 * Absolute bookmark icon top-right, specialty tags, PDF CTA footer.
 */
export default function SavedArticleCard({
  source,
  sourceVariant = "primary",
  title,
  tags = [],
  date,
  href,
  pdfLabel = "Leer PDF",
}: SavedArticleCardProps) {
  const color = sourceVariant === "primary" ? "primary" : "secondary";

  return (
    <article className="group bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/15 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Filled bookmark top-right */}
      <div className="absolute top-0 right-0 p-4">
        <MaterialIcon
          name="bookmark"
          fill={1}
          className="text-primary"
        />
      </div>

      <Link href={href} className="flex flex-col h-full">
        <span className={`text-xs font-bold text-${color} uppercase tracking-widest mb-3`}>
          {source}
        </span>
        <h3
          className={`text-lg font-bold text-on-surface leading-tight mb-4 group-hover:text-${color} transition-colors`}
        >
          {title}
        </h3>

        {/* Specialty tags */}
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-container text-on-tertiary-container text-xs font-bold rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-surface-container pt-4">
          <div className="flex items-center gap-2">
            <MaterialIcon name="calendar_today" size={20} className="text-secondary text-sm" />
            <span className="text-xs text-on-surface-variant font-medium">{date}</span>
          </div>
          <span className={`flex items-center gap-1 text-${color} font-bold text-sm`}>
            {pdfLabel}
            <MaterialIcon name="arrow_forward" size={20} className="text-sm" />
          </span>
        </div>
      </Link>
    </article>
  );
}
