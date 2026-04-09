import type { Metadata } from "next";
import { Suspense } from "react";
import { searchAbstracts } from "@/lib/data";
import { SOURCE_VARIANT, type JournalSource } from "@/types";
import { FilterSidebar } from "@/components/search";
import { AbstractListItem } from "@/components/content";
import { Badge, SectionHeader } from "@/components/ui";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("search.title")} — ${t("app.name")}`,
    description: t("search.description"),
  };
}

type SearchPageProps = {
  searchParams: {
    q?: string;
    journals?: string;
    desde?: string;
    hasta?: string;
  };
};

export default async function BuscarPage({ searchParams }: SearchPageProps) {
  const t = await getTranslations();
  const sp = searchParams;

  const journals = sp.journals
    ? (sp.journals.split(",") as JournalSource[])
    : ["AJPM&R" as JournalSource, "Minerva Medica" as JournalSource];

  const results = await searchAbstracts({
    keywords: sp.q ?? "",
    journals,
    dateFrom: sp.desde ?? "2019-01-01",
    dateTo:   sp.hasta ?? new Date().toISOString().slice(0, 10),
  });

  return (
    <>
      {/* Page header */}
      <header className="mb-10">
        <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
          {t("search.subtitle")}
        </span>
        <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
          {t("search.title")}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          {t("search.description")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FilterSidebar — col 4, client component wrapped in Suspense */}
        <Suspense fallback={<div className="lg:col-span-4 animate-pulse bg-surface-container rounded-xl h-96" />}>
          <FilterSidebar />
        </Suspense>

        {/* Results — col 8 */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader
              title={`${results.length} ${results.length === 1 ? t("search.results") : t("search.resultsPlural")}`}
              className="mb-0"
            />
            {sp.q && (
              <Badge variant="outlined-secondary" size="sm">
                &ldquo;{sp.q}&rdquo;
              </Badge>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-4 block text-outline">search_off</span>
              <p className="font-headline font-bold text-lg">{t("search.noResults")}</p>
              <p className="text-sm mt-1">{t("search.noResultsDesc")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((a) => (
                <AbstractListItem
                  key={a.id}
                  source={a.journal}
                  sourceVariant={SOURCE_VARIANT[a.journal]}
                  date={a.publishedAtShort}
                  title={a.title}
                  tags={a.tags}
                  href={a.href}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
