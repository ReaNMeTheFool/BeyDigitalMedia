"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";

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

export default function ServicePageContent({
  service,
}: {
  service: ServiceData;
}) {
  return (
    <main className="min-h-screen bg-[#11111b] pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-[700px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${service.accentColor}22 0%, ${service.accentColor}08 55%, transparent 100%)`,
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
            <span style={{ color: service.accentColor }}>{service.title}</span>
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
            <p className="text-[#cdd6f4]/70 text-xl max-w-3xl leading-relaxed mb-10">
              {service.subtitle}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-100"
              style={{ backgroundColor: service.accentColor }}
            >
              Ücretsiz Teklif Alın
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Long Description */}
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
            {service.longDescription.map((para, i) => (
              <p
                key={i}
                className="text-[#cdd6f4]/80 text-lg leading-relaxed mb-5 last:mb-0"
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
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
              <span style={{ color: service.accentColor }}>Sunuyoruz?</span>
            </h2>
            <p className="text-[#cdd6f4]/60">
              Bu hizmet kapsamında sağladığımız değer ve çözümler
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {service.features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-[#1e1e2e] rounded-2xl p-6 border border-[#2d2d44] hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1"
                style={
                  {
                    "--hover-border": `${service.accentColor}40`,
                  } as React.CSSProperties
                }
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-[60px] h-[60px] rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${service.accentColor}18` }}
                  >
                    <CheckCircle2 size={30} style={{ color: service.accentColor }} />
                  </div>
                  <h3 className="text-[#94e2d5] font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[#cdd6f4]/65 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
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
              <span style={{ color: service.accentColor }}>Çalışıyoruz?</span>
            </h2>
            <p className="text-[#cdd6f4]/60">
              Şeffaf ve sistematik çalışma sürecimiz
            </p>
          </motion.div>

          <div className="space-y-4">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="flex gap-5 items-start bg-[#1e1e2e] rounded-2xl p-6 border border-[#2d2d44]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
                  style={{
                    backgroundColor: `${service.accentColor}18`,
                    color: service.accentColor,
                  }}
                >
                  {step.step}
                </div>
                <div>
                  <h3 className="text-[#94e2d5] font-semibold text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#cdd6f4]/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              style={{ backgroundColor: service.accentColor }}
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#cdd6f4] mb-4">
              {service.title} için{" "}
              <span style={{ color: service.accentColor }}>Hazır mısınız?</span>
            </h2>
            <p className="text-[#cdd6f4]/65 text-lg mb-10 max-w-5xl mx-auto">
              Ücretsiz danışmanlık için hemen iletişime geçin. Size özel
              çözümler geliştirmek için buradayız.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-9 py-4 rounded-xl font-bold text-lg text-white transition-all hover:opacity-90 hover:scale-105 active:scale-100"
              style={{ backgroundColor: service.accentColor }}
            >
              İletişime Geç
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
