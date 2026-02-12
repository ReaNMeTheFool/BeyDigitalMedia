"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "DMÖ",
    category: "Sosyal Medya Yönetimi",
    service: "Instagram & Meta Ads",
    color: "from-blue-600 to-indigo-600",
    results: "Takipçi artışı %340",
  },
  {
    id: 2,
    title: "Gzugunlar",
    category: "Dijital Pazarlama",
    service: "Google Ads & SEO",
    color: "from-green-600 to-emerald-600",
    results: "Organik trafik +280%",
  },
  {
    id: 3,
    title: "Balya",
    category: "Kurumsal Kimlik",
    service: "Logo & Marka Tasarımı",
    color: "from-amber-500 to-orange-600",
    results: "Yeni marka lansmanı",
  },
  {
    id: 4,
    title: "İşbir Yatak",
    category: "Sosyal Medya",
    service: "İçerik Üretimi",
    color: "from-purple-600 to-pink-600",
    results: "Etkileşim oranı +150%",
  },
  {
    id: 5,
    title: "Lada Wedding",
    category: "Web Tasarım",
    service: "Web Sitesi & SEO",
    color: "from-rose-500 to-red-600",
    results: "Dönüşüm oranı +200%",
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      setCurrentIndex(projects.length - 1);
    } else if (newIndex >= projects.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(newIndex);
    }
    setDirection(newDirection);
  };

  const project = projects[currentIndex];

  return (
    <section id="portfolio" className="py-24 bg-[#181825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-4">
            Portfolyo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            <span className="text-[#0040ff]">Gerçek</span> Başarı Hikayeleri
          </h2>
          <p className="text-[#a6adc8] text-lg max-w-2xl mx-auto">
            Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[500px] md:h-[550px] overflow-hidden rounded-3xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative w-full h-full bg-[#1e1e2e] rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative h-3/5 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                  />
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                    <div className="text-center">
                      <div className="w-28 h-28 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-5xl font-bold">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                      <span className="text-base opacity-80">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Results Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[#ffd76e] font-bold text-center text-base">{project.results}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 h-2/5 flex flex-col justify-center">
                  <span className="text-base text-[#0040ff] font-medium">
                    {project.service}
                  </span>
                  <h3 className="text-2xl font-bold text-[#cdd6f4] mt-3 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#a6adc8]">
                    {project.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Side Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[#0040ff] text-white flex items-center justify-center shadow-lg hover:bg-[#0033cc] transition-all duration-300 hover:scale-110"
          aria-label="Önceki proje"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#0040ff] text-white flex items-center justify-center shadow-lg hover:bg-[#0033cc] transition-all duration-300 hover:scale-110"
          aria-label="Sonraki proje"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#0040ff]"
                  : "w-2 bg-[#2d2d44] hover:bg-[#0040ff]/50"
              }`}
              aria-label={`Proje ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[#0040ff] font-semibold hover:gap-3 transition-all"
        >
          <span>Sizin Projeniz'de Burada Olabilir!</span>
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  );
}
