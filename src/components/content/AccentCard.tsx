import Link from "next/link";

type AccentCardProps = {
  source: string;
  sourceVariant?: "primary" | "secondary";
  title: string;
  excerpt: string;
  date?: string;
  href: string;
};

/**
 * AccentCard — col-span-4 card with left border accent.
 * Pattern from panel_de_control_fisiatr_a_ucn lines 142–154.
 * Used for secondary/clinical articles in the bottom row of the bento grid.
 */
export default function AccentCard({
  source,
  sourceVariant = "primary",
  title,
  excerpt,
  date,
  href,
}: AccentCardProps) {
  const color = sourceVariant === "primary" ? "primary" : "secondary";

  return (
    <article
      className={`md:col-span-4 bg-gray-50 rounded-xl p-6 flex flex-col border-l-4 border-${color} hover:shadow-md transition-all cursor-pointer`}
    >
      <Link href={href} className="flex flex-col h-full">
        <span className={`text-[10px] font-extrabold uppercase text-${color} mb-2`}>
          {source}
        </span>
        <h3 className="font-headline text-lg font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>
        {date && (
          <div className="mt-auto pt-4 flex justify-between items-center">
            <span className={`text-xs font-bold text-${color}`}>{source}</span>
            <span className="text-[10px] text-gray-500">{date}</span>
          </div>
        )}
      </Link>
    </article>
  );
}
