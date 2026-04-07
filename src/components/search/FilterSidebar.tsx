"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { JournalSource } from "@/types";

type Journal = { id: JournalSource; label: string };

type FilterSidebarProps = {
  journals?: Journal[];
};

const DEFAULT_JOURNALS: Journal[] = [
  { id: "AJPM&R",              label: "AJPM&R" },
  { id: "Minerva Medica",      label: "Minerva Medica" },
  { id: "The Lancet Oncology", label: "The Lancet Oncology" },
  { id: "NEJM Archive",        label: "NEJM Archive" },
];

/**
 * FilterSidebar — search filters synced to URL search params.
 * State lives in the URL so results are shareable and bookmarkable.
 * Reading: useSearchParams()  |  Writing: router.replace() via transition
 */
export default function FilterSidebar({ journals = DEFAULT_JOURNALS }: FilterSidebarProps) {
  const router     = useRouter();
  const pathname   = usePathname();
  const params     = useSearchParams();
  const [pending, startTransition] = useTransition();

  // Read current filter state from URL
  const keywords  = params.get("q") ?? "";
  const dateFrom  = params.get("desde") ?? "2019-01-01";
  const dateTo    = params.get("hasta") ?? new Date().toISOString().slice(0, 10);
  const rawJournals = params.get("journals");
  const selectedJournals: JournalSource[] = rawJournals
    ? (rawJournals.split(",") as JournalSource[])
    : ["AJPM&R", "Minerva Medica"];

  /** Push updated params to the URL without a full page reload */
  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }

  function toggleJournal(id: JournalSource) {
    const next = selectedJournals.includes(id)
      ? selectedJournals.filter((j) => j !== id)
      : [...selectedJournals, id];
    updateParam("journals", next.join(","));
  }

  const setDateRange = useCallback((preset: "5y" | "all") => {
    const next = new URLSearchParams(params.toString());
    if (preset === "5y") {
      next.set("desde", "2019-01-01");
      next.set("hasta", new Date().toISOString().slice(0, 10));
    } else {
      next.set("desde", "2000-01-01");
      next.set("hasta", new Date().toISOString().slice(0, 10));
    }
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }, [params, pathname, router]);

  function handleSearch() {
    // Trigger navigation — page reads params server-side
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  const isPreset5y = dateFrom === "2019-01-01";

  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className={[
        "bg-surface-container-lowest p-8 rounded-xl shadow-card transition-opacity",
        pending ? "opacity-60 pointer-events-none" : "",
      ].join(" ")}>
        <h3 className="font-headline font-bold text-xl text-primary mb-6 flex items-center gap-2">
          <MaterialIcon name="filter_list" className="text-primary" />
          Parámetros de Búsqueda
        </h3>

        {/* Keywords */}
        <div className="mb-8">
          <label className="block font-label text-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
            Palabras Clave
          </label>
          <div className="relative">
            <input
              type="text"
              value={keywords}
              onChange={(e) => updateParam("q", e.target.value)}
              placeholder="p. ej. Neurorehabilitación"
              className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 font-body transition-all text-on-surface placeholder:text-outline"
            />
            <MaterialIcon name="label" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          </div>
        </div>

        {/* Journal checkboxes */}
        <div className="mb-8">
          <label className="block font-label text-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
            Revistas
          </label>
          <div className="space-y-3">
            {journals.map(({ id, label }) => (
              <label key={id} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedJournals.includes(id)}
                  onChange={() => toggleJournal(id)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/30 cursor-pointer"
                />
                <span className="ml-3 font-body text-on-surface group-hover:text-primary transition-colors">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div className="mb-8">
          <label className="block font-label text-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">
            Rango de Fechas
          </label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(["5y", "all"] as const).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDateRange(preset)}
                className={[
                  "font-label text-xs py-2 px-3 rounded-full font-bold transition-colors",
                  (preset === "5y" ? isPreset5y : !isPreset5y)
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest",
                ].join(" ")}
              >
                {preset === "5y" ? "Últimos 5 años" : "Archivo Completo"}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase ml-1">DESDE</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => updateParam("desde", e.target.value)}
                className="w-full mt-1 bg-surface-container-high border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-outline uppercase ml-1">HASTA</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => updateParam("hasta", e.target.value)}
                className="w-full mt-1 bg-surface-container-high border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={pending}
          className="w-full gradient-primary text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {pending ? "Buscando…" : "Ejecutar Búsqueda"}
        </button>
      </div>

      {/* Verified sources note */}
      <div className="bg-tertiary-container/10 p-6 rounded-xl border border-tertiary/10">
        <div className="flex gap-4">
          <MaterialIcon name="verified_user" fill={1} className="text-tertiary shrink-0" />
          <div>
            <h4 className="font-headline font-bold text-tertiary text-sm">Datos Clínicos Verificados</h4>
            <p className="text-xs text-on-tertiary-container mt-1 leading-relaxed">
              Su búsqueda está restringida a fuentes indexadas con un alto factor de impacto (&gt;3.5).
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
