"use client";

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { defaultProjects, type Project } from "@/lib/defaultProjects";
import ActionStamp from "@/components/document/ActionStamp";
import PerforationDivider from "@/components/document/PerforationDivider";

const BASE_OFFSET = defaultProjects.length;
const GAP_PX = 24;
const LERP = 0.22;
const SETTLE_EPSILON = 0.4;
const DRAG_THRESHOLD = 5;
const MOMENTUM_MS = 140;

export default function Portfolio({
  title = 'Gerçek Başarı Hikayeleri',
  subtitle = "Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.",
  projects: propProjects,
}: {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}) {
  const activeProjects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects;
  const extendedActiveProjects = [...activeProjects, ...activeProjects, ...activeProjects];
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const len = activeProjects.length;
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
  }, [applyTransform, activeProjects.length]);

  const normalizeDuringDrag = useCallback(() => {
    const len = activeProjects.length;
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
  }, [applyTransform, activeProjects.length]);

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
    const len = activeProjects.length;
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
  }, [applyTransform, activeProjects.length]);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (!cardWidthRef.current) return;
      targetIndexRef.current += direction;
      targetXRef.current = computeX(targetIndexRef.current);
      rebaseForNav();
      startAnimation();
      setActiveIndex(((targetIndexRef.current % activeProjects.length) + activeProjects.length) % activeProjects.length);
    },
    [computeX, rebaseForNav, startAnimation, activeProjects.length]
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
      setActiveIndex(((idx % activeProjects.length) + activeProjects.length) % activeProjects.length);
    },
    [computeX, startAnimation, activeProjects.length]
  );

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMovedRef.current = false;
    }
  }, []);

  return (
    <section id="portfolio" className="relative py-20 bg-paper-alt overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Ek Dosya / Portfolyo — {String(activeIndex + 1).padStart(2, "0")}/{String(activeProjects.length).padStart(2, "0")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink mb-5">
            {title}
          </h2>
          <p className="text-pencil text-lg max-w-2xl">{subtitle}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 sm:left-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-[3px] border border-ink/40 bg-paper text-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-150"
          aria-label="Önceki proje"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-2 sm:right-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-[3px] border border-ink/40 bg-paper text-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-150"
          aria-label="Sonraki proje"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>

        <div
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
            {extendedActiveProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="project-card shrink-0"
              >
                <div className="group relative w-[85vw] sm:w-80 md:w-96 rounded-[3px] border border-ink/40 bg-paper shadow-doc overflow-visible">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[3px] border-b border-ink/20 bg-paper-alt">
                    {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 85vw, 384px"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                          style={project.logoScale ? { transform: `scale(${project.logoScale})` } : undefined}
                        />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-ink p-8">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-[3px] border border-ink/40 bg-paper flex items-center justify-center overflow-hidden">
                            <span className="text-3xl font-black">{project.title.charAt(0)}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <span className="font-mono text-xs uppercase tracking-[0.16em] text-pencil">{project.category}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sonuc satiri */}
                  <p className="font-mono font-bold text-ink text-sm text-center py-2.5 border-b border-dashed border-ink/30 px-4">
                    {project.results}
                  </p>

                  <div className={`${project.smallTags ? "p-4" : "p-5"} relative rounded-b-[3px]`}>
                    <div className={`flex flex-wrap ${project.smallTags ? "gap-1 mb-[10px]" : "gap-2 mb-3"}`}>
                      {project.services.map((tag) => (
                        <React.Fragment key={tag.slug}>
                          {tag.breakBefore && <div className="basis-full h-0" />}
                          <Link
                            href={`/${tag.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            className={`inline-block rounded-[3px] border border-ink/40 bg-paper font-mono uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper transition-colors duration-150 ${project.smallTags ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
                          >
                            {tag.label}
                          </Link>
                        </React.Fragment>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-ink">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <ActionStamp href="#contact" size="lg">
          Sizin Projeniz de Burada Olabilir!
          <ExternalLink size={18} aria-hidden="true" />
        </ActionStamp>
      </div>

    </section>
  );
}
