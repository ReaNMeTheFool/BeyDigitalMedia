"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  {
    name: "Mavi",
    hex: "#3B82F6",
    bgClass: "bg-blue-500",
    meaning: "Güven",
    description:
      "Mavi, güvenin, istikrarın ve profesyonelliğin rengidir. Finans, teknoloji ve sağlık sektörlerinde sıkça tercih edilir. Markanıza güvenilirlik kazandırmak için ideal bir seçimdir.",
  },
  {
    name: "Kırmızı",
    hex: "#EF4444",
    bgClass: "bg-red-500",
    meaning: "Tutku",
    description:
      "Kırmızı, enerjinin, tutkunun ve aciliyetin rengidir. Dikkat çekmek, heyecan yaratmak ve harekete geçirmek için güçlü bir araçtır. İndirimler ve özel teklifler için idealdir.",
  },
  {
    name: "Sarı",
    hex: "#FACC15",
    bgClass: "bg-yellow-400",
    meaning: "İyimserlik",
    description:
      "Sarı, mutluluğun, yaratıcılığın ve iyimserliğin rengidir. Markanıza sıcaklık ve dostane bir his katmak için mükemmeldir. Yaratıcı sektörlerde sıkça kullanılır.",
  },
  {
    name: "Yeşil",
    hex: "#22C55E",
    bgClass: "bg-green-500",
    meaning: "Büyüme",
    description:
      "Yeşil, doğanın, büyümenin ve sürdürülebilirliğin rengidir. Çevre dostu markalar, sağlık ve wellness sektöründe vazgeçilmezdir. Dengeli ve taze bir imaj yaratır.",
  },
  {
    name: "Mor",
    hex: "#A855F7",
    bgClass: "bg-purple-500",
    meaning: "Lüks",
    description:
      "Mor, lüksün, yaratıcılığın ve bilgeliğin rengidir. Premium markalar, kozmetik ve teknoloji şirketleri tarafından tercih edilir. Markanıza sofistike bir dokunuş katar.",
  },
  {
    name: "Turuncu",
    hex: "#F97316",
    bgClass: "bg-orange-500",
    meaning: "Enerji",
    description:
      "Turuncu, enerjinin, maceracılığın ve sosyalleşmenin rengidir. Genç ve dinamik markalar için idealdir. Harekete geçirici ve samimi bir his yaratır.",
  },
];

export default function ColorPsychology() {
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[0] | null>(
    null
  );
  const [hoveredColor, setHoveredColor] = useState<(typeof colors)[0] | null>(
    null
  );

  const activeColor = hoveredColor || selectedColor;

  return (
    <section className="relative py-24 bg-[#11111b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-6">
              Renk Psikolojisi
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
              Renklerle{" "}
              <span className="text-[#0040ff]">Konuşuyoruz</span>
            </h2>
            <p className="text-[#cdd6f4]/90 text-lg leading-relaxed mb-8">
              Her renk bir duygu, her ton bir mesaj taşır. Markanızın kimliğini
              oluştururken renklerin psikolojik etkilerini kullanarak hedef
              kitlenizle derin bir bağ kuruyoruz. Doğru renk seçimi, markanızın
              akılda kalıcılığını %80 artırabilir.
            </p>

            {/* Active Color Info */}
            <AnimatePresence mode="wait">
              {activeColor ? (
                <motion.div
                  key={activeColor.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#181825] rounded-2xl p-6 border border-[#2d2d44]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 ${activeColor.bgClass} rounded-full shadow-lg`}
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-[#cdd6f4]">
                        {activeColor.name}
                      </h3>
                      <span className="text-[#0040ff] font-semibold">
                        {activeColor.meaning}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#cdd6f4]/90 leading-relaxed">
                    {activeColor.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#181825] rounded-2xl p-6 border border-[#2d2d44] border-dashed"
                >
                  <p className="text-[#cdd6f4]/90 text-center text-sm sm:text-base">
                    Renk dairelerine tıklayarak psikolojik etkilerini keşfedin.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Color Circles */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 justify-center lg:justify-end"
          >
            {colors.map((color, index) => (
              <motion.button
                key={color.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
                onClick={() =>
                  setSelectedColor(
                    selectedColor?.name === color.name ? null : color
                  )
                }
                className={`w-16 h-16 sm:w-24 sm:h-24 ${color.bgClass} rounded-full cursor-pointer shadow-lg hover:shadow-2xl transition-shadow relative group`}
                aria-label={`${color.name} - ${color.meaning}`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl sm:text-2xl drop-shadow-md select-none pointer-events-none">
                  {color.name.charAt(0)}
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs sm:text-sm md:text-base drop-shadow-md">
                  {color.meaning}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
