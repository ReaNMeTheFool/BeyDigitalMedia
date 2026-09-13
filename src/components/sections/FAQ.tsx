"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQPageJsonLd } from "@/components/SEO/JsonLd";
import { sanitizeHtml } from "@/lib/sanitize-html";

const faqs = [
  {
    question: "Sosyal medyayı ve AI otomasyonu benim için nasıl yönetiyorsunuz?",
    answer:
      "Instagram, Facebook ve LinkedIn hesaplarınızı sizin adınıza yönetiyoruz. Haftalık 3-5 özgün içerik üretiyor, yorum ve mesajlara ortalama 2 saat içinde dönüş yapıyoruz. AI chatbot'umuz web sitenize entegre oluyor; gelen soruları anlayıp otomatik yanıtlıyor, gerekirse size WhatsApp'tan bildiriyor. Kurulum 3 iş günü sürüyor, eğitimle birlikte teslim ediyoruz.",
  },
  {
    question: "Reklam bütçemi gerçekten verimli kullanıyor musunuz?",
    answer:
      "Önce işletmenizi ve hedef kitlenizi analiz ediyoruz. Meta tarafında Advantage+ Shopping ve Lookalike kitlelerle, Google tarafında Search ve Performance Max kampanyalarıyla ilerliyoruz. Hedef ROAS'ımız 3-5x aralığında. Haftalık raporla hangi reklamın ne kazandırdığını net olarak gösteriyoruz. Minimum reklam bütçesi 5.000 TL, altındaki bütçelerde verim düşüyor.",
  },
  {
    question: "Web sitem kaça mal olur? Ne kadar sürer?",
    answer:
      "Next.js ve Tailwind CSS ile sıfırdan kodluyoruz, hazır tema kullanmıyoruz. Mobil uyumlu, 90+ Google PageSpeed hedefiyle çalışıyoruz. Tasarımı önce Figma'da onayınıza sunuyor, revizyonlarla birlikte 2-4 haftada canlıya alıyoruz. SEO altyapısı, görsel optimizasyonu ve SSL sertifikası pakete dahil. Sonrasında 1 ay ücretsiz teknik destek veriyoruz.",
  },
  {
    question: "SEO çalışmaları ne zaman sonuç vermeye başlar?",
    answer:
      "İlk 1 ayda teknik SEO hatalarını temizliyoruz (sayfa hızı, meta etiketler, yapısal veriler). 2-3. ayda içerik optimizasyonu ve kaliteli backlinklerle yükseliş başlıyor. Rekabetçi kelimelerde ilk sayfaya çıkmak sektöre göre 3-6 ay sürüyor. Örneğin bir halı yıkama firması 'halı yıkama' aramasında 4. ayda 2. sıraya yükseldi.",
  },
  {
    question: "Çalışmalarınızın raporunu nasıl göreceğim?",
    answer:
      "Her ayın 5'inde Google Looker Studio üzerinden detaylı PDF rapor gönderiyoruz. Raporda: erişim, tıklama, dönüşüm, ROAS, takipçi artışı ve en iyi performans veren içerikler yer alıyor. Ayrıca WhatsApp grubumuzdan haftalık özet ve anlık güncelleme alıyorsunuz. Tüm metrikler açık, gizli veri yok.",
  },
  {
    question: "Her şeyi tek bir firmadan çözmek mümkün mü?",
    answer:
      "Evet. Logo tasarımından web sitesine, Google reklamlarından sosyal medya yönetimine kadar her şeyi tek ekipten alıyorsunuz. Farklı ajanslar arasında koordinasyon kaybı yaşamazsınız. Aylık paket fiyatlarımız hizmet kapsamına göre 5.000 TL'den başlıyor, ihtiyacınıza göre özelleştiriyoruz.",
  },
];

export default function FAQ({
  title = 'Merak <span class="text-[#0040ff]">Ettikleriniz</span>',
  subtitle = 'Dijital pazarlama ve hizmetlerimiz hakkında en çok sorulan soruların cevapları.',
  showAll = true,
  faqs: propFaqs,
}: {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  faqs?: { question: string; answer: string }[];
}) {
  const displayedFaqs = propFaqs
    ? (showAll ? propFaqs : propFaqs.slice(0, 5))
    : (showAll ? faqs : faqs.slice(0, 5));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#11111b] overflow-hidden">
      <FAQPageJsonLd questions={displayedFaqs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6" dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }} />
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
                aria-expanded={openIndex === index}
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
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      className="px-4 sm:px-6 pb-4 sm:pb-6 text-[#cdd6f4]/90 leading-relaxed prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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
