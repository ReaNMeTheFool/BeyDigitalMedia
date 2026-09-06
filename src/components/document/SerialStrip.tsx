import type { ReactNode } from "react";

interface SerialStripProps {
  serial: string;
  label?: ReactNode;
  year?: number;
  className?: string;
}

/* Belge basligi: seri numarasi + noktali cetvel + sag etiket */
export default function SerialStrip({
  serial,
  label,
  year,
  className = "",
}: SerialStripProps) {
  const right = label ?? "BEY DIGITAL MEDIA";
  return (
    <div
      className={`flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil ${className}`}
    >
      <span className="text-pencil">Seri No</span>
      <span className="font-bold text-ink">
        BDM-{year ?? new Date().getFullYear()}-{serial}
      </span>
      <span aria-hidden="true" className="dots-leader" />
      <span className="hidden sm:inline text-right">{right}</span>
    </div>
  );
}
