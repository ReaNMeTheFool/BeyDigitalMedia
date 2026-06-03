"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQPageJsonLd } from "@/components/SEO/JsonLd";
import { sanitizeHtml } from "@/lib/sanitize-html";

const faqs = [
  {
    question: "Sosyal medyayi ve AI otomasyonu benim icin nasil yonetiyorsunuz?",
    answer:
      "Instagram, Facebook ve LinkedIn hesaplarinizi sizin adiniza yonetiyoruz. Haftalik 3-5 ozgun icerik uretiyor, yorum ve mesajlara ortalama 2 saat icinde donus yapiyoruz. AI chatbot'umuz web sitenize entegre oluyor; gelen sorulari anlayip otomatik yanitliyor, gerekirse size WhatsApp'tan bildiriyor. Kurulum 3 is gunu suruyor, egitimle birlikte teslim ediyoruz.",
  },
  {
    question: "Reklam butcemi gercekten verimli kullaniyor musunuz?",
    answer:
      "Once isletmenizi ve hedef kitlenizi analiz ediyoruz. Meta tarafinda Advantage+ Shopping ve Lookalike kitlelerle, Google tarafinda Search ve Performance Max kampanyalariyla ilerliyoruz. Hedef ROAS'imiz 3-5x araliginda. Haftalik raporla hangi reklamin ne kazandirdigini net olarak gosteriyoruz. Minimum reklam butcesi 5.000 TL, altindaki butcelerde verim dusuyor.",
  },
  {
    question: "Web sitem kaca mal olur? Ne kadar surer?",
    answer:
      "Next.js ve Tailwind CSS ile sifirdan kodluyoruz, hazir tema kullanmiyoruz. Mobil uyumlu, 90+ Google PageSpeed hedefiyle calisiyoruz. Tasarimi once Figma'da onayiniza sunuyor, revizyonlarla birlikte 2-4 haftada canliya aliyoruz. SEO altyapisi, gorsel optimizasyonu ve SSL sertifikasi pakete dahil. Sonrasinda 1 ay ucretsiz teknik destek veriyoruz.",
  },
  {
    question: "SEO calismalari ne zaman sonuc vermeye baslar?",
    answer:
      "Ilk 1 ayda teknik SEO hatalarini temizliyoruz (sayfa hizi, meta etiketler, yapisal veriler). 2-3. ayda icerik optimizasyonu ve kaliteli backlinklerle yukselis basliyor. Rekabetci kelimelerde ilk sayfaya cikmak sektore gore 3-6 ay suruyor. Ornegin bir hali yikama firmasi 'hali yikama' aramasinda 4. ayda 2. siraya yukseldi.",
  },
  {
    question: "Calismalarinizin raporunu nasil gorecegim?",
    answer:
      "Her ayin 5'inde Google Looker Studio uzerinden detayli PDF rapor gonderiyoruz. Raporda: erisim, tiklama, donusum, ROAS, takipci artisi ve en iyi performans veren icerikler yer aliyor. Ayrica WhatsApp grubumuzdan haftalik ozet ve anlik guncelleme aliyorsunuz. Tum metrikler acik, gizli veri yok.",
  },
  {
    question: "Her seyi tek bir firmadan cozmek mumkun mu?",
    answer:
      "Evet. Logo tasarimindan web sitesine, Google reklamlarindan sosyal medya yonetimine kadar her seyi tek ekipten aliyorsunuz. Farkli ajanslar arasinda koordinasyon kaybi yasamazsiniz. Aylik paket fiyatlarimiz hizmet kapsamina gore 5.000 TL'den basliyor, ihtiyaciniza gore ozellestiriyoruz.",
  },
];

export default function FAQ({
  title = 'Merak <span class="text-[#0040ff]">Ettikleriniz</span>',
  subtitle = 'Dijital pazarlama ve hizmetlerimiz hakkinda en cok sorulan sorularin cevaplari.',
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
          <p className="text-[#cdd6f4]/90 mb-4">Baska sorulariniz mi var?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0040ff] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Bize Ulasin
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#11111b] pointer-events-none" />
    </section>
  );
}
