"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Briefcase, Heart } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Tamamlanan Proje" },
  { icon: Users, value: "100+", label: "Memnun Müşteri" },
  { icon: Heart, value: "%100", label: "Müşteri Memnuniyeti" },
  { icon: Briefcase, value: "8+", label: "Yıllık Deneyim" },
];

export default function About({
  image = '/hakkimizda.webp',
}: {
  image?: string;
}) {
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
                  alt="Hakkımızda"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  unoptimized
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
              <div className="text-sm opacity-90">Yıllık Deneyim</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#cdd6f4] mb-6 leading-snug">
              Dijitalde Büyümenin{" "}
              <span className="text-[#0040ff]">Güvenilir Ortağı</span>
            </h2>

            <div className="space-y-4 text-[#cdd6f4]/90 text-base sm:text-lg leading-relaxed mb-8">
              <p>
                Bey Digital Media olarak Sekiz yılı aşkın süredir markaların
                dijital dünyada büyümesine yardımcı oluyoruz. Sosyal medya
                yönetimi, Meta Ads, Google Ads, web tasarım, SEO, logo tasarımı,
                ve kurumsal kimlik alanlarında uzman kadromuzla hizmet veriyoruz.
              </p>
              <p>
                Her markanın kendine özgü bir hikayesi olduğuna inanıyoruz.
                Renklerin psikolojisinden ilham alarak, markaların kimliğini
                en iyi şekilde yansıtan stratejiler geliştiriyoruz. Amacımız,
                sadece görsel olarak değil, duygusal bağ kurarak akılda kalıcı
                markalar yaratmak.
              </p>
              <p>
                100&apos;den fazla mutlu müşteri ve 150&apos;nin üzerinde tamamlanan proje ile
                Türkiye&apos;nin dört bir yanından markalarla çalışma fırsatı bulduk.
                Siz de dijital dönüşüm yolculuğunuzda bize güvenebilirsiniz.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-2 mt-4 sm:mt-2">
              {stats.map((stat, index) => (
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
