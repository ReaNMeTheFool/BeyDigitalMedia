"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Briefcase, Heart } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Tamamlanan Proje" },
  { icon: Users, value: "100+", label: "Memnun Müşteri" },
  { icon: Briefcase, value: "8+", label: "Yıllık Deneyim" },
  { icon: Heart, value: "%100", label: "Müşteri Memnuniyeti" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Logo/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
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
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#181825] flex items-center justify-center shadow-[0_0_50px_rgba(0,64,255,0.5)]">
                {/* Bey Digital Logo */}
                <div className="relative w-48 h-48 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  <Image
                    src="/beydigital_logo.png"
                    alt="Bey Digital Media"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 w-20 h-20 bg-[#ffd76e]/20 rounded-2xl backdrop-blur-sm"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 w-16 h-16 bg-[#0040ff]/20 rounded-full backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-[#0040ff] text-[#cdd6f4] rounded-2xl p-6 shadow-xl"
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
            <span className="inline-block px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-6">
              Hakkımızda
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
              Dijitalde Büyümenin{" "}
              <span className="text-[#0040ff]">Güvenilir Ortağı</span>
            </h2>

            <div className="space-y-4 text-[#a6adc8] text-lg leading-relaxed mb-8">
              <p>
                Bey Digital Media, Bursa merkezli bir dijital pazarlama ajansıdır.
                Sekiz yılı aşkın süredir markaların dijital dünyada büyümesine
                yardımcı oluyoruz. Sosyal medya yönetimi, Meta Ads, Google Ads,
                web tasarım ve SEO alanlarında uzman kadromuzla hizmet veriyoruz.
              </p>
              <p>
                Her markanın kendine özgü bir hikayesi olduğuna inanıyoruz.
                Renklerin psikolojisinden ilham alarak, markaların kimliğini
                en iyi şekilde yansıtan stratejiler geliştiriyoruz. Amacımız,
                sadece görsel olarak değil, duygusal bağ kurarak akılda kalıcı
                markalar yaratmak.
              </p>
              <p>
                150'den fazla mutlu müşteri ve 200'ün üzerinde tamamlanan proje ile
                Türkiye'nin dört bir yanından markalarla çalışma fırsatı bulduk.
                Siz de dijital dönüşüm yolculuğunuzda bize güvenebilirsiniz.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 bg-[#181825] rounded-2xl"
                >
                  <stat.icon className="w-6 h-6 text-[#0040ff] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#cdd6f4]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#a6adc8]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
