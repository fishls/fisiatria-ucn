"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ResumenError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <span
        className="material-symbols-outlined text-6xl text-error mb-4"
        aria-hidden
      >
        article_shortcut
      </span>
      <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">
        No se pudo cargar el resumen
      </h2>
      <p className="text-on-surface-variant max-w-sm mb-6">
        El artículo no está disponible en este momento.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2.5 rounded-full font-bold hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Reintentar
        </button>
        <Link
          href="/buscar"
          className="inline-flex items-center gap-2 gradient-primary text-on-primary px-5 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Volver al buscador
        </Link>
      </div>
    </div>
  );
}
