import type { Metadata } from "next";
import { getAllSeminars } from "@/lib/data";
import { CalendarEventRow } from "@/components/schedule";
import { SectionHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programación Académica — Fisiatría UCN",
  description: "Calendario de presentaciones y seminarios académicos de Fisiatría UCN.",
};

export default async function ProgramacionPage() {
  const seminars = await getAllSeminars();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
              CALENDARIO ACADÉMICO
            </span>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              Programación de Presentaciones
            </h1>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant rounded-full text-sm font-bold text-on-surface hover:bg-surface-container transition-colors self-start">
            <span className="material-symbols-outlined text-sm">sync</span>
            Sincronizar Calendario
          </button>
        </div>
      </header>

      <section>
        <SectionHeader title="Próximas Presentaciones" eyebrow="SEMESTRE OTOÑO 2024" />
        <div className="grid grid-cols-1 gap-6">
          {seminars.map((seminar, i) => (
            <CalendarEventRow
              key={seminar.id}
              month={seminar.month}
              day={seminar.day}
              weekday={seminar.weekday}
              sourceTags={seminar.sourceTags}
              featured={seminar.featured}
              title={seminar.title}
              speakerName={seminar.speakerName}
              time={seminar.time}
              href={seminar.href}
              isActive={i === 0 || seminar.date >= today}
            />
          ))}
        </div>
      </section>

      {/* Info footer */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-surface-container-low rounded-3xl border border-outline-variant">
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Fuentes Académicas</h3>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">auto_stories</span>
              American Journal of Physical Medicine &amp; Rehabilitation (AJPM&amp;R)
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">auto_stories</span>
              Minerva Medica — Fisiatría e Riabilitazione
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface mb-4">Notas</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Las presentaciones se realizan todos los miércoles a las 11:30 AM en el Auditorio
            Principal del Departamento de Fisiatría UCN. Acceso con credenciales institucionales.
          </p>
        </div>
      </section>
    </>
  );
}
