"use client";

import { useEffect } from "react";

export default function AppError({
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
        error_outline
      </span>
      <h2 className="font-headline font-extrabold text-2xl text-on-surface mb-2">
        Algo salió mal
      </h2>
      <p className="text-on-surface-variant max-w-sm mb-6">
        Ocurrió un error inesperado. Intenta de nuevo o contacta soporte si el
        problema persiste.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 gradient-primary text-on-primary px-6 py-3 rounded-full font-bold hover:opacity-90 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-lg">refresh</span>
        Intentar de nuevo
      </button>
    </div>
  );
}
