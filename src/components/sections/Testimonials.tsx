"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    company: "Luxe Boutique",
    role: "İşletme Sahibi",
    image: "/avatar-1.jpg",
    rating: 5,
    text: "Bey Digital Media ile çalışmak mükemmel bir deneyimdi. E-ticaret sitemizin satışları %150 arttı. SEO ve sosyal medya stratejileri gerçekten işe yarıyor.",
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    company: "Organik Yaşam",
    role: "Kurucu",
    image: "/avatar-2.jpg",
    rating: 5,
    text: "Sosyal medya yönetimini tamamen Bey Digital Media'ya emanet ettik. İçerikler çok yaratıcı ve etkileşim oranlarımız katlandı. Kesinlikle tavsiye ederim.",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    company: "TechStart",
    role: "CEO",
    image: "/avatar-3.jpg",
    rating: 5,
    text: "Kurumsal web sitemizin yeniden tasarımında gösterdikleri profesyonellik takdire şayan. Modern, hızlı ve kullanıcı dostu bir site oldu.",
  },
  {
    id: 4,
    name: "Ayşe Şahin",
    company: "Mimarlık Atölyesi",
    role: "Mimar",
    image: "/avatar-4.jpg",
    rating: 5,
    text: "Logo ve kurumsal kimlik çalışmamız tam istediğimiz gibi oldu. Yiğit Bey'in renk psikolojisine hakimiyeti projemizi bir üst seviyeye taşıdı.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
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

  return (
    <section className="py-24 bg-[#181825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#0040ff]/10 text-[#0040ff] rounded-full text-sm font-semibold mb-4">
            Müşteri Yorumları
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            Bizim Hakkımızda{" "}
            <span className="text-[#0040ff]">Ne Dediler?</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 bg-[#1e1e2e] rounded-full shadow-lg flex items-center justify-center text-[#cdd6f4] hover:bg-[#0040ff] hover:text-white transition-colors"
            aria-label="Önceki yorum"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 bg-[#1e1e2e] rounded-full shadow-lg flex items-center justify-center text-[#cdd6f4] hover:bg-[#0040ff] hover:text-white transition-colors"
            aria-label="Sonraki yorum"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#1e1e2e] rounded-3xl p-8 md:p-12 shadow-lg"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-[#0040ff]/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-[#0040ff]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#ffd76e] fill-[#ffd76e]"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-[#cdd6f4] italic leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0040ff] to-[#ffd76e] flex items-center justify-center text-white text-xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#cdd6f4] text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-[#a6adc8]">
                      {testimonials[currentIndex].role} @{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#0040ff] w-8"
                    : "bg-[#0040ff]/30 hover:bg-[#0040ff]/50"
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
