import type { Metadata } from "next";
import { Suspense } from "react";
import { searchAbstracts } from "@/lib/data";
import { SOURCE_VARIANT, type JournalSource } from "@/types";
import { FilterSidebar } from "@/components/search";
import { AbstractListItem } from "@/components/content";
import { Badge, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Búsqueda — Fisiatría UCN",
  description: "Busque en bases de datos médicas premium de Medicina Física y Rehabilitación.",
};

type SearchPageProps = {
  searchParams: {
    q?: string;
    journals?: string;
    desde?: string;
    hasta?: string;
  };
};

export default async function BuscarPage({ searchParams }: SearchPageProps) {
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
          BASE DE DATOS CLÍNICA
        </span>
        <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
          Búsqueda Avanzada
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Refine su búsqueda en bases de datos médicas premium. Seleccione sus criterios
          específicos para acceder a revistas revisadas por pares.
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
              title={`${results.length} resultado${results.length !== 1 ? "s" : ""}`}
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
              <p className="font-headline font-bold text-lg">Sin resultados</p>
              <p className="text-sm mt-1">Intente con otros términos o amplíe el rango de fechas.</p>
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
