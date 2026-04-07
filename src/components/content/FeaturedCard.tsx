import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

type FeaturedCardProps = {
  source: string;
  sourceVariant?: "primary" | "secondary";
  badge?: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

/**
 * FeaturedCard — col-span-8 bento card with image left and content right.
 * Pattern from panel_de_control_fisiatr_a_ucn: split flex layout,
 * gradient image overlay, title hover effect, footer with source + CTA.
 */
export default function FeaturedCard({
  source,
  sourceVariant = "primary",
  badge,
  date,
  title,
  excerpt,
  imageUrl,
  imageAlt,
  href,
}: FeaturedCardProps) {
  const color = sourceVariant === "primary" ? "primary" : "secondary";

  return (
    <article className="md:col-span-8 bg-white border border-gray-100 rounded-xl editorial-shadow overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300">
      <Link href={href} className="flex flex-col md:flex-row h-full">
        {/* Image pane */}
        <div className="md:w-2/5 relative min-h-[240px]">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
        </div>

        {/* Content pane */}
        <div className="p-8 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {badge && (
                <span
                  className={`px-3 py-1 bg-${color} text-white rounded-full text-[10px] font-bold uppercase tracking-wider`}
                >
                  {badge}
                </span>
              )}
              <span className="text-gray-500 text-xs font-medium">{date}</span>
            </div>
            <h2
              className={`font-headline text-2xl font-bold text-gray-900 mb-4 leading-snug group-hover:text-${color} transition-colors`}
            >
              {title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-6">
              {excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className={`font-bold text-sm text-${color}`}>{source}</span>
            <span
              className={`text-${color} font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform`}
            >
              Leer Resumen
              <MaterialIcon name="arrow_forward" size={20} className="text-sm" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
