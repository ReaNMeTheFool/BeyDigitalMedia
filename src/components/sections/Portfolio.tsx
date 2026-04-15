"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ServiceTag {
  label: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  services: ServiceTag[];
  color: string;
  results: string;
  logo?: string;
  logoScale?: number;
  resultsColor?: string;
}

const projects: Project[] = [
  {
    id: 2,
    title: "Guzgun Tekstil",
    category: "Dijital Pazarlama",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
      { label: "Web Tasarım", slug: "web-tasarim" },
      { label: "SEO", slug: "seo" },
      { label: "Google Ads", slug: "google-ads" },
      { label: "Logo Tasarımı", slug: "logo-tasarimi" },
      { label: "Kurumsal Kimlik", slug: "kurumsal-kimlik" },
    ],
    color: "from-emerald-500 to-teal-600",
    results: "Etkileşim Oranı +2000%",
    logo: "/guzgunlar_logo.webp",
    resultsColor: "#fefefe",
  },
  {
    id: 4,
    title: "İşbir Yatak",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-violet-500 to-purple-600",
    results: "Etkileşim oranı +150%",
    logo: "/isbir_yatak.webp",
    resultsColor: "#d93b38",
  },
  {
    id: 5,
    title: "Lada Wedding",
    category: "Reklam",
    services: [
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-rose-500 to-pink-600",
    results: "Dönüşüm oranı +300%",
    logo: "/lada_logo.webp",
  },
  {
    id: 6,
    title: "Nil Forklift",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-amber-500 to-orange-600",
    results: "Etkileşim Oranı +200%",
    logo: "/nilforkliftt.webp",
    resultsColor: "#f59e0b",
  },
  {
    id: 7,
    title: "Emfa Pet",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-cyan-500 to-blue-600",
    results: "Etkileşim Oranı +500%",
    logo: "/emfa.webp",
    logoScale: 1.35,
    resultsColor: "#22d3ee",
  },
];

const extendedProjects = [...projects, ...projects, ...projects];
const SCROLL_MS = 350;

export default function Portfolio() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const indexRef = useRef(projects.length);
  const cardWidthRef = useRef(0);
  const canScrollRef = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getCardWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    const card = container.querySelector(".project-card") as HTMLElement;
    if (!card) return 0;
    return card.offsetWidth + 24;
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const init = () => {
      cardWidthRef.current = getCardWidth();
      if (cardWidthRef.current > 0) {
        container.scrollLeft = indexRef.current * cardWidthRef.current;
      }
    };

    const t = setTimeout(init, 50);

    const ro = new ResizeObserver(() => {
      cardWidthRef.current = getCardWidth();
      container.scrollLeft = indexRef.current * cardWidthRef.current;
    });
    ro.observe(container);

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [getCardWidth]);

  const scrollToIndex = useCallback((index: number, instant = false) => {
    const container = scrollContainerRef.current;
    const cw = cardWidthRef.current;
    if (!container || !cw) return;

    if (instant) {
      container.style.scrollBehavior = "auto";
      container.scrollLeft = index * cw;
      requestAnimationFrame(() => {
        container.style.scrollBehavior = "";
      });
    } else {
      container.scrollTo({ left: index * cw, behavior: "smooth" });
    }
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!canScrollRef.current) return;
      canScrollRef.current = false;

      if (timerRef.current) clearTimeout(timerRef.current);

      const newIndex = indexRef.current + direction;
      indexRef.current = newIndex;
      scrollToIndex(newIndex);

      let handled = false;
      const handleScrollEnd = () => {
        if (handled) return;
        handled = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        const container = scrollContainerRef.current;
        if (container) container.removeEventListener("scrollend", handleScrollEnd);

        let resetIndex: number | null = null;
        if (indexRef.current >= projects.length * 2) resetIndex = projects.length;
        else if (indexRef.current < projects.length) resetIndex = projects.length * 2 - 1;

        if (resetIndex !== null) {
          indexRef.current = resetIndex;
          scrollToIndex(resetIndex, true);
        }
        canScrollRef.current = true;
      };

      const container = scrollContainerRef.current;
      if (container) container.addEventListener("scrollend", handleScrollEnd);
      timerRef.current = setTimeout(handleScrollEnd, 600);
    },
    [scrollToIndex]
  );

  const getGerçekColor = () => {
    switch (activeHover) {
      case "Guzgun Tekstil": return "#0040ff";
      case "İşbir Yatak": return "#dc2626";
      case "Lada Wedding": return "#d69f55";
      case "Nil Forklift": return "#f59e0b";
      case "Emfa Pet": return "#22d3ee";
      default: return "#0040ff";
    }
  };

  return (
    <section id="portfolio" className="relative py-24 bg-[#11111b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            <span style={{ color: getGerçekColor(), transition: "color 300ms ease-in-out" }}>
              Gerçek
            </span>{" "}
            Başarı Hikayeleri
          </h2>
          <p className="text-[#cdd6f4]/90 text-lg max-w-2xl mx-auto">
            Türkiye&apos;nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="group absolute left-2 sm:left-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#252538] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center shadow-xl hover:border-[#0040ff]/50 hover:text-[#0040ff] hover:shadow-[0_0_30px_rgba(0,64,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Önceki proje"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0040ff]/0 to-[#0040ff]/0 group-hover:from-[#0040ff]/10 group-hover:to-[#0040ff]/5 transition-all duration-300" />
          <ChevronLeft size={26} className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={() => navigate(1)}
          className="group absolute right-2 sm:right-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#252538] border border-[#2d2d44] text-[#cdd6f4] flex items-center justify-center shadow-xl hover:border-[#0040ff]/50 hover:text-[#0040ff] hover:shadow-[0_0_30px_rgba(0,64,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
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
                  className="group relative w-[85vw] sm:w-80 md:w-96 bg-gradient-to-br from-[#1e1e2e] to-[#252538] rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-[#0040ff]/10 transition-all duration-500 border border-[#2d2d44]/50 hover:border-[#0040ff]/30 overflow-visible"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden rounded-t-3xl"
                    onMouseEnter={() => setActiveHover(project.title)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={project.logoScale ? { transform: `scale(${project.logoScale})` } : undefined}
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                          <div className="text-center">
                            <motion.div
                              className="w-24 h-24 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner overflow-hidden"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <span className="text-4xl font-bold drop-shadow-lg">
                                {project.title.charAt(0)}
                              </span>
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{project.title}</h3>
                            <span className="text-sm opacity-90 font-medium">{project.category}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="font-bold text-center text-sm" style={{ color: project.resultsColor ?? "#ffd76e" }}>
                        {project.results}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 relative rounded-b-3xl">
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2d2d44] to-transparent" />
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.services.map((tag) => (
                        <Link
                          key={tag.slug}
                          href={`/${tag.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block px-3 py-1 text-xs bg-[#0040ff] rounded-full font-medium hover:bg-[#0033cc] transition-colors duration-200 shadow-md shadow-[#0040ff]/30"
                          style={{ color: "#ffffff" }}
                        >
                          {tag.label}
                        </Link>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-[#cdd6f4] mb-1">{project.title}</h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
