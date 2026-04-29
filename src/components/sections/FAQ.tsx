"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Sosyal medya yönetimi ve AI otomasyonu markama nasıl entegre ediliyor?",
    answer:
      "Geleneksel içerik üretiminin ötesine geçiyoruz. Markanızın dijital varlığını inşa ederken, hedef kitlenizle güçlü ve organik bir bağ kuracak stratejiler geliştiriyoruz. Aynı zamanda operasyonlarınızı yormayacak zeki chatbotlar ve otomasyon algoritmalarıyla etkileşimi 7/24 sürdürülebilir bir noktaya taşıyoruz.",
  },
  {
    question: "Meta Ads ve Google Ads yönetiminde nasıl bir strateji izliyorsunuz?",
    answer:
      "Bütçenizi rastgele yakmıyoruz. Veri bilimi ve ileri düzey hedefleme yöntemlerini kullanarak doğrudan satın alma eğilimi yüksek kitleleri tespit ediyoruz. Amacımız sadece görünürlük değil, markanızı sektör lideri konumuna taşıyacak ve maksimum ROAS'ı (Reklam Getirisi) elde etmenizi sağlayacak kurgular oluşturmaktır.",
  },
  {
    question: "Web tasarım süreçlerinizde nelere dikkat ediyorsunuz?",
    answer:
      "Kullanıcıyı yoran, hantal şablonlar yerine; modern, pürüzsüz animasyonlara sahip ve kullanıcı dostu tasarımlar geliştiriyoruz. Her bir pikseli kurumsal kimliğinize uygun işliyor, ziyaretçinin sitenize girdiği an premium bir deneyim yaşamasını hedefliyoruz. Arayüzlerimiz, tamamen sizin dijital merkeziniz olarak kurgulanır.",
  },
  {
    question: "SEO (Arama Motoru Optimizasyonu) çalışmalarınız ne zaman etki eder?",
    answer:
      "Algoritmaları manipüle eden geçici taktiklerle değil, uzun vadeli ve sağlam bir otorite inşası ile ilerliyoruz. Arama sorgularında otoritenizi sabitlemek, sektörün rekabetine göre ortalama 1-6 ay sürer. Doğru stratejiler kurgulandığında, arama sonuçlarında sarsılmaz bir konuma ulaşırsınız.",
  },
  {
    question: "Raporlama süreci ve şeffaflık vizyonunuz nedir?",
    answer:
      "Sadece kalıplaşmış vaatler değil, salt veri sunuyoruz. Erişim, ROAS, dönüşüm oranları ve büyüme trendlerini size net ve şeffaf grafiklerle raporluyoruz. Neyin iyi dönüştüğünü, hangi hamlenin optimize edilmesi gerektiğini gizlilik perdesi olmadan göreceksiniz. Çünkü markanızın gelişimi, başarımızın yegane kanıtıdır.",
  },
  {
    question: "Tüm ihtiyacımı tek bir yer (Bey Digital Media) ile çözebilir miyim?",
    answer:
      "Kesinlikle. Logo tasarımından yapay zeka yapılarına, performans pazarlamasından kompleks web yazılımlarına kadar dijital varlığınız için gereken her şeyi tek bir yapı içinde sunuyoruz. Dağınık sistemler yerine, tüm platformların birbiriyle konuştuğu kusursuz bir ekosistem inşa ediyoruz.",
  },
];

export default function FAQ({
  title = 'Merak <span class="text-[#0040ff]">Ettikleriniz</span>',
  subtitle = 'Dijital pazarlama ve hizmetlerimiz hakkında en çok sorulan soruların cevapları.',
  showAll = true,
}: {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}) {
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#11111b] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="text-[#cdd6f4]/90 text-lg max-w-2xl mx-auto">
            {subtitle}
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
          {displayedFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openIndex === index
                ? "bg-[#252538] border-[#0040ff]/40 shadow-[0_0_24px_rgba(0,64,255,0.15)]"
                : "bg-[#1e1e2e] border-[#2d2d44] hover:border-[#0040ff]/30 hover:bg-[#252538]/60 hover:shadow-[0_0_16px_rgba(0,64,255,0.1)]"
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left transition-colors hover:bg-white/5"
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
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[#cdd6f4]/90 leading-relaxed">
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
          <p className="text-[#cdd6f4]/90 mb-4">Başka sorularınız mı var?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0040ff] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Bize Ulaşın
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#11111b] pointer-events-none" />
    </section>
  );
}
