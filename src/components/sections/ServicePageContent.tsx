"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Clapperboard,
  Hash,
  TrendingUp,
  BarChart3,
  Users,
  Sparkles,
  Mail,
  Phone,
} from "lucide-react";
import type { ServiceData } from "@/lib/services-data";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const contactInfo = {
  email: "Beydigitalmedia@gmail.com",
  phone: "+90 544 376 03 39",
};

/* ------------------------------------------------------------------ */
/*  Feature icon mapping                                               */
/* ------------------------------------------------------------------ */
const featureIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  "İçerik Takvimi": CalendarDays,
  "Görsel & Video Üretimi": Clapperboard,
  "Topluluk Yönetimi": Users,
  "Hashtag Stratejisi": Hash,
  "Etkileşim Optimizasyonu": TrendingUp,
  "Aylık Raporlama": BarChart3,
};

function getFeatureIcon(title: string) {
  const Icon = featureIconMap[title] ?? Sparkles;
  return Icon;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ServicePageContent({
  service,
}: {
  service: ServiceData;
}) {
  const accent = service.accentColor;

  return (
    <main className="min-h-screen bg-[#11111b] pt-20">
      {/* ================================================================ */}
      {/*  Hero                                                             */}
      {/* ================================================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-[700px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${accent}22 0%, ${accent}08 55%, transparent 100%)`,
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-[#cdd6f4]/50 mb-8 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-[#cdd6f4] transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link
              href="/#services"
              className="hover:text-[#cdd6f4] transition-colors"
            >
              Hizmetler
            </Link>
            <span>/</span>
            <span style={{ color: accent }}>{service.title}</span>
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#cdd6f4] mb-5 leading-tight">
              {service.title}
            </h1>

            <p className="text-[#cdd6f4]/70 text-xl max-w-3xl leading-relaxed mb-6">
              {service.subtitle}
            </p>

            {/* Premium badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-8"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                backgroundColor: `${accent}12`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              Premium Dijital Hizmet
            </motion.span>

            <div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-100"
                style={{ backgroundColor: accent }}
              >
                Ücretsiz Teklif Alın
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Long Description                                                 */}
      {/* ================================================================ */}
      <section className="relative py-16 bg-[#181825]">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {service.longDescriptionHtml ? (
              <div
                className="text-[#bac2de] text-lg leading-relaxed space-y-5 [&_p]:text-[#bac2de] [&_p]:text-lg [&_p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.longDescriptionHtml }}
              />
            ) : (
              service.longDescription.map((para, i) => (
                <p
                  key={i}
                  className="text-[#bac2de] text-lg leading-relaxed mb-5 last:mb-0"
                >
                  {para}
                </p>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Features                                                         */}
      {/* ================================================================ */}
      <section className="relative py-20 bg-[#11111b]">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#181825] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-3">
              Ne{" "}
              <span style={{ color: accent }}>Sunuyoruz?</span>
            </h2>
            <p className="text-[#cdd6f4]/60 text-[15px] sm:text-base max-w-2xl mx-auto">
              Bu hizmet kapsamında sağladığımız tüm değer ve çözümleri keşfedin.
              Her biri markanızın özel ihtiyaçlarına göre uyarlanır.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {service.features.map((feature) => {
              const Icon = getFeatureIcon(feature.title);
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group bg-[#1e1e2e] rounded-2xl p-5 sm:p-6 border border-[#2d2d44] hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1"
                  style={
                    {
                      "--hover-border": `${accent}40`,
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3">
                    <div
                      className="w-10 h-10 sm:w-[56px] sm:h-[56px] rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accent}18` }}
                    >
                      <Icon size={24} style={{ color: accent }} />
                    </div>
                    <h3 className="text-[#cdd6f4] font-semibold text-[15px] sm:text-base">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[#cdd6f4]/65 text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  Process                                                          */}
      {/* ================================================================ */}
      <section className="relative py-20 bg-[#181825]">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-3">
              Nasıl{" "}
              <span style={{ color: accent }}>Çalışıyoruz?</span>
            </h2>
            <p className="text-[#cdd6f4]/60">
              Şeffaf ve sistematik çalışma sürecimiz
            </p>
          </motion.div>

          <div className="space-y-4">
            {service.process.map((step, index) => {
              const isFirst = index === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="flex gap-4 sm:gap-5 items-start bg-[#1e1e2e] rounded-2xl p-5 sm:p-6 border border-[#2d2d44]"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
                    style={
                      isFirst
                        ? {
                            backgroundColor: accent,
                            color: "#fff",
                          }
                        : {
                            backgroundColor: `${accent}18`,
                            color: accent,
                          }
                    }
                  >
                    {step.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-[#cdd6f4] font-semibold text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#cdd6f4]/70 text-[15px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA                                                              */}
      {/* ================================================================ */}
      <section className="relative py-24 bg-[#11111b]">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#181825] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-block w-16 h-1 rounded-full mb-8"
              style={{ backgroundColor: accent }}
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-4">
              {service.title} için{" "}
              <span style={{ color: accent }}>Hazır mısınız?</span>
            </h2>
            <p className="text-[#cdd6f4]/65 text-lg mb-10 max-w-5xl mx-auto">
              Ücretsiz danışmanlık için hemen iletişime geçin. Size özel
              çözümler geliştirmek için buradayız.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 hover:scale-105 active:scale-100"
              style={{ backgroundColor: accent }}
            >
              İletişime Geç
              <ArrowRight size={20} />
            </Link>

            {/* Contact info row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8 text-[#cdd6f4]/45 text-sm">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 hover:text-[#cdd6f4] transition-colors"
              >
                <Mail size={14} />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-[#cdd6f4] transition-colors"
              >
                <Phone size={14} />
                {contactInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
