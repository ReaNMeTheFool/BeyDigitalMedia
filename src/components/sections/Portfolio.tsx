"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCardWidth = () => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    const card = container.querySelector('.snap-start') as HTMLElement;
    if (!card) return 0;
    return card.offsetWidth + 24; // card width + gap
  };

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = getCardWidth();
    const scrollPosition = index * cardWidth;
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const scrollToPrev = () => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const scrollToNext = () => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  // Scroll event listener to update current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < projects.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Horizontal Scroll Container with Navigation */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto pb-8 scrollbar-hide"
          ref={scrollContainerRef}
        >
          <div className="flex gap-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="snap-start shrink-0"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative w-80 md:w-96 bg-[#1e1e2e] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                    />
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <span className="text-4xl font-bold">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <span className="text-sm opacity-80">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Results Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[#ffd76e] font-bold text-center text-sm">{project.results}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-sm text-[#0040ff] font-medium">
                      {project.service}
                    </span>
                    <h3 className="text-xl font-bold text-[#cdd6f4] mt-2">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons - Modern Design */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Left Navigation Button */}
          <button
            onClick={scrollToPrev}
            className="group relative w-14 h-14 rounded-2xl bg-[#1e1e2e] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-[#0040ff] hover:text-[#0040ff] hover:shadow-[0_0_20px_rgba(0,64,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0040ff]/50"
            aria-label="Önceki proje"
          >
            <span className="absolute inset-0 bg-[#0040ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowLeft size={22} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 px-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#0040ff]"
                    : "w-2 bg-[#2d2d44] hover:bg-[#0040ff]/50"
                }`}
                aria-label={`Proje ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={scrollToNext}
            className="group relative w-14 h-14 rounded-2xl bg-[#1e1e2e] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-[#0040ff] hover:text-[#0040ff] hover:shadow-[0_0_20px_rgba(0,64,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[#0040ff]/50"
            aria-label="Sonraki proje"
          >
            <span className="absolute inset-0 bg-[#0040ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowRight size={22} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
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
