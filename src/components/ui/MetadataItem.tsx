import MaterialIcon from "./MaterialIcon";

type MetadataItemProps = {
  /** Material Symbol icon name */
  icon: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Icon + text pair used in article metadata rows.
 * Example: calendar_today + "14 de Octubre, 2024"
 *          link + "DOI: 10.1037/neu0000742"
 *          auto_stories + "AJPM&R / Minerva Medica"
 */
export default function MetadataItem({ icon, children, className }: MetadataItemProps) {
  return (
    <div
      className={[
        "flex items-center gap-1.5 text-on-surface-variant font-label text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MaterialIcon name={icon} size={20} className="text-base shrink-0" />
      <span>{children}</span>
    </div>
  );
}
