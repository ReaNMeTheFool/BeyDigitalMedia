"use client";

import { useState } from "react";
import { adminInputClass, adminTextareaClass } from "@/components/admin/styles";

export interface RepeatField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "json";
  placeholder?: string;
}

export type RepeatRow = Record<string, unknown>;

/**
 * Tekrarlanabilir form satirlari. Input adlari `name.<index>.<key>`
 * bicimindedir; sunucu tarafinda readRows() ile okunur.
 */
export default function RepeatableRows({
  name,
  fields,
  initialRows,
  addLabel,
}: {
  name: string;
  fields: RepeatField[];
  initialRows?: RepeatRow[] | null;
  addLabel: string;
}) {
  const [rows, setRows] = useState<RepeatRow[]>(initialRows ?? []);

  return (
    <div className="rounded border border-neutral-200 bg-white">
      {rows.length === 0 && <p className="px-3 py-3 text-sm text-neutral-400">Satır yok.</p>}
      <ul className="divide-y divide-neutral-200">
        {rows.map((row, index) => (
          <li key={index} className="flex flex-wrap items-start gap-3 px-3 py-3">
            {fields.map((field) => {
              const fieldName = `${name}.${index}.${field.key}`;
              const value = row[field.key];
              const wide = field.type === "textarea" || field.type === "json";
              return (
                <div key={field.key} className={wide ? "min-w-[16rem] flex-[2]" : "min-w-[10rem] flex-1"}>
                  <label htmlFor={fieldName} className="mb-1 block text-xs font-medium text-neutral-500">
                    {field.label}
                  </label>
                  {field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      id={fieldName}
                      name={fieldName}
                      rows={field.type === "json" ? 3 : 2}
                      defaultValue={
                        field.type === "json" ? JSON.stringify(value ?? [], null, 2) : String(value ?? "")
                      }
                      className={`${adminTextareaClass} ${field.type === "json" ? "font-mono text-xs" : ""}`}
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      id={fieldName}
                      name={fieldName}
                      type="checkbox"
                      value="1"
                      defaultChecked={Boolean(value)}
                      className="mt-2 h-4 w-4"
                    />
                  ) : (
                    <input
                      id={fieldName}
                      name={fieldName}
                      type="text"
                      defaultValue={String(value ?? "")}
                      placeholder={field.placeholder}
                      className={adminInputClass}
                    />
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
              className="self-end pb-2 text-xs text-red-600 hover:underline"
            >
              Kaldır
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-neutral-200 px-3 py-2">
        <button
          type="button"
          onClick={() => setRows((prev) => [...prev, {}])}
          className="text-xs font-medium text-neutral-700 hover:underline"
        >
          + {addLabel}
        </button>
      </div>
    </div>
  );
}
