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
import { defaultServices, type Service } from "@/lib/defaultServices";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Target,
  Search,
  Globe,
  Megaphone,
  PenTool,
  Palette,
  FileText,
};

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

export default function Services({
  showAll = true,
  selectedSlugs,
  services: propServices,
}: {
  showAll?: boolean;
  selectedSlugs?: string[];
  services?: Service[];
}) {
  const sourceServices = propServices || defaultServices;
  const displayedServices = showAll
    ? sourceServices
    : sourceServices.filter((s) => selectedSlugs?.includes(s.link.replace(/^\//, "")));
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
          {displayedServices.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-[#1e1e2e] rounded-2xl p-4 sm:p-6 shadow-sm border border-[#2d2d44] hover:shadow-xl hover:border-[#0040ff]/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  backgroundColor: service.bgStyle ? undefined : service.bgColor,
                  ...(service.bgStyle as React.CSSProperties || {}),
                }}
              >
                {service.imageSrc ? (
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="object-contain"
                    style={service.imageStyle}
                    unoptimized
                  />
                ) : service.icon ? (
                  (() => {
                    const IconComponent = iconMap[service.icon];
                    return IconComponent ? (
                      <IconComponent className={`w-6 h-6 ${service.color}`} />
                    ) : (
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: service.bgColor }} />
                    );
                  })()
                ) : (
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: service.bgColor }} />
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
