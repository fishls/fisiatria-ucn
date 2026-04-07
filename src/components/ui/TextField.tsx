import { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type TextFieldBaseProps = {
  label: string;
  hint?: string;
  error?: string;
  id: string;
};

type TextFieldInputProps = TextFieldBaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
  };

type TextFieldTextareaProps = TextFieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
    rows?: number;
  };

type TextFieldProps = TextFieldInputProps | TextFieldTextareaProps;

/**
 * Soft-inset text field — bottom-border focus style from the registration screens.
 * Pattern: bg-surface-container-low + border-b-2 that highlights to primary on focus.
 */
export default function TextField(props: TextFieldProps) {
  const { label, hint, error, id, multiline, className, ...rest } = props;

  const inputClasses = [
    "w-full bg-surface-container-low border-0 border-b-2 transition-all duration-200",
    "rounded-t-xl py-4 px-5 text-on-surface placeholder:text-slate-400",
    "focus:outline-none focus:ring-0",
    error
      ? "border-error focus:border-error"
      : "border-transparent focus:border-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="group space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-on-surface-variant tracking-wide px-1"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={(rest as TextFieldTextareaProps).rows ?? 4}
          className={inputClasses}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={inputClasses}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p className="text-xs text-error px-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs" aria-hidden>
            error
          </span>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-500 px-1 italic">{hint}</p>
      )}
    </div>
  );
}
