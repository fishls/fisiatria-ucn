"use client";

import { useId } from "react";

type ToggleSwitchProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Material Symbol icon name shown to the left of the label */
  icon?: string;
  iconVariant?: "primary" | "secondary";
};

const iconBg: Record<NonNullable<ToggleSwitchProps["iconVariant"]>, string> = {
  primary:   "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
};

export default function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  icon,
  iconVariant = "primary",
}: ToggleSwitchProps) {
  const id = useId();

  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-4">
        {icon && (
          <div className={`p-2 rounded-lg ${iconBg[iconVariant]}`} aria-hidden>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
        <div>
          <p className="font-bold text-on-surface">{label}</p>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>

      {/* CSS-only toggle — pattern from perfil_fisiatr_a_ucn/code.html */}
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={[
            "w-11 h-6 rounded-full transition-colors",
            "bg-slate-200 peer-checked:bg-primary",
            "peer-focus:outline-none",
            // Thumb
            "relative",
            "after:content-[''] after:absolute after:top-[2px] after:start-[2px]",
            "after:bg-white after:border-gray-300 after:border after:rounded-full",
            "after:h-5 after:w-5 after:transition-all",
            "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
            "peer-checked:after:border-white",
          ].join(" ")}
        />
        <span className="sr-only">{label}</span>
      </label>
    </div>
  );
}
