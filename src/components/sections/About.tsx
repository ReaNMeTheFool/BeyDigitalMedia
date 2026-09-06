"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart3, Award, Star, Clock } from "lucide-react";
import KaseStamp from "@/components/document/KaseStamp";
import PerforationDivider from "@/components/document/PerforationDivider";

const defaultStats = [
  { icon: BarChart3, value: "150+", label: "Tamamlanan Proje" },
  { icon: Award, value: "100+", label: "Memnun Müşteri" },
  { icon: Clock, value: "8+", label: "Yıllık Deneyim" },
  { icon: Star, value: "%100", label: "Müşteri Memnuniyeti" },
];

export default function About({
  image = '/hakkimizda.webp',
  title = 'Dijitalde Büyümenin <span class="text-[#0040ff]">Güvenilir Ortağı</span>',
  paragraphs = [
    "Bey Digital Media olarak 8 yılı aşkın süredir markaların dijital dünyada büyümesine yardımcı oluyoruz. Kurucumuz Yiğit Emre Balaban liderliğinde; sosyal medya yönetimi, Meta Ads, Google Ads, web tasarım, SEO, logo tasarımı ve kurumsal kimlik alanlarında uzman kadromuzla hizmet veriyoruz.",
    "Her markanın kendine özgü bir hikayesi var, biz de bu hikayeyi en iyi şekilde anlatmaya odaklanıyoruz. Renklerin psikolojisinden ilham alıyor, markanızın kimliğini hem görsel hem duygusal olarak güçlendirecek stratejiler geliştiriyoruz. Amacımız sadece güzel görünmek değil, akılda kalmak.",
    "10'dan fazla sektörde, 500'ün üzerinde kampanya yönettik. Türkiye'nin dört bir yanından markalarla çalıştık, hepsinden bir şey öğrendik. Siz de dijitalde büyümek istiyorsanız doğru yerdesiniz.",
  ],
  stats: propStats,
}: {
  image?: string;
  title?: string;
  paragraphs?: string[];
  stats?: { icon: React.ElementType; value: string; label: string }[];
}) {
  const activeStats = propStats || defaultStats;

  return (
    <section id="about" className="relative py-20 bg-paper-alt overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Sol: fotoğraf, murekkep cerceve */}
          <div className="relative">
            <div className="rounded-[3px] border border-ink/40 bg-paper p-3 shadow-doc">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <Image
                  src={image}
                  alt="Hakkımızda"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Deneyim kasesi */}
            <motion.div
              initial={{ scale: 1.12, opacity: 0 }}
              whileInView={{ scale: [1.12, 1, 1], opacity: [0, 1, 1] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.28, times: [0, 0.45, 1], ease: "easeOut" }}
              className="absolute -bottom-6 -right-3 sm:-right-6"
            >
              <KaseStamp
                text="BEY DIGITAL MEDIA • DENEYİM BELGESİ •"
                centerText="8+"
                subText="YIL"
                size={132}
                rotate={10}
              />
            </motion.div>
          </div>

          {/* Sag: icerik */}
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-6 leading-snug"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <div className="space-y-4 text-pencil text-base sm:text-lg leading-relaxed mb-10">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Cetvel: sayilar */}
            <div className="border-y border-ink/40">
              {activeStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-3 py-2.5 border-b border-dashed border-ink/25 last:border-b-0"
                >
                  <stat.icon className="w-4 h-4 text-pencil shrink-0 self-center" aria-hidden="true" />
                  <span className="text-xs sm:text-sm uppercase tracking-[0.12em] text-pencil">
                    {stat.label}
                  </span>
                  <span aria-hidden="true" className="dots-leader" />
                  <span className="font-mono font-bold text-ink tabular-nums">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
