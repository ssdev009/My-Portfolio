import { cn } from "@/lib/utils";

/** Shared neon input styling for <input>, <select> and <textarea>. */
export const inputClass =
  "w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink placeholder:text-muted " +
  "transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/30";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ id, label, error, optional, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="flex items-center justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-mono text-xs text-muted">optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
