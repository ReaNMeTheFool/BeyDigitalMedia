"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";

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
    name: "Baslangic",
    price: "3.500₺+",
    features: [
      "Temel sosyal medya yonetimi",
      "Aylik 12 gonderi tasarimi",
      "Temel SEO analizi",
      "Aylik raporlama",
      "E-posta destegi",
    ],
    highlighted: false,
    ctaText: "Baslangic Paketi",
    ctaLink: "#contact",
  },
  {
    name: "Profesyonel",
    price: "7.500₺+",
    features: [
      "Kapsamli sosyal medya yonetimi",
      "Aylik 20 gonderi tasarimi",
      "Meta & Google Ads yonetimi",
      "SEO ve icerik optimizasyonu",
      "Haftalik raporlama ve danismanlik",
    ],
    highlighted: true,
    ctaText: "Profesyonel Paket",
    ctaLink: "#contact",
  },
  {
    name: "Kurumsal",
    price: "15.000₺+",
    features: [
      "Tum sosyal medya platform yonetimi",
      "Sinirsiz gonderi ve icerik uretimi",
      "Tum reklam platformlari yonetimi",
      "Web sitesi ve SEO yonetimi",
      "7/24 oncelikli destek ve danismanlik",
    ],
    highlighted: false,
    ctaText: "Kurumsal Paket",
    ctaLink: "#contact",
  },
];

export default function Pricing({
  title = "Fiyatlandirma",
  subtitle = "Markaniz icin en uygun paketi secin, dijital dunyada birlikte buyuyelim.",
  packages = defaultPackages,
}: {
  title?: string;
  subtitle?: string;
  packages?: Package[];
}) {
  return (
    <section id="pricing" className="relative py-24 bg-[#181825] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0040ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#ffd76e]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#cdd6f4] mb-4">
            {title}
          </h2>
          <p className="text-[#cdd6f4]/70 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                pkg.highlighted
                  ? "bg-[#0040ff] border-2 border-[#0040ff] shadow-[0_0_40px_rgba(0,64,255,0.3)] scale-105 z-10"
                  : "bg-[#1e1e2e] border border-[#2d2d44] hover:border-[#0040ff]/30"
              } transition-all duration-300`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffd76e] text-[#181825] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                  <Zap size={14} />
                  En Populer
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    pkg.highlighted ? "text-[#cdd6f4]" : "text-[#cdd6f4]"
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      pkg.highlighted ? "text-[#ffd76e]" : "text-[#0040ff]"
                    }`}
                  >
                    {pkg.price}
                  </span>
                  <span className="text-[#cdd6f4]/50 text-sm">/ ay</span>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 shrink-0 ${
                        pkg.highlighted ? "text-[#ffd76e]" : "text-[#0040ff]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        pkg.highlighted ? "text-[#cdd6f4]/90" : "text-[#cdd6f4]/70"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={pkg.ctaLink}
                className={`group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-[#ffd76e] text-[#181825] hover:shadow-lg hover:shadow-[#ffd76e]/25 hover:scale-105"
                    : "bg-[#0040ff]/10 text-[#0040ff] border border-[#0040ff]/30 hover:bg-[#0040ff] hover:text-[#cdd6f4]"
                }`}
              >
                {pkg.ctaText}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none" />
    </section>
  );
}
