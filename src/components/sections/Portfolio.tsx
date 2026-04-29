"use client";

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ServiceTag {
  label: string;
  slug: string;
  breakBefore?: boolean;
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
  smallTags?: boolean;
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
      { label: "Google Ads", slug: "google-ads", breakBefore: true },
      { label: "SEO", slug: "seo" },
    ],
    color: "from-emerald-500 to-teal-600",
    results: "Etkileşim Oranı +2000%",
    logo: "/guzgunlar_logo.webp",
    resultsColor: "#fefefe",
    smallTags: true,
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
    resultsColor: "#fc031c",
  },
];

const extendedProjects = [...projects, ...projects, ...projects];
const BASE_OFFSET = projects.length;
const GAP_PX = 24;
const LERP = 0.22;
const SETTLE_EPSILON = 0.4;
const DRAG_THRESHOLD = 5;
const MOMENTUM_MS = 140;

export default function Portfolio({
  title = 'Gerçek Başarı Hikayeleri',
  subtitle = "Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const targetIndexRef = useRef(BASE_OFFSET);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const cardWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartCurrentXRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const dragMovedRef = useRef(false);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
  }, []);

  const computeX = useCallback((index: number) => -(index * cardWidthRef.current), []);

  const normalizeIfSettled = useCallback(() => {
    const len = projects.length;
    const cw = cardWidthRef.current;
    if (!cw) return;
    let changed = false;
    while (targetIndexRef.current >= len * 2) {
      targetIndexRef.current -= len;
      targetXRef.current += len * cw;
      currentXRef.current += len * cw;
      changed = true;
    }
    while (targetIndexRef.current < len) {
      targetIndexRef.current += len;
      targetXRef.current -= len * cw;
      currentXRef.current -= len * cw;
      changed = true;
    }
    if (changed) applyTransform();
  }, [applyTransform]);

  const normalizeDuringDrag = useCallback(() => {
    const len = projects.length;
    const cw = cardWidthRef.current;
    if (!cw) return;
    let changed = false;
    while (-currentXRef.current / cw < len) {
      currentXRef.current -= len * cw;
      dragStartCurrentXRef.current -= len * cw;
      targetXRef.current -= len * cw;
      targetIndexRef.current += len;
      changed = true;
    }
    while (-currentXRef.current / cw >= len * 2) {
      currentXRef.current += len * cw;
      dragStartCurrentXRef.current += len * cw;
      targetXRef.current += len * cw;
      targetIndexRef.current -= len;
      changed = true;
    }
    if (changed) applyTransform();
  }, [applyTransform]);

  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    tickRef.current = () => {
      const diff = targetXRef.current - currentXRef.current;
      if (Math.abs(diff) < SETTLE_EPSILON) {
        currentXRef.current = targetXRef.current;
        applyTransform();
        normalizeIfSettled();
        rafRef.current = null;
        return;
      }
      currentXRef.current += diff * LERP;
      applyTransform();
      rafRef.current = requestAnimationFrame(tickRef.current);
    };
  });

  const startAnimation = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const stopAnimation = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const rebaseForNav = useCallback(() => {
    const len = projects.length;
    const cw = cardWidthRef.current;
    if (!cw) return;
    while (targetIndexRef.current >= len * 2) {
      targetIndexRef.current -= len;
      targetXRef.current += len * cw;
      currentXRef.current += len * cw;
    }
    while (targetIndexRef.current < len) {
      targetIndexRef.current += len;
      targetXRef.current -= len * cw;
      currentXRef.current -= len * cw;
    }
    applyTransform();
  }, [applyTransform]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!cardWidthRef.current) return;
      targetIndexRef.current += direction;
      targetXRef.current = computeX(targetIndexRef.current);
      rebaseForNav();
      startAnimation();
    },
    [computeX, rebaseForNav, startAnimation]
  );

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".project-card") as HTMLElement | null;
    if (!card) return;
    const cw = card.offsetWidth + GAP_PX;
    if (cw <= GAP_PX) return;
    cardWidthRef.current = cw;
    targetXRef.current = computeX(targetIndexRef.current);
    if (!draggingRef.current && rafRef.current == null) {
      currentXRef.current = targetXRef.current;
      applyTransform();
    }
  }, [computeX, applyTransform]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => () => stopAnimation(), [stopAnimation]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggingRef.current = true;
      dragMovedRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartCurrentXRef.current = currentXRef.current;
      dragLastXRef.current = e.clientX;
      dragLastTimeRef.current = performance.now();
      dragVelocityRef.current = 0;
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;

      if (!dragMovedRef.current) {
        if (Math.abs(dx) <= DRAG_THRESHOLD) return;
        // Eşik aşıldı → artık gerçekten drag; animasyonu durdur, pointer'ı yakala
        dragMovedRef.current = true;
        stopAnimation();
        try {
          viewportRef.current?.setPointerCapture(e.pointerId);
        } catch {}
      }

      currentXRef.current = dragStartCurrentXRef.current + dx;
      const now = performance.now();
      const dt = now - dragLastTimeRef.current;
      if (dt > 0) {
        const v = (e.clientX - dragLastXRef.current) / dt;
        dragVelocityRef.current = Math.max(-3, Math.min(3, v));
      }
      dragLastXRef.current = e.clientX;
      dragLastTimeRef.current = now;
      normalizeDuringDrag();
      applyTransform();
    },
    [applyTransform, normalizeDuringDrag, stopAnimation]
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const wasDragging = dragMovedRef.current;
      draggingRef.current = false;
      try {
        viewportRef.current?.releasePointerCapture(e.pointerId);
      } catch {}
      if (!wasDragging) return; // sadece tıklama, slider'ı oynatma
      const cw = cardWidthRef.current;
      if (!cw) return;
      const projectedX = currentXRef.current + dragVelocityRef.current * MOMENTUM_MS;
      const idx = Math.round(-projectedX / cw);
      targetIndexRef.current = idx;
      targetXRef.current = computeX(idx);
      startAnimation();
    },
    [computeX, startAnimation]
  );

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMovedRef.current = false;
    }
  }, []);

  const getGerçekColor = () => {
    switch (activeHover) {
      case "Guzgun Tekstil": return "#0040ff";
      case "İşbir Yatak": return "#dc2626";
      case "Lada Wedding": return "#d69f55";
      case "Nil Forklift": return "#f59e0b";
      case "Emfa Pet": return "#dc2626";
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
              {title.split(' ')[0]}
            </span>{" "}
            {title.split(' ').slice(1).join(' ')}
          </h2>
          <p className="text-[#cdd6f4]/90 text-lg max-w-2xl mx-auto">
            {subtitle}
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
          className="overflow-hidden pb-8 pt-4 select-none touch-pan-y"
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            ref={trackRef}
            className="flex gap-6 px-2 sm:px-6 lg:px-8 will-change-transform"
          >
            {extendedProjects.map((project, index) => (
              <div
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
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.logo}
                          alt={project.title}
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                          style={project.logoScale ? { transform: `scale(${project.logoScale})` } : undefined}
                        />
                      </>
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

                    <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                      <p className="font-bold text-center text-sm" style={{ color: project.resultsColor ?? "#ffd76e" }}>
                        {project.results}
                      </p>
                    </div>
                  </div>

                  <div className={`${project.smallTags ? "p-4" : "p-6"} relative rounded-b-3xl`}>
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2d2d44] to-transparent" />
                    <div className={`flex flex-wrap ${project.smallTags ? "gap-1 mb-[10px]" : "gap-2 mb-3"}`}>
                      {project.services.map((tag) => (
                        <React.Fragment key={tag.slug}>
                          {tag.breakBefore && <div className="basis-full h-0" />}
                          <Link
                            href={`/${tag.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            className={`inline-block bg-[#0040ff] rounded-full font-medium hover:bg-[#0033cc] transition-colors duration-200 shadow-md shadow-[#0040ff]/30 ${project.smallTags ? "px-2 py-0.5 text-xs sm:text-[10px]" : "px-3 py-1 text-xs"}`}
                            style={{ color: "#ffffff" }}
                          >
                            {tag.label}
                          </Link>
                        </React.Fragment>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-[#cdd6f4] mb-1">{project.title}</h3>
                  </div>
                </motion.div>
              </div>
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
