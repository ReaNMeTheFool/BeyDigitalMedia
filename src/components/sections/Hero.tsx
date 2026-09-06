"use client";

import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SerialStrip from "@/components/document/SerialStrip";
import LedgerRow from "@/components/document/LedgerRow";
import KaseStamp from "@/components/document/KaseStamp";
import SignatureLine from "@/components/document/SignatureLine";
import ActionStamp from "@/components/document/ActionStamp";
import PullTab from "@/components/document/PullTab";

/* Belge basligi: on ek + genisligi kelimeye uyum saglayan slot + son ek */
function AnimatedHeadline({
  words,
  prefix = "Dijital",
  suffix = "Buyutuyoruz",
}: {
  words: string[];
  prefix?: string;
  suffix?: string;
}) {
  const safeWords = words.length > 0 ? words : [
    "Satışlarınızı",
    "Kazancınızı",
    "Verimliliğinizi",
    "Geleceğinizi"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [safeWords.length]);

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-ink whitespace-nowrap">
        {prefix}
      </span>

      <motion.span
        layout
        className="inline-flex items-baseline text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-kase whitespace-nowrap"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={safeWords[currentIndex]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block underline decoration-dotted decoration-[3px] underline-offset-[10px]"
          >
            {safeWords[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <motion.span
        layout
        className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-ink whitespace-nowrap"
      >
        {suffix}
      </motion.span>
    </div>
  );
}

export default function Hero({
  titlePrefix = "Dijital",
  titleSuffix = "Çözümleri",
  animatedWords = ["Satışlarınızı", "Kazancınızı", "Verimliliğinizi", "Geleceğinizi"],
  description = "Bey Digital Media olarak markanızı dijital dünyada büyütmek için Meta Ads, Google Ads, Sosyal Medya Yönetimi ve daha fazlasını sunuyoruz.",
  primaryCta,
  secondaryCta,
  stats = [
    { number: "150+", label: "Tamamlanan Proje" },
    { number: "100+", label: "Memnun Müşteri" },
    { number: "8+", label: "Yıllık Deneyim" },
    { number: "%100", label: "Müşteri Memnuniyeti" },
  ],
}: {
  titlePrefix?: string;
  titleSuffix?: string;
  animatedWords?: string[];
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  stats?: { number: string; label: string }[];
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden w-full bg-paper"
    >
      <h1 className="sr-only">Bey Digital Media - Dijital Pazarlama Ajansı</h1>

      {/* Sonuc belgesi icerigi */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 flex-1 flex flex-col justify-center">
        <SerialStrip serial="001" label="Sonuç Belgesi" />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-12 lg:gap-14 items-start">
          {/* Unvan ve aciklama */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-pencil mb-4">
              Bey Digital Media — Dijital Pazarlama Ajansı
            </p>

            <AnimatedHeadline words={animatedWords} prefix={titlePrefix} suffix={titleSuffix} />

            <p className="mt-6 text-base sm:text-lg text-pencil max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Kase izi ve aksiyon damgalari */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col items-center lg:items-end gap-10">
            <KaseStamp
              text="BEY DIGITAL MEDIA • DİJİTAL PAZARLAMA AJANSI •"
              centerText="BDM"
              subText="TÜRKİYE"
              size={230}
              rotate={-9}
            />

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ActionStamp
                size="lg"
                onClick={() => {
                  const id = primaryCta?.link?.startsWith('#') ? primaryCta.link.slice(1) : 'contact';
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {primaryCta?.text || 'Ücretsiz Analiz Al'}
                <ArrowRight size={18} aria-hidden="true" />
              </ActionStamp>
              <ActionStamp
                variant="ink"
                size="lg"
                onClick={() => {
                  const id = secondaryCta?.link?.startsWith('#') ? secondaryCta.link.slice(1) : 'services';
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {secondaryCta?.text || 'Hizmetlerimiz'}
              </ActionStamp>
            </div>
          </div>

          {/* Cetvel: gercek sayilar satir satir + kurucu imzasi */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
            <div className="max-w-xl border-y border-ink/40">
              {stats.map((stat) => (
                <LedgerRow
                  key={stat.label}
                  label={stat.label}
                  value={stat.number}
                  className="py-3 border-b border-dashed border-ink/25 last:border-b-0"
                />
              ))}
            </div>

            <SignatureLine name="Yiğit Emre Balaban" caption="Kurucu" className="mt-10" />
          </div>
        </div>
      </div>

      {/* Sayfa sonundaki cekme sekmesi */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
        <PullTab
          onClick={() => {
            const element = document.getElementById('services');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="gap-3"
        >
          Daha fazla keşfet
          <ChevronDown size={14} aria-hidden="true" />
        </PullTab>
      </div>
    </section>
  );
}
