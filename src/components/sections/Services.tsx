"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
    imageSrc: "/instaxfacebook.png",
    imageStyle: { marginLeft: "2px" },
    title: "Sosyal Medya Yönetimi",
    description:
      "Hedef kitlenizle güçlü bir bağ kurun. Özgün içerik stratejileri ve proaktif topluluk yönetimi ile organik büyümenizi ve marka bilinirliğinizi artırıyoruz.",
    link: "/sosyal-medya-yonetimi",
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
  },
  {
    icon: Target,
    imageSrc: "/meta_logo_icon_214665.png",
    imageStyle: { filter: "brightness(0) invert(1)" },
    title: "Meta Ads",
    description:
      "Doğru kitleye, doğru bütçeyle ulaşın. Dönüşüm odaklı Meta kampanyaları ve ileri düzey hedefleme algoritmalarıyla reklam getirinizi (ROAS) maksimize edin.",
    link: "/meta-ads",
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
      "Satın alma eğilimi yüksek müşterileri yakalayın. Optimize edilmiş anahtar kelime stratejileriyle arama ağındaki görünürlüğünüzü doğrudan satışa çevirin.",
    link: "/google-ads",
    color: "text-green-600",
    bgColor: "",
    bgStyle: { backgroundColor: "rgba(66, 133, 244, 0.20)" },
  },
  {
    icon: Globe,
    title: "Web Tasarım",
    description:
      "Markanızın dijital vitrinini yeniden yaratıyoruz. Sektörünüzde fark yaratan, modern arayüz tasarımlarına sahip, güven veren ve akılda kalıcı kurumsal web deneyimleri.",
    link: "/web-tasarim",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
  },
  {
    icon: Megaphone,
    title: "SEO",
    description:
      "Arama motorlarında sektör otoritesi olun. Kapsamlı teknik SEO, kaliteli içerik ve güçlü backlink stratejileriyle sürdürülebilir organik trafik elde edin.",
    link: "/seo",
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
  },
  {
    icon: PenTool,
    title: "Logo Tasarımı",
    description:
      "Markanızın hikayesini yansıtan ikonik vizyonlar. İlk bakışta güven veren, akılda kalıcı, modern ve tüm mecralara uyumlu logo çözümleri.",
    link: "/logo-tasarimi",
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
  },
  {
    icon: Palette,
    title: "Kurumsal Kimlik",
    description:
      "Profesyonel imajınızı her alanda standartlaştırın. Dijitalden baskıya tüm temas noktalarında markanıza değer katan, bütüncül bir görsel iletişim dili yaratıyoruz.",
    link: "/kurumsal-kimlik",
    color: "text-rose-600",
    bgColor: "bg-rose-600/10",
  },
  {
    icon: FileText,
    title: "Raporlama",
    description:
      "Büyümenizi şansa bırakmayın. Şeffaf performans metrikleri, derinlemesine analizler ve veriye dayalı aksiyon planlarıyla stratejinizi sürekli geliştiriyoruz.",
    link: "/detayli-raporlama",
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
    <section id="services" className="relative py-24 bg-[#11111b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
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
              <Link
                href={service.link}
                className="inline-flex items-center gap-2 text-[#0040ff] font-semibold text-sm group/link mt-5 pt-4 border-t border-[#2d2d44]"
              >
                <span>Detaylı Bilgi</span>
                <ArrowRight
                  size={16}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
