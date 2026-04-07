type MaterialIconProps = {
  /** Material Symbol icon name, e.g. "arrow_forward", "bookmark" */
  name: string;
  /** FILL axis: 0 = outline (default), 1 = filled */
  fill?: 0 | 1;
  /** WGHT axis: 100–700, default 400 */
  weight?: number;
  /** OPSZ axis: 20, 24 (default), 40, 48 */
  size?: 20 | 24 | 40 | 48;
  /** Extra Tailwind classes (e.g. text-primary, text-2xl) */
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
};

/**
 * Thin wrapper around Material Symbols Outlined variable font.
 * Exposes the three variable axes — FILL, WGHT, OPSZ — as props
 * instead of requiring callers to write inline styles.
 *
 * Usage:
 *   <MaterialIcon name="bookmark" fill={1} className="text-primary text-xl" />
 */
export default function MaterialIcon({
  name,
  fill = 0,
  weight = 400,
  size = 24,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: MaterialIconProps) {
  return (
    <span
      className={["material-symbols-outlined", className].filter(Boolean).join(" ")}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}
