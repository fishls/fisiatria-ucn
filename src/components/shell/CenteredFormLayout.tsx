import Link from "next/link";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  title: string;
};

type CenteredFormLayoutProps = {
  children: React.ReactNode;
  /** Visual panel props (left column on desktop) */
  visual?: {
    imageSrc: string;
    imageAlt: string;
    headline: string;
    description: string;
  };
  /** Step indicator displayed above the form */
  step?: StepIndicatorProps;
  /** Footer note below form content */
  footerNote?: React.ReactNode;
};

function StepIndicator({ currentStep, totalSteps, stepLabel, title }: StepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-secondary mb-1">
            {stepLabel}
          </span>
          <h3 className="text-2xl font-headline font-extrabold text-on-surface tracking-tight">
            {title}
          </h3>
        </div>
        {/* Step dots */}
        <div className="flex gap-1.5 mb-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={[
                "h-1.5 w-8 rounded-full transition-colors",
                i < currentStep
                  ? "bg-primary"
                  : i === currentStep
                  ? "bg-primary-container"
                  : "bg-surface-container-highest",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CenteredFormLayout({
  children,
  visual,
  step,
  footerNote,
}: CenteredFormLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      {/* Minimal public header */}
      <header className="px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
          <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
            Fisiatría UCN
          </span>
        </Link>
      </header>

      {/* Main split layout */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-4xl grid md:grid-cols-2 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_24px_48px_rgba(15,29,37,0.06)]">

          {/* Left column: decorative visual (hidden on mobile) */}
          {visual && (
            <div className="relative hidden md:block bg-secondary overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary-container/90 mix-blend-multiply z-10" />
              <img
                src={visual.imageSrc}
                alt={visual.imageAlt}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="relative z-20 p-12 h-full flex flex-col justify-end text-white">
                <h2 className="text-4xl font-headline font-extrabold tracking-tighter leading-tight mb-4">
                  {visual.headline}
                </h2>
                <p className="text-white/80 font-medium leading-relaxed">
                  {visual.description}
                </p>
              </div>
            </div>
          )}

          {/* Right column: form content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {step && <StepIndicator {...step} />}
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-400 text-sm">
        {footerNote ?? (
          <p>© {new Date().getFullYear()} Departamento de Fisiatría UCN. Todos los derechos reservados.</p>
        )}
      </footer>
    </div>
  );
}
