"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 2,
    title: "Guzgun Tekstil",
    category: "Dijital Pazarlama",
    service: "Google Ads & SEO",
    color: "from-emerald-500 to-teal-600",
    results: "Organik trafik +280%",
  },
  {
    id: 3,
    title: "Balya",
    category: "Kurumsal Kimlik",
    service: "Logo & Marka Tasarımı",
    color: "from-amber-500 to-orange-500",
    results: "Yeni marka lansmanı",
  },
  {
    id: 4,
    title: "İşbir Yatak",
    category: "Sosyal Medya",
    service: "İçerik Üretimi",
    color: "from-violet-500 to-purple-600",
    results: "Etkileşim oranı +150%",
  },
  {
    id: 5,
    title: "Lada Wedding",
    category: "Web Tasarım",
    service: "Web Sitesi & SEO",
    color: "from-rose-500 to-pink-600",
    results: "Dönüşüm oranı +200%",
  },
];

// Projeleri kopyalayarak sonsuz döngü için hazırla
const extendedProjects = [...projects, ...projects, ...projects];

export default function Portfolio() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(projects.length);
  const [isScrolling, setIsScrolling] = useState(false);

  const getCardWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    const card = container.querySelector('.project-card') as HTMLElement;
    if (!card) return 0;
    const gap = 24;
    return card.offsetWidth + gap;
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    if (cardWidth === 0) return;

    container.scrollLeft = projects.length * cardWidth;
  }, [getCardWidth]);

  const scrollToNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    const newIndex = currentIndex + 1;

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth'
    });

    setCurrentIndex(newIndex);

    if (newIndex >= projects.length * 2) {
      setTimeout(() => {
        container.style.scrollBehavior = 'auto';
        const resetIndex = projects.length;
        container.scrollLeft = resetIndex * cardWidth;
        setCurrentIndex(resetIndex);
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
          setIsScrolling(false);
        }, 50);
      }, 300);
    } else {
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  const scrollToPrev = () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = getCardWidth();
    const newIndex = currentIndex - 1;

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth'
    });

    setCurrentIndex(newIndex);

    if (newIndex < projects.length) {
      setTimeout(() => {
        container.style.scrollBehavior = 'auto';
        const resetIndex = projects.length * 2 - 1;
        container.scrollLeft = resetIndex * cardWidth;
        setCurrentIndex(resetIndex);
        setTimeout(() => {
          container.style.scrollBehavior = 'smooth';
          setIsScrolling(false);
        }, 50);
      }, 300);
    } else {
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

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
      <div className="relative">
        {/* Navigation Buttons - Modern Design */}
        <button
          onClick={scrollToPrev}
          className="group absolute left-4 top-1/3 -translate-y-1/2 z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#252538] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center shadow-xl hover:border-[#0040ff]/50 hover:text-[#0040ff] hover:shadow-[0_0_30px_rgba(0,64,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Önceki proje"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0040ff]/0 to-[#0040ff]/0 group-hover:from-[#0040ff]/10 group-hover:to-[#0040ff]/5 transition-all duration-300" />
          <ChevronLeft size={26} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={scrollToNext}
          className="group absolute right-4 top-1/3 -translate-y-1/2 z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#252538] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center shadow-xl hover:border-[#0040ff]/50 hover:text-[#0040ff] hover:shadow-[0_0_30px_rgba(0,64,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Sonraki proje"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0040ff]/0 to-[#0040ff]/0 group-hover:from-[#0040ff]/10 group-hover:to-[#0040ff]/5 transition-all duration-300" />
          <ChevronRight size={26} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-x-hidden pb-8 pt-4"
          ref={scrollContainerRef}
        >
          <div className="flex gap-6 px-4 sm:px-6 lg:px-8">
            {extendedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="project-card shrink-0"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative w-80 md:w-96 bg-gradient-to-br from-[#1e1e2e] to-[#252538] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#0040ff]/10 transition-all duration-500 border border-[#2d2d44]/50 hover:border-[#0040ff]/30 overflow-visible"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
                    />
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                      <div className="text-center">
                        <motion.div
                          className="w-24 h-24 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <span className="text-4xl font-bold drop-shadow-lg">
                            {project.title.charAt(0)}
                          </span>
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{project.title}</h3>
                        <span className="text-sm opacity-90 font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Results Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-[#ffd76e] font-bold text-center text-sm">{project.results}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative rounded-b-3xl">
                    {/* Accent line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2d2d44] to-transparent" />

                    <span className="inline-block px-3 py-1 text-xs bg-[#0040ff]/10 text-[#0040ff] rounded-full font-medium mb-3">
                      {project.service}
                    </span>
                    <h3 className="text-xl font-bold text-[#cdd6f4] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#6c7086] text-sm">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0040ff] text-white rounded-xl font-semibold hover:bg-[#0033cc] transition-colors shadow-lg shadow-[#0040ff]/25"
        >
          <span>Sizin Projeniz de Burada Olabilir!</span>
          <ExternalLink size={18} />
        </motion.a>
      </div>
    </section>
  );
}
