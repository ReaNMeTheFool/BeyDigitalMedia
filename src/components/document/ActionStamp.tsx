import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

type Variant = "action" | "ink";

interface ActionStampBaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type ActionStampProps = ActionStampBaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

/* Tek kirmizi aksiyon damgasi: gercek butun/link/submit semantigi korunur.
   action = kirmizi (yuzeydeki tek kirmizi), ink = ikincil murekkep damgasi. */
export default function ActionStamp({
  children,
  variant = "action",
  size = "md",
  className = "",
  ...rest
}: ActionStampProps) {
  const base = `inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-[0.14em] transition-[transform,background-color,color,box-shadow] duration-150 active:translate-y-[1px] active:scale-[0.98] ${
    sizeClasses[size]
  } ${
    variant === "action"
      ? "border-[2.5px] border-action bg-action text-paper shadow-[inset_0_0_0_2px_var(--color-paper)] hover:brightness-110"
      : "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper"
  } ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as {
      href: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>;
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={base} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={base} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "href"
  >;
  return (
    <button type={type} className={base} {...buttonProps}>
      {children}
    </button>
  );
}
