type Tone = "paper" | "paper-alt";

interface PerforationDividerProps {
  /* Delik rengi = ustteki panelin zemin rengi */
  tone?: Tone;
  className?: string;
}

/* Perfore yirtma cercevi: ust panelin zemininden delinmis yarim daireler + kesik cizgi */
export default function PerforationDivider({
  tone = "paper",
  className = "",
}: PerforationDividerProps) {
  const hole = tone === "paper" ? "var(--color-paper)" : "var(--color-paper-alt)";
  return (
    <div
      aria-hidden="true"
      className={`h-[16px] w-full border-b border-dashed border-ink/25 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 12px -4px, ${hole} 7px, transparent 7.5px)`,
        backgroundSize: "24px 16px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
