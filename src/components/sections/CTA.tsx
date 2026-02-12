"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-[#0040ff] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffd76e]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#cdd6f4]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#cdd6f4]/10 backdrop-blur-sm border border-[#cdd6f4]/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#ffd76e]" />
            <span className="text-[#cdd6f4]/90 text-sm font-medium">
              Sınırlı Kontenjan - Hemen Başvurun
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#cdd6f4] mb-6">
            Dijital <span className="text-[#ffd76e]">Büyüme</span> Yolculuğuna
            <br className="hidden sm:block" /> Bugün Başlayın
          </h2>
          <p className="text-[#cdd6f4]/70 text-lg md:text-xl max-w-3xl mx-auto mb-10">
            Markanızı bir üst seviyeye taşımak için uzman kadromuzla çalışın.
            Ücretsiz analiz ve teklif için hemen iletişime geçin.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group bg-[#ffd76e] text-[#181825] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-[#ffd76e]/25 transition-all duration-300 flex items-center gap-2"
            >
              Ücretsiz Teklif Al
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="tel:+905001234567"
              className="border-2 border-[#cdd6f4]/50 text-[#cdd6f4] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#cdd6f4] hover:text-[#181825] hover:scale-105 transition-all duration-300"
            >
              Hemen Ara
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-[#cdd6f4]/10"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#cdd6f4]">150+</div>
              <div className="text-[#cdd6f4]/50 text-sm">Proje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#cdd6f4]">100+</div>
              <div className="text-[#cdd6f4]/50 text-sm">Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#cdd6f4]">8+</div>
              <div className="text-[#cdd6f4]/50 text-sm">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#cdd6f4]">%100</div>
              <div className="text-[#cdd6f4]/50 text-sm">Memnuniyet</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
