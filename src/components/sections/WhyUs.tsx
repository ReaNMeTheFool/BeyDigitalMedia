"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Clock, Users, Award, Zap } from "lucide-react";

const defaultReasons = [
  {
    icon: "TrendingUp",
    title: "Sonuç Odaklı Yaklaşım",
    description: "Her projede ölçülebilir KPI'lar belirliyor ve düzenli raporlarla ilerlemeyi takip ediyoruz.",
  },
  {
    icon: "Clock",
    title: "7/24 Destek",
    description: "Müşterilerimize haftanın her günü, günün her saati destek sağlıyoruz.",
  },
  {
    icon: "Users",
    title: "Deneyimli Ekip",
    description: "8+ yıllık sektör deneyimiyle uzman kadromuz hizmetinizde.",
  },
  {
    icon: "Award",
    title: "Profesyonel İş Ahlakı",
    description: "Şeffaf iletişim, dürüst fiyatlandırma ve zamanında teslimat ilkelerimizdir.",
  },
  {
    icon: "Zap",
    title: "Hızlı Dönüş",
    description: "Taleplerinize en hızlı şekilde yanıt veriyor ve aksiyon alıyoruz.",
  },
  {
    icon: "CheckCircle2",
    title: "Özelleştirilmiş Stratejiler",
    description: "Her marka farklıdır. Size özel, kişiselleştirilmiş çözümler sunuyoruz.",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Clock,
  Users,
  Award,
  Zap,
  CheckCircle2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function WhyUs({
  title = 'Farkımız <span class="text-[#0040ff]">Ne?</span>',
  subtitle = "Bey Digital Media olarak sadece bir ajans değil, dijital büyüme ortağınız olmayı hedefliyoruz.",
  reasons: propReasons,
}: {
  title?: string;
  subtitle?: string;
  reasons?: { icon: string; title: string; description: string }[];
}) {
  const activeReasons = propReasons && propReasons.length > 0 ? propReasons : defaultReasons;
  return (
    <section id="why-us" className="relative py-24 bg-[#181825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#cdd6f4] mb-6" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-[#cdd6f4]/90 text-lg max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeReasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group p-6 bg-[#181825] rounded-2xl border border-[#2d2d44] hover:border-[#0040ff]/30 hover:shadow-lg hover:shadow-[#0040ff]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-5 mb-5 w-full">
                <div className="w-14 h-14 shrink-0 bg-[#0040ff]/10 rounded-xl flex items-center justify-center group-hover:bg-[#0040ff] group-hover:scale-110 transition-all duration-300">
                  {(() => {
                    const IconComponent = iconMap[reason.icon];
                    return IconComponent ? (
                      <IconComponent className="w-7 h-7 text-[#0040ff] group-hover:text-[#cdd6f4] transition-colors" />
                    ) : null;
                  })()}
                </div>
                <h3 className="flex-1 text-lg font-bold text-[#a6adc8] leading-tight">
                  {reason.title}
                </h3>
              </div>
              <p className="text-[#cdd6f4]/80 leading-relaxed text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#11111b] pointer-events-none" />
    </section>
  );
}
