"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQPageJsonLd } from "@/components/SEO/JsonLd";
import { sanitizeHtml } from "@/lib/sanitize-html";
import ActionStamp from "@/components/document/ActionStamp";
import PerforationDivider from "@/components/document/PerforationDivider";

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
    <section id="faq" className="relative py-20 bg-paper overflow-hidden">
      <PerforationDivider tone="paper-alt" />
      <FAQPageJsonLd questions={displayedFaqs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Bolum basligi */}
        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Soru ve Yanıtlar
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink mb-5"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}
          />
          <p className="text-pencil text-lg max-w-2xl">{subtitle}</p>
        </div>

        {/* Soru cetvelleri */}
        <div>
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-dashed border-ink/30 transition-colors duration-150 ${
                openIndex === index ? "bg-paper-alt" : "hover:bg-paper-alt/60"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 text-left"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-pencil shrink-0">
                    S.{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold text-ink text-sm sm:text-base">{faq.question}</span>
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mt-0.5 text-ink"
                >
                  <Plus className="w-5 h-5" aria-hidden="true" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      className="px-4 sm:px-5 pb-5 pl-[52px] sm:pl-[60px] text-pencil leading-relaxed text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <p className="text-pencil mb-4">Başka sorularınız mı var?</p>
          <ActionStamp href="#contact" size="md">
            Bize Ulaşın
          </ActionStamp>
        </div>
      </div>
    </section>
  );
}
