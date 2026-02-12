"use client";

import { motion } from "framer-motion";

const items = [
  "Sosyal Medya Yönetimi",
  "Meta Ads",
  "Google Ads",
  "Web Tasarım",
  "SEO",
  "Logo Tasarımı",
  "Kurumsal Kimlik",
  "Dijital Büyüme",
];

export default function Marquee() {
  return (
    <section className="py-8 bg-[#0033aa] overflow-hidden">
      <div className="relative">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {/* Double the items for seamless loop */}
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[#cdd6f4]/90 text-lg font-medium px-16">
                {item}
              </span>
              <span className="text-[#ffd76e] text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
