"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  Target,
  Search,
  Globe,
  Megaphone,
  PenTool,
  Palette,
  FileText,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Sosyal Medya Yönetimi",
    description:
      "Instagram, Facebook, LinkedIn ve X platformlarında profesyonel içerik stratejisi, topluluk yönetimi ve etkileşim optimizasyonu.",
    link: "#contact",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    icon: Target,
    imageSrc: "/meta_logo_icon_214665.png",
    title: "Meta Ads",
    description:
      "Facebook ve Instagram reklamlarıyla hedef kitlenize ulaşın. A/B testleri, lookalike kitleler ve dönüşüm odaklı kampanyalar.",
    link: "#contact",
    color: "text-indigo-600",
    bgColor: "",
    bgStyle: { backgroundColor: "rgba(24, 119, 242, 0.40)" },
  },
  {
    icon: Search,
    imageSrc: "/google-ads-transparent.png",
    imageStyle: { marginLeft: "2px" },
    title: "Google Ads",
    description:
      "Arama motoru reklamcılığında uzman desteği. Anahtar kelime optimizasyonu, reklam metni yazımı ve bütçe yönetimi.",
    link: "#contact",
    color: "text-green-600",
    bgColor: "",
    bgStyle: { backgroundColor: "rgba(66, 133, 244, 0.20)" },
  },
  {
    icon: Globe,
    title: "Web Tasarım",
    description:
      "Modern, hızlı ve SEO uyumlu web siteleri. Next.js teknolojisiyle mobil öncelikli, kullanıcı dostu arayüzler.",
    link: "#contact",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    icon: Megaphone,
    title: "SEO",
    description:
      "Organik arama sonuçlarında üst sıralara çıkın. Teknik SEO, içerik optimizasyonu ve backlink stratejileri.",
    link: "#contact",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
  {
    icon: PenTool,
    title: "Logo Tasarımı",
    description:
      "Markanızı temsil eden özgün ve akılda kalıcı logo tasarımları. Vektörel çalışma ve kurumsal kimlik entegrasyonu.",
    link: "#contact",
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
  },
  {
    icon: Palette,
    title: "Kurumsal Kimlik",
    description:
      "Markanızın tüm dokunuş noktalarında tutarlı kimlik. Kartvizit, antetli kağıt, katalog ve ambalaj tasarımları.",
    link: "#contact",
    color: "text-rose-600",
    bgColor: "bg-rose-600/10",
  },
  {
    icon: FileText,
    title: "Detaylı Raporlama",
    description:
      "Aylık performans raporları, analizler ve strateji önerileri. Veriye dayalı kararlarla sürekli iyileştirme.",
    link: "#contact",
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#11111b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-4">
            Hizmetlerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            Dijital <span className="text-[#0040ff]">Büyüme</span> Çözümleri
          </h2>
          <p className="text-[#cdd6f4]/90 text-lg max-w-3xl mx-auto">
            Markanızı dijital dünyada büyütmek için ihtiyacınız olan tüm hizmetler tek çatı altında.
          </p>
        </motion.div>

        {/* Grid - Eşit boyutlu kartlar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-[#1e1e2e] rounded-2xl p-4 sm:p-6 shadow-sm border border-[#2d2d44] hover:shadow-xl hover:border-[#0040ff]/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${"bgStyle" in service ? "" : service.bgColor}`}
                style={"bgStyle" in service ? (service.bgStyle as React.CSSProperties) : undefined}
              >
                {"imageSrc" in service && service.imageSrc ? (
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="object-contain"
                    style={"imageStyle" in service ? (service.imageStyle as React.CSSProperties) : undefined}
                    unoptimized
                  />
                ) : (
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#94e2d5] mb-3">
                {service.title}
              </h3>
              <p className="text-[#cdd6f4]/80 text-sm leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Link */}
              <a
                href={service.link}
                className="inline-flex items-center gap-2 text-[#0040ff] font-semibold text-sm group/link mt-5 pt-4 border-t border-[#2d2d44]"
              >
                <span>Detaylı Bilgi</span>
                <ArrowRight
                  size={16}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
