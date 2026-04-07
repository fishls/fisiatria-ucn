type StatItem = {
  value: string;
  label: string;
};

type StatsCardProps = {
  icon?: string;
  title: string;
  description: string;
  stats: [StatItem, StatItem];
};

/**
 * StatsCard — col-span-4 filled primary card with impact metrics.
 * Pattern from panel_de_control_fisiatr_a_ucn lines 171–188.
 * Decorative large icon in background + two stat columns separated by a divider.
 */
export default function StatsCard({ icon = "analytics", title, description, stats }: StatsCardProps) {
  const [left, right] = stats;
  return (
    <article className="md:col-span-4 bg-primary text-white rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none" aria-hidden>
        <span className="material-symbols-outlined" style={{ fontSize: "6rem" }}>
          {icon}
        </span>
      </div>

      <h3 className="font-headline text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/90 text-sm mb-6">{description}</p>

      {/* Stats row */}
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{left.value}</div>
          <div className="text-[10px] uppercase opacity-80 font-bold">{left.label}</div>
        </div>
        <div className="w-px h-10 bg-white/20" aria-hidden />
        <div className="text-center">
          <div className="text-2xl font-bold">{right.value}</div>
          <div className="text-[10px] uppercase opacity-80 font-bold">{right.label}</div>
        </div>
      </div>
    </article>
  );
}
