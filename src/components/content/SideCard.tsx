import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

type SideCardProps = {
  source: string;
  year?: string;
  title: string;
  excerpt: string;
  href: string;
  saveLabel?: string;
};

/**
 * SideCard — col-span-4 secondary bento card (Minerva Medica style).
 * Pattern from panel_de_control_fisiatr_a_ucn lines 120–140.
 */
export default function SideCard({
  source,
  year,
  title,
  excerpt,
  href,
  saveLabel = "Guardar en Biblioteca UCN",
}: SideCardProps) {
  return (
    <article className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl editorial-shadow p-6 flex flex-col justify-between hover:border-secondary transition-all cursor-pointer">
      <Link href={href} className="flex flex-col h-full justify-between">
        <div>
          <div className="mb-4 text-xs font-bold text-secondary tracking-wider flex justify-between items-center">
            <span>{source}</span>
            {year && <span>{year}</span>}
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface mb-3">
            {title}
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-4">
            {excerpt}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
            <MaterialIcon name="bookmark" size={20} className="text-secondary text-sm" />
          </span>
          <span className="text-xs font-bold text-secondary">{saveLabel}</span>
        </div>
      </Link>
    </article>
  );
}
