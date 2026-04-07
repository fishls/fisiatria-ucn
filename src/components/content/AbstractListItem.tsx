import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

type AbstractListItemProps = {
  source: string;
  sourceVariant?: "primary" | "secondary";
  date: string;
  title: string;
  tags?: string[];
  href: string;
};

/**
 * AbstractListItem — archive list row with source + date + title + specialty tags + hover chevron.
 * Pattern from panel_de_control_fisiatr_a_ucn lines 197–234.
 *
 * sourceVariant controls the accent color for source label, dot divider,
 * hover background, hover border, and hover title color.
 */
export default function AbstractListItem({
  source,
  sourceVariant = "primary",
  date,
  title,
  tags = [],
  href,
}: AbstractListItemProps) {
  const color = sourceVariant === "primary" ? "primary" : "secondary";

  return (
    <Link
      href={href}
      className={[
        "group block bg-gray-50 p-5 rounded-xl",
        "flex flex-col md:flex-row md:items-center justify-between gap-4",
        "border border-transparent transition-colors duration-200",
        `hover:bg-${color}/5 hover:border-${color}/20`,
      ].join(" ")}
    >
      {/* Left: source + date + title */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-[10px] font-bold text-${color} uppercase`}>
            {source}
          </span>
          <span className={`w-1 h-1 rounded-full bg-${color}/30`} aria-hidden />
          <span className="text-[10px] font-bold text-gray-500">{date}</span>
        </div>
        <h4
          className={`font-headline font-bold text-gray-900 group-hover:text-${color} transition-colors`}
        >
          {title}
        </h4>
      </div>

      {/* Right: tags + chevron */}
      <div className="flex items-center gap-4">
        {tags.length > 0 && (
          <div className="hidden sm:flex gap-1 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white text-gray-600 border border-gray-100 rounded-full text-[10px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="p-2 bg-white rounded-full editorial-shadow opacity-0 group-hover:opacity-100 transition-opacity">
          <MaterialIcon
            name="chevron_right"
            size={20}
            className={`text-sm text-${color}`}
          />
        </span>
      </div>
    </Link>
  );
}
