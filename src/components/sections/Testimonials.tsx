"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize-html";
import PerforationDivider from "@/components/document/PerforationDivider";

const testimonials = [
  {
    id: 1,
    name: "Mehmet",
    company: "Lada Wedding",
    role: "",
    image: "/lada_logo.webp",
    rating: 5,
    text: "Bey Digital Media ile çalışmak mükemmel bir deneyimdi. E-ticaret sitemizin satışları %150 arttı. SEO ve sosyal medya stratejileri gerçekten işe yarıyor.",
  },
  {
    id: 2,
    name: "Erenalp Guzgun",
    company: "Guzgun Tekstil",
    role: "",
    image: "/guzgunlar_logo.webp",
    rating: 5,
    text: "Uzun zamandır sosyal medyada böyle düzenli ve yaratıcı içerikler görmemiştik. Bey Digital Media sayesinde sayfamız adeta kendini buldu diyebiliriz. Her detayı özenle takip etmeleri ve bizi biz gibi yansıtmaları işin en güzel yanı. Emeğinize sağlık!",
  },
  {
    id: 3,
    name: "Erkutay Torun",
    company: "Emfa Pet",
    role: "",
    image: "/emfa.webp",
    rating: 5,
    text: "Kurumsal web sitemizin yeniden tasarımında gösterdikleri profesyonellik takdire şayan. Modern, hızlı ve kullanıcı dostu bir site oldu.",
  },
  {
    id: 5,
    name: "Murat Adlığ",
    company: "Nil Forklift",
    role: "",
    image: "/nilforkliftt.webp",
    rating: 5,
    text: "Sosyal medya yönetimi konusunda gerçekten profesyonel bir ekip. Sayfamızın etkileşimi kısa sürede ciddi oranda arttı. Tavsiye ederim.",
  },
  {
    id: 4,
    name: "Ebru Özpehlivan",
    company: "İşbir Yatak",
    role: "",
    image: "/isbir_yatak.webp",
    rating: 5,
    text: "Logo ve kurumsal kimlik çalışmamız tam istediğimiz gibi oldu. Yiğit Bey renkleri inanılmaz iyi kullandı, sonuç bizi çok mutlu etti.",
  },
];

export default function Testimonials({
  title = 'Bizim Hakkımızda Ne Dediler?',
  testimonials: propTestimonials,
}: {
  title?: string;
  testimonials?: typeof testimonials;
}) {
  const activeTestimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeTestimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const current = activeTestimonials[currentIndex];

  return (
    <section className="relative py-20 bg-paper-alt overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Bolum basligi */}
        <div className="mb-14 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Tutanak / Referanslar
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}
          />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-11 h-11 rounded-[3px] border border-ink/40 bg-paper items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
            aria-label="Önceki yorum"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            onClick={goToNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-11 h-11 rounded-[3px] border border-ink/40 bg-paper items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
            aria-label="Sonraki yorum"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          {/* Testimonial belgesi */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[3px] border border-ink/40 bg-paper shadow-doc p-5 sm:p-8 md:p-10"
              >
                {/* Tutanak basligi */}
                <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-pencil mb-6">
                  <Quote size={14} aria-hidden="true" className="text-kase" />
                  <span>Tutanak {String(currentIndex + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="dots-leader" />
                  <span>{current.company}</span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5" aria-label={`${current.rating} / 5`}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-kase fill-kase"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-ink leading-relaxed mb-8">
                  &quot;{current.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[3px] border border-ink/40 bg-paper-alt overflow-hidden shrink-0 flex items-center justify-center">
                    {current.image ? (
                      <Image src={current.image} alt={current.name} width={56} height={56} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-ink">{current.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    {(current.role || current.company) && (
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-pencil">
                        {current.role}
                        {current.company && (current.role ? ` @ ${current.company}` : current.company)}
                      </p>
                    )}
                    <h4 className="font-bold text-ink">
                      {current.name}
                    </h4>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sekme gostergeleri */}
          <div className="flex justify-center gap-2 mt-8">
            {activeTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 transition-all border ${
                  index === currentIndex
                    ? "w-7 bg-ink border-ink"
                    : "w-2.5 border-ink/50 hover:bg-ink/20"
                }`}
                aria-label={`Yorum ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
