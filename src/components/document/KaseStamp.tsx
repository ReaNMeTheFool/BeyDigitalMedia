"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface KaseStampProps {
  text: string;
  centerText: string;
  subText?: string;
  size?: number;
  rotate?: number;
  accessibleText?: string;
  className?: string;
}

/* Kase damgasi: cift halkali, preslenmis mor murekkep izi. Dekoratiftir. */
export default function KaseStamp({
  text,
  centerText,
  subText,
  size = 224,
  rotate = -8,
  accessibleText,
  className = "",
}: KaseStampProps) {
  const ringId = useId();
  const reduceMotion = useReducedMotion();

  const stamp = (
    <div
      aria-hidden="true"
      className={`kase-ink pointer-events-none select-none text-kase ${className}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <defs>
          <path
            id={ringId}
            d="M100,100 m-71,0 a71,71 0 1,1 142,0 a71,71 0 1,1 -142,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="2.6"
          fontFamily="var(--font-courier), monospace"
        >
          <textPath href={`#${ringId}`}>{text}</textPath>
        </text>
        <text
          x="100"
          y="97"
          textAnchor="middle"
          fill="currentColor"
          fontSize="34"
          fontWeight="700"
          letterSpacing="3"
          fontFamily="var(--font-sans), sans-serif"
        >
          {centerText}
        </text>
        {subText ? (
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fill="currentColor"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="2.4"
            fontFamily="var(--font-courier), monospace"
          >
            {subText}
          </text>
        ) : null}
      </svg>
    </div>
  );

  return (
    <div className="relative inline-block">
      {reduceMotion ? (
        stamp
      ) : (
        <motion.div
          initial={{ scale: 1.16, opacity: 0 }}
          whileInView={{ scale: [1.16, 0.985, 1], opacity: [0, 1, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.28, times: [0, 0.45, 1], ease: "easeOut" }}
        >
          {stamp}
        </motion.div>
      )}
      {accessibleText ? (
        <span className="sr-only">{accessibleText}</span>
      ) : null}
    </div>
  );
}
