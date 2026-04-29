"use client";

import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;

  constructor(canvasW: number, canvasH: number) {
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update(canvasW: number, canvasH: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvasW) this.vx *= -1;
    if (this.y < 0 || this.y > canvasH) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 110, ${this.opacity})`;
    ctx.fill();
  }
}

// Animasyonlu başlık bileşeni - Tüm cihazlarda aktif ve mobilde daha büyük
function AnimatedHeadline({ words }: { words: string[] }) {
  const safeWords = words.length > 0 ? words : [
    "Satışlarınızı",
    "Kazancınızı",
    "Verimliliğinizi",
    "Geleceğinizi"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [safeWords.length]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
      {/* Üst satır - Dijital */}
      <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#cdd6f4] whitespace-nowrap">
        Dijital
      </span>

      {/* Boşluk - sadece sm ve üstü */}
      <span className="hidden sm:block w-4"></span>

      {/* Orta - Animasyonlu kelime - Sabit genişlik */}
      <span className="relative inline-flex items-center justify-center text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold my-1 sm:my-0 text-[#ffd76e] whitespace-nowrap">
        {/* Ghost: en uzun kelime genişliği sabit tutar */}
        <span className="invisible select-none" aria-hidden="true">{safeWords.reduce((a, b) => a.length > b.length ? a : b, "")}</span>
        {/* AnimatePresence: kelimeler slide-up + fade ile geçiş yapar */}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              textShadow: "0 0 30px rgba(255,215,110,0.8), 0 0 60px rgba(255,215,110,0.4), 0 0 90px rgba(255,215,110,0.2)"
            }}
          >
            {safeWords[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      
      {/* Boşluk - sadece sm ve üstü */}
      <span className="hidden sm:block w-4"></span>

      {/* Sağ taraf - Büyütüyoruz */}
      <span className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#cdd6f4] whitespace-nowrap">
        Büyütüyoruz
      </span>
    </div>
  );
}

// Canvas Particle Network - Sadece masaüstünde
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Mobilde canvas'ı devre dışı bırak
    if (window.innerWidth < 768) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let lastTime = 0;
    const frameInterval = 1000 / 30;

    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const isMobile = canvas!.width < 768;
      const baseCount = isMobile ? 30 : 120;
      const density = isMobile ? 15000 : 10000;
      const particleCount = Math.min(baseCount, Math.floor((canvas!.width * canvas!.height) / density));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas!.width, canvas!.height));
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150 && connections < 3) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 215, 110, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }
    };

    const animate = (currentTime: number) => {
      const isMobile = canvas!.width < 768;
      
      if (isMobile) {
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameInterval) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        lastTime = currentTime;
      }
      
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      particles.forEach((particle) => {
        particle.update(canvas!.width, canvas!.height);
        particle.draw(ctx);
      });
      
      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    resizeCanvas();
    initParticles();
    animate(0);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] hidden md:block"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero({
  titleWords = ["Satışlarınızı", "Kazancınızı", "Verimliliğinizi", "Geleceğinizi"],
  description = "Bey Digital Media olarak markanızı dijital dünyada büyütmek için Meta Ads, Google Ads, Sosyal Medya Yönetimi ve daha fazlasını sunuyoruz.",
  primaryCta,
  secondaryCta,
  stats = [
    { number: "150+", label: "Tamamlanan Proje" },
    { number: "100+", label: "Memnun Müşteri" },
    { number: "%100", label: "Müşteri Memnuniyeti" },
    { number: "8+", label: "Yıllık Deneyim" },
  ],
}: {
  titleWords?: string[];
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  stats?: { number: string; label: string }[];
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden w-full"
    >
      {/* Background Gradient + Noise */}
      <div className="absolute inset-0 z-0 noise">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000066]/90 via-[#00004d]/85 to-[#000033]/95" />
      </div>

      {/* Particle Effect */}
      <ParticleCanvas />

      {/* Subtle gradient orbs - CSS Animation */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden sm:block">
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] animate-pulse-slow"
          style={{
            background: "radial-gradient(ellipse at 30% 30%, rgba(255,215,110,0.12) 0%, rgba(255,215,110,0.04) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] animate-pulse-slow"
          style={{
            animationDelay: "2s",
            background: "radial-gradient(ellipse at 70% 70%, rgba(0,64,255,0.12) 0%, rgba(0,64,255,0.04) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        <div className="animate-fade-in-up">
          {/* Main Headline */}
          <div className="mb-8">
            <AnimatedHeadline words={titleWords} />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[#cdd6f4]/90 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => {
                const id = primaryCta?.link?.startsWith('#') ? primaryCta.link.slice(1) : 'contact';
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#ffd76e] text-[#181825] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,110,0.4)]"
            >
              <span className="relative z-10">{primaryCta?.text || 'Ücretsiz Teklif Al'}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const id = secondaryCta?.link?.startsWith('#') ? secondaryCta.link.slice(1) : 'services';
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#cdd6f4]/10 backdrop-blur-sm text-[#cdd6f4] font-semibold rounded-full border border-[#cdd6f4]/20 transition-all duration-300 hover:bg-[#cdd6f4]/20"
            >
              {secondaryCta?.text || 'Hizmetlerimiz'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ffd76e] mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-[#cdd6f4]/75">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const element = document.getElementById('services');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#cdd6f4]/60 hover:text-[#cdd6f4] transition-colors cursor-pointer animate-bounce-slow"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm tracking-wider">Bizi daha fazla keşfet</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
    </section>
  );
}
