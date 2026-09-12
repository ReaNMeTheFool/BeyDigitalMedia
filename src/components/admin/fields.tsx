import type { ReactNode } from "react";
import { FieldError } from "@/components/admin/ActionForm";
import { adminInputClass, adminTextareaClass } from "@/components/admin/styles";

export function Field({
  label,
  name,
  hint,
  children,
}: {
  label: string;
  name?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {name != null ? (
        <label htmlFor={name} className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
          {label}
        </label>
      ) : (
        <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</span>
      )}
      {children}
      {hint != null && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
      {name != null && <FieldError name={name} />}
    </div>
  );
}

export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
  step,
  min,
  max,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: "text" | "date" | "number" | "color";
  required?: boolean;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  hint?: string;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className={adminInputClass}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  monospace,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  monospace?: boolean;
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        required={required}
        className={`${adminTextareaClass} ${monospace ? "font-mono text-xs" : ""}`}
      />
    </Field>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
  emptyLabel,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  options: { value: string; label: string }[];
  emptyLabel?: string;
  hint?: string;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <select id={name} name={name} defaultValue={defaultValue != null ? String(defaultValue) : ""} className={adminInputClass}>
        {emptyLabel != null && <option value="">{emptyLabel}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 py-2 text-sm text-neutral-700">
      <input type="checkbox" name={name} value="1" defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
