import type { ReactNode } from "react";

interface PullTabProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

/* Cekme sekmesi: belge kenarindaki parmak yuvasi */
export default function PullTab({ children, onClick, href, className = "" }: PullTabProps) {
  const cls = `inline-flex items-center gap-2 rounded-t-[4px] border border-b-0 border-ink/50 bg-paper px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper ${className}`;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
