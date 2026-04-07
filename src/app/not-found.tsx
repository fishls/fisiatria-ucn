import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-background">
      <span className="material-symbols-outlined text-7xl text-outline mb-6" aria-hidden>
        search_off
      </span>
      <h1 className="font-headline font-extrabold text-4xl text-on-surface mb-3">
        Página no encontrada
      </h1>
      <p className="text-on-surface-variant max-w-sm mb-8">
        El recurso que busca no existe o fue movido. Vuelva al repositorio principal.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 gradient-primary text-on-primary px-8 py-3 rounded-full font-headline font-bold transition-all hover:opacity-90 active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">home</span>
        Ir al Inicio
      </Link>
    </div>
  );
}
