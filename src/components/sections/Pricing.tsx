"use client";

import { Check } from "lucide-react";
import ActionStamp from "@/components/document/ActionStamp";
import PerforationDivider from "@/components/document/PerforationDivider";

interface Package {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaLink: string;
}

const defaultPackages: Package[] = [
  {
    name: "Başlangıç",
    price: "3.500₺+",
    features: [
      "Temel sosyal medya yönetimi",
      "Aylık 12 gönderi tasarımı",
      "Temel SEO analizi",
      "Aylık raporlama",
      "E-posta desteği",
    ],
    highlighted: false,
    ctaText: "Başlangıç Paketi",
    ctaLink: "#contact",
  },
  {
    name: "Profesyonel",
    price: "7.500₺+",
    features: [
      "Kapsamlı sosyal medya yönetimi",
      "Aylık 20 gönderi tasarımı",
      "Meta & Google Ads yönetimi",
      "SEO ve içerik optimizasyonu",
      "Haftalık raporlama ve danışmanlık",
    ],
    highlighted: true,
    ctaText: "Profesyonel Paket",
    ctaLink: "#contact",
  },
  {
    name: "Kurumsal",
    price: "15.000₺+",
    features: [
      "Tüm sosyal medya platform yönetimi",
      "Sınırsız gönderi ve içerik üretimi",
      "Tüm reklam platformları yönetimi",
      "Web sitesi ve SEO yönetimi",
      "7/24 öncelikli destek ve danışmanlık",
    ],
    highlighted: false,
    ctaText: "Kurumsal Paket",
    ctaLink: "#contact",
  },
];

export default function Pricing({
  title = "Fiyatlandırma",
  subtitle = "Markanız için en uygun paketi seçin, dijital dünyada birlikte büyüyelim.",
  packages = defaultPackages,
}: {
  title?: string;
  subtitle?: string;
  packages?: Package[];
}) {
  return (
    <section id="pricing" className="relative py-20 bg-paper-alt overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* Baslik */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Keşif Özeti / Paketler
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4">
            {title}
          </h2>
          <p className="text-pencil text-lg max-w-2xl">{subtitle}</p>
        </div>

        {/* Paket belgeleri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto items-start">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative rounded-[3px] p-7 flex flex-col bg-paper border ${
                pkg.highlighted
                  ? "border-[2.5px] border-ink shadow-doc"
                  : "border-ink/30"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-6 bg-kase text-paper px-3 py-1 rounded-[3px] font-mono text-[10px] uppercase tracking-[0.18em] font-bold">
                  En Popüler
                </div>
              )}

              <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-pencil mb-5">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="dots-leader" />
                <span>Teklif</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-ink mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-mono font-bold tabular-nums text-ink">
                    {pkg.price}
                  </span>
                  <span className="text-pencil text-sm font-mono">/ ay</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 border-t border-dashed border-ink/30">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 py-2.5 border-b border-dashed border-ink/25"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-pencil">{feature}</span>
                  </li>
                ))}
              </ul>

              <ActionStamp
                href={pkg.ctaLink}
                variant={pkg.highlighted ? "action" : "ink"}
                size="md"
                className="w-full"
              >
                {pkg.ctaText}
              </ActionStamp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
