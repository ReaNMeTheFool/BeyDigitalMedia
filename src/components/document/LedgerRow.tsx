import type { ReactNode } from "react";

interface LedgerRowProps {
  label: ReactNode;
  value: ReactNode;
  emphasis?: boolean;
  className?: string;
}

/* Defter satiri: etiket -> noktali cetvel -> deger */
export default function LedgerRow({
  label,
  value,
  emphasis = false,
  className = "",
}: LedgerRowProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span
        className={`shrink-0 uppercase tracking-[0.12em] ${
          emphasis
            ? "text-xs sm:text-sm font-bold text-ink"
            : "text-xs sm:text-sm text-pencil"
        }`}
      >
        {label}
      </span>
      <span aria-hidden="true" className="dots-leader translate-y-[-3px]" />
      <span
        className={`font-mono tabular-nums ${
          emphasis ? "text-lg sm:text-xl font-bold text-ink" : "text-sm sm:text-base font-bold text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
