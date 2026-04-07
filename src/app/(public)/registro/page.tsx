"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import CenteredFormLayout from "@/components/shell/CenteredFormLayout";
import { TextField, Button } from "@/components/ui";

export default function RegistroPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("full_name") as HTMLInputElement).value.trim();
    const email    = (form.elements.namedItem("email")     as HTMLInputElement).value.trim();

    if (!fullName || !email) return;

    sessionStorage.setItem("reg_fullName", fullName);
    sessionStorage.setItem("reg_email",    email);

    router.push("/registro/seguridad");
  }

  return (
    <CenteredFormLayout
      visual={{
        imageSrc: "https://placehold.co/600x800/006591/ffffff?text=Fisiatría+UCN",
        imageAlt: "Laboratorio de investigación en rehabilitación",
        headline: "Únete a la Vanguardia Clínica.",
        description:
          "Comienza tu proceso de integración para acceder a protocolos personalizados y seguimiento de rehabilitación avanzada.",
      }}
      step={{
        currentStep: 0,
        totalSteps: 3,
        stepLabel: "Paso 1 de 3",
        title: "Información Personal",
      }}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <TextField
          id="full_name"
          name="full_name"
          label="Nombre Completo"
          type="text"
          placeholder="Ej: Dr. Alejandro Valdivia"
          required
        />
        <TextField
          id="email"
          name="email"
          label="Correo Electrónico Institucional"
          type="email"
          placeholder="nombre@ucn.cl"
          hint="Utilice su cuenta institucional para validación automática."
          required
        />

        <div className="pt-6 flex flex-col gap-4">
          <Button
            variant="primary"
            size="lg"
            shape="rounded"
            trailingArrow
            type="submit"
            className="w-full shadow-lg"
          >
            Siguiente Paso
          </Button>
          <p className="text-center text-sm text-on-surface-variant">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-secondary font-bold hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-container rounded-2xl">
          <span
            className="material-symbols-outlined text-secondary text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">
            Conexión Segura SSL &amp; HIPAA Compliant
          </span>
        </div>
      </form>
    </CenteredFormLayout>
  );
}
