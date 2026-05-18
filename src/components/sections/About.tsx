"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart3, Award, Star, Clock } from "lucide-react";

const defaultStats = [
  { icon: BarChart3, value: "10+", label: "Sektor" },
  { icon: Award, value: "500+", label: "Kampanya" },
  { icon: Star, value: "4.8/5", label: "Musteri Puani" },
  { icon: Clock, value: "8+", label: "Yil Deneyim" },
];

export default function About({
  image = '/hakkimizda.webp',
  title = 'Dijitalde Buyumenin <span class="text-[#0040ff]">Guvenilir Ortagi</span>',
  paragraphs = [
    "Bey Digital Media olarak 8 yili askin suredir markalarin dijital dunyada buyumesine yardimci oluyoruz. Kurucumuz Yigit Emre Balaban liderliginde; sosyal medya yonetimi, Meta Ads, Google Ads, web tasarim, SEO, logo tasarimi ve kurumsal kimlik alanlarinda uzman kadromuzla hizmet veriyoruz.",
    "Her markanin kendine ozgu bir hikayesi var, biz de bu hikayeyi en iyi sekilde anlatmaya odaklaniyoruz. Renklerin psikolojisinden ilham aliyor, markanizin kimligini hem gorsel hem duygusal olarak guclendirecek stratejiler gelistiriyoruz. Amacimiz sadece guzel gorunmek degil, akilda kalmak.",
    "10'dan fazla sektorde, 500'un uzerinde kampanya yonettik. Turkiye'nin dort bir yanindan markalarla calistik, hepsinden bir sey ogrendik. Siz de dijitalde buyumek istiyorsaniz dogru yerdesiniz.",
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
    <section id="about" className="relative py-24 bg-[#181825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Column - Logo/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-8 pr-4 sm:pb-0 sm:pr-0"
          >
            {/* Background Blur */}
            <div className="absolute -inset-4 bg-[#0040ff]/20 blur-3xl rounded-full -z-10" />

            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-[#0040ff]/10 to-[#ffd76e]/10 rounded-3xl p-2 shadow-[0_0_80px_rgba(0,64,255,0.4),0_0_120px_rgba(0,64,255,0.2),inset_0_0_60px_rgba(0,64,255,0.1)]">
              {/* Light glow behind */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,64,255,0.4) 0%, rgba(0,64,255,0.1) 50%, transparent 70%)'
                }}
              />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,64,255,0.5)]">
                <Image
                  src={image}
                  alt="Hakkimizda"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#0040ff] text-[#cdd6f4] rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <div className="text-4xl font-bold">8+</div>
              <div className="text-sm opacity-90">Yillik Deneyim</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#cdd6f4] mb-6 leading-snug" dangerouslySetInnerHTML={{ __html: title }} />

            <div className="space-y-4 text-[#cdd6f4]/90 text-base sm:text-lg leading-relaxed mb-8">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-2 mt-4 sm:mt-2">
              {activeStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex-1 text-center p-3 sm:p-2 bg-[#181825] rounded-2xl"
                >
                  <stat.icon className={`w-8 h-8 text-[#0040ff] block mx-auto mb-2 ${index >= 2 ? "-translate-x-[3px]" : "-translate-x-[7px]"}`} />
                  <div className="text-xl font-bold text-[#cdd6f4]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#cdd6f4]/90 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none" />
    </section>
  );
}
