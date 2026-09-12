"use client";

import { createContext, useActionState, useContext } from "react";
import type { ReactNode } from "react";
import type { AdminFormState } from "@/components/admin/form-state";
import { initialAdminFormState } from "@/components/admin/form-state";
import { adminPrimaryButtonClass } from "@/components/admin/styles";

const FormStateContext = createContext<AdminFormState | null>(null);

export default function ActionForm({
  action,
  children,
  submitLabel,
  className,
}: {
  action: (prev: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  children: ReactNode;
  submitLabel: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);

  return (
    <FormStateContext.Provider value={state}>
      <form action={formAction} className={className}>
        {state.status === "ok" && state.message !== "" && (
          <p className="mb-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            {state.message}
          </p>
        )}
        {state.status === "error" && state.message !== "" && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.message}
          </p>
        )}
        {children}
        <div className="mt-6">
          <button type="submit" disabled={pending} className={adminPrimaryButtonClass}>
            {pending ? "Kaydediliyor..." : submitLabel}
          </button>
        </div>
      </form>
    </FormStateContext.Provider>
  );
}

export function FieldError({ name }: { name: string }) {
  const state = useContext(FormStateContext);
  const first = state?.errors?.[name]?.[0];
  if (!first) return null;
  return <p className="mt-1 text-xs text-red-600">{first}</p>;
}
