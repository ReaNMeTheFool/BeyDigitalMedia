"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Sosyal medya yönetimi hizmetiniz neleri kapsıyor?",
    answer:
      "Sosyal medya yönetimi hizmetimiz; içerik stratejisi oluşturma, gönderi tasarımı ve paylaşımı, topluluk yönetimi, etkileşim takibi, reklam kampanyası yönetimi ve aylık performans raporlamasını kapsar. Instagram, Facebook, LinkedIn ve X platformlarında profesyonel yönetim sağlıyoruz.",
  },
  {
    question: "Meta Ads ve Google Ads yönetimi için minimum bütçe nedir?",
    answer:
      "Reklam bütçesi sektörünüze, hedeflerinize ve rekabet düzeyine göre değişir. Genel olarak günlük 200-500 TL'den başlayan bütçelerle etkili kampanyalar yürütebiliriz. Ücretsiz danışmanlık görüşmesinde size özel bir bütçe planlaması yapıyoruz.",
  },
  {
    question: "Web tasarım projeleri ne kadar sürede tamamlanır?",
    answer:
      "Kurumsal web sitesi projeleri ortalama 2-4 hafta, e-ticaret projeleri ise 4-8 hafta içinde tamamlanır. Projenin kapsamına, içerik hazırlık sürecine ve onay aşamalarına bağlı olarak bu süre değişebilir. Her aşamada sizi bilgilendiriyoruz.",
  },
  {
    question: "SEO çalışmaları ne zaman sonuç vermeye başlar?",
    answer:
      "SEO çalışmaları genellikle 3-6 ay içinde belirgin sonuçlar vermeye başlar. Ancak bu süre sektör rekabetine, mevcut sitenizin durumuna ve hedef anahtar kelimelerin zorluğuna göre değişebilir. Sürekli optimizasyon ve içerik üretimi ile uzun vadeli organik büyüme sağlıyoruz.",
  },
  {
    question: "Logo ve kurumsal kimlik tasarımı süreci nasıl işler?",
    answer:
      "İlk olarak marka brief'i oluşturarak markanızın kimliğini, değerlerini ve hedef kitlenizi anlıyoruz. Ardından 3 farklı konsept tasarım sunuyor, seçilen yönde revizyonlar yapıyor ve final dosyaları teslim ediyoruz. Ortalama süre 1-2 haftadır.",
  },
  {
    question: "Aylık raporlarda hangi metrikleri paylaşıyorsunuz?",
    answer:
      "Aylık raporlarımızda; erişim, etkileşim, takipçi büyümesi, web sitesi trafiği, dönüşüm oranları, reklam performans metrikleri (ROAS, CPC, CTR) ve SEO sıralama değişimlerini detaylı şekilde sunuyoruz. Verileri anlaşılır grafiklerle destekliyoruz.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#181825]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            Sıkça Sorulan Sorular
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            Merak <span className="text-[#0040ff]">Ettikleriniz</span>
          </h2>
          <p className="text-[#a6adc8] text-lg max-w-2xl mx-auto">
            Dijital pazarlama ve hizmetlerimiz hakkında en çok sorulan soruların cevapları.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252538] transition-colors"
              >
                <span className="font-semibold text-[#cdd6f4] pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[#0040ff]" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-[#a6adc8] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#a6adc8] mb-4">Başka sorularınız mı var?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0040ff] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Bize Ulaşın
          </a>
        </motion.div>
      </div>
    </section>
  );
}
