"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Zap, BarChart3, MessageSquare, Workflow, BrainCircuit } from "lucide-react";

const features = [
  { icon: Workflow, label: "Süreç Otomasyonu", desc: "Bir kez kurulur, sonsuza kadar çalışır — ekibiniz asıl işine bakar" },
  { icon: Bot, label: "AI Asistan", desc: "Müşteri taleplerini anlar, yönlendirir ve çözer — sizin yerinize" },
  { icon: BarChart3, label: "Akıllı Analitik", desc: "Neyin işe yaradığını görün, neyin yaramadığını anlayın" },
  { icon: MessageSquare, label: "Chatbot", desc: "Ziyaretçiyi müşteriye dönüştüren akıllı sohbet deneyimi" },
  { icon: Zap, label: "Hız & Verimlilik", desc: "Saatlik işleri dakikaya, günlük işleri saate indirin" },
  { icon: BrainCircuit, label: "AI Entegrasyonu", desc: "Sistemleriniz değişmez — sadece çok daha akıllı hale gelir" },
];

export default function AiAutomation() {
  return (
    <section id="ai-otomasyon" className="relative py-24 xl:py-36 bg-[#181825] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.03] bg-[#8b5cf6] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 xl:gap-24 items-center">

          {/* Left: Feature visual grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#8b5cf6]/5 blur-3xl rounded-full -z-10" />

            <div className="relative bg-gradient-to-br from-[#8b5cf6]/10 to-[#06b6d4]/5 rounded-3xl p-6 xl:p-8 border border-[#8b5cf6]/20 shadow-[0_0_40px_rgba(139,92,246,0.08),inset_0_0_30px_rgba(139,92,246,0.03)] flex flex-col">
              {/* Header label */}
              <div className="flex items-center justify-center gap-2 mb-5 xl:mb-8">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8b5cf6]/40" />
                <span className="text-[#8b5cf6] font-mono text-xs tracking-widest font-semibold">
                  AI × OTOMASYON
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8b5cf6]/40" />
              </div>

              {/* Feature cards 3x2 */}
              <div className="grid grid-cols-2 gap-3 xl:gap-5">
                {features.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="bg-[#1e1e2e] rounded-2xl p-4 xl:p-6 border border-[#2d2d44] hover:border-[#8b5cf6]/40 transition-colors duration-300"
                  >
                    {/* İkon + başlık: mobilde dikey, sm+'da yatay */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mb-2 xl:mb-3">
                      <div className="w-10 h-10 xl:w-14 xl:h-14 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 xl:w-7 xl:h-7 text-[#8b5cf6]" />
                      </div>
                      <p className="text-[#94e2d5] text-sm xl:text-base font-semibold leading-tight">
                        {f.label}
                      </p>
                    </div>
                    <p className="text-[#cdd6f4]/55 text-xs xl:text-sm leading-snug">{f.desc}</p>
                  </motion.div>
                ))}
              </div>



            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#cdd6f4] mb-4 xl:mb-6 leading-tight break-words hyphens-auto">
              Zamanınızı Geri Kazanın,{" "}
              <span className="text-[#8b5cf6]">İşinizi Otomatikleştirin</span>
            </h2>

            <p className="text-[#cdd6f4]/50 text-base xl:text-lg mb-6 xl:mb-8 font-medium">
              Tekrarlayan işlere değil, büyümeye odaklanın.
            </p>

            <div className="space-y-4 text-[#cdd6f4]/70 text-base xl:text-lg leading-relaxed mb-8 xl:mb-10">
              <p>
                Başarılı işletmeler zamanlarını tekrarlayan görevlere değil; büyümeye, inovasyona ve müşterilerine ayırıyor. Yapay zeka çözümlerimizle iş akışlarınızı otomatikleştiriyor, operasyonel yükü minimize ediyor ve ekibinizin gerçek değer ürettiği alanlara odaklanmasını sağlıyoruz.
              </p>
              <p>
                Hazır şablonlar değil — işletmenizin yapısını, süreçlerini ve hedeflerini anlayarak sıfırdan tasarlanmış, gerçekten işe yarayan AI sistemleri kuruyoruz.
              </p>
            </div>

            <Link
              href="/ai-otomasyon"
              className="inline-flex items-center gap-2 px-7 xl:px-9 py-3.5 xl:py-4 bg-[#8b5cf6] rounded-xl xl:text-lg font-semibold text-white hover:opacity-90 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Ayrıntılara Bak
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none" />
    </section>
  );
}
