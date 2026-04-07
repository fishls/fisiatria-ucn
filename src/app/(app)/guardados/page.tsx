import type { Metadata } from "next";
import { getSavedAbstractIds, getSavedSeminarIds, getAllAbstracts, getSavedSeminars } from "@/lib/data";
import { getSession } from "@/lib/auth/session";
import { SOURCE_VARIANT } from "@/types";
import { SavedArticleCard, SeminarCard } from "@/components/content";
import { SectionHeader, Chip } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guardados — Fisiatría UCN",
  description: "Artículos y presentaciones guardados en su biblioteca personal.",
};

const FILTER_CHIPS = ["Todos", "Journal", "Fecha", "Tipo"];

export default async function GuardadosPage() {
  const session = await getSession();

  const [savedIds, allAbstracts] = await Promise.all([
    session ? getSavedAbstractIds(session.uid) : Promise.resolve([]),
    getAllAbstracts(),
  ]);

  const savedArticles = allAbstracts.filter((a) => savedIds.includes(a.id));

  const savedSeminarIds = session ? await getSavedSeminarIds(session.uid) : [];
  const savedSeminars   = await getSavedSeminars(savedSeminarIds);

  return (
    <>
      {/* Header + filter bar */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
              MI BIBLIOTECA
            </span>
            <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              Guardados
            </h1>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {FILTER_CHIPS.map((label, i) => (
            <Chip key={label} variant={i === 0 ? "active" : "inactive"} icon={i === 0 ? "filter_list" : undefined}>
              {label}
            </Chip>
          ))}
        </div>
      </section>

      {/* Saved Articles */}
      <section className="mb-12">
        <SectionHeader
          title="Artículos Científicos Guardados"
          action={{ label: "Ver todo", href: "/buscar" }}
        />
        {savedArticles.length === 0 ? (
          <p className="text-on-surface-variant text-sm py-8 text-center">No tienes artículos guardados aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedArticles.map((article) => (
              <SavedArticleCard
                key={article.id}
                source={article.journal}
                sourceVariant={SOURCE_VARIANT[article.journal]}
                title={article.title}
                tags={article.tags}
                date={article.publishedAtShort}
                href={article.href}
              />
            ))}
          </div>
        )}
      </section>

      {/* Saved Seminars */}
      <section className="mb-12">
        <SectionHeader title="Presentaciones Guardadas" />
        {savedSeminars.length === 0 ? (
          <p className="text-on-surface-variant text-sm py-8 text-center">No tienes presentaciones guardadas aún.</p>
        ) : (
          <div className="space-y-4">
            {savedSeminars.map((seminar) => (
              <SeminarCard
                key={seminar.id}
                imageUrl={`https://placehold.co/192x128/e1f0fb/006591?text=${encodeURIComponent(seminar.sourceTags[0] ?? "UCN")}`}
                imageAlt={seminar.imageAlt}
                date={seminar.dateLabel}
                time={seminar.time}
                title={seminar.title}
                speakerName={seminar.speakerName}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
