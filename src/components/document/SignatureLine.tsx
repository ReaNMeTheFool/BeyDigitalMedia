interface SignatureLineProps {
  name: string;
  caption?: string;
  className?: string;
}

/* Imza satiri: noktali kural + elle cizilmis imza vurusu (font degil, SVG) */
export default function SignatureLine({
  name,
  caption,
  className = "",
}: SignatureLineProps) {
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <svg
        viewBox="0 0 150 44"
        className="h-11 w-[150px] text-ink"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M10 34 C 22 8, 34 4, 38 16 C 41 26, 30 32, 27 25 C 33 14, 48 4, 54 14 C 58 22, 50 32, 62 20 C 71 11, 76 9, 82 17 C 86 23, 80 30, 92 21 C 102 14, 108 12, 114 19"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M96 33 C 108 29, 128 27, 142 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span aria-hidden="true" className="dots-leader mt-1 w-[150px] shrink-0" />
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pencil">
          {caption ?? "İmza"}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink">
          {name}
        </span>
      </div>
    </div>
  );
}
