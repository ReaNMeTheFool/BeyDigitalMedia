"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Animasyonlu başlık bileşeni - CSS tabanlı
function AnimatedHeadline() {
  const words = [
    "Satışlarınızı",
    "Kazancınızı",
    "Verimliliğinizi",
    "Geleceğinizi"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
      {/* Üst satır - Dijital */}
      <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#cdd6f4] whitespace-nowrap">
        Dijital
      </span>
      
      {/* Boşluk - sadece sm ve üstü */}
      <span className="hidden sm:block w-4 md:w-8 lg:w-10"></span>
      
      {/* Animasyonlu kelime container - CSS fade */}
      <span
        className="relative inline-flex items-center justify-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold my-1 sm:my-0 text-[#ffd76e] whitespace-nowrap transition-opacity duration-500"
        style={{
          textShadow: "0 0 30px rgba(255,215,110,0.8), 0 0 60px rgba(255,215,110,0.4), 0 0 90px rgba(255,215,110,0.2)"
        }}
      >
        {words[currentIndex]}
      </span>
      
      {/* Boşluk - sadece sm ve üstü */}
      <span className="hidden sm:block w-4 md:w-8 lg:w-10"></span>
      
      {/* Sağ taraf - Büyütüyoruz */}
      <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#cdd6f4] whitespace-nowrap">
        Büyütüyoruz
      </span>
    </div>
  );
}

// Seçenek 4: Canvas Particle Network
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let lastTime = 0;
    const frameInterval = 1000 / 30; // 30 FPS'e sınırla (mobil için)

    const resizeCanvas = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

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

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 110, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Mobilde daha az partikül (daha iyi performans)
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
      
      // Mobilde FPS sınırlama
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
        particle.update();
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

export default function Hero() {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-[100vw]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000066]/90 via-[#00004d]/85 to-[#000033]/95" />
      </div>

      {/* Particle Effect */}
      <ParticleCanvas />

      {/* Subtle gradient orbs - CSS Animation */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#ffd76e]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0040ff]/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        >
          {/* Main Headline - Sabit pozisyonlu */}
          <div className="mb-8">
            <AnimatedHeadline />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-[#cdd6f4]/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Bey  Digital  Media  olarak  markanızı  dijital  dünyada  büyütmek  için  Meta  Ads, Google Ads,  Sosyal  Medya  Yönetimi  ve  daha  fazlasını  sunuyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToContact}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ffd76e] text-[#181825] font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,110,0.4)]"
            >
              <span className="relative z-10">Ücretsiz Teklif Al</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToServices}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#cdd6f4]/10 backdrop-blur-sm text-[#cdd6f4] font-semibold rounded-full border border-[#cdd6f4]/20 transition-all duration-300 hover:bg-[#cdd6f4]/20"
            >
              Hizmetlerimiz
            </button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "150+", label: "Tamamlanan Proje" },
            { number: "100+", label: "Memnun Müşteri" },
            { number: "8+", label: "Yıllık Deneyim" },
            { number: "%100", label: "Müşteri Memnuniyeti" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#ffd76e] mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-[#cdd6f4]/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          const element = document.getElementById('services');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#cdd6f4]/50 hover:text-[#cdd6f4] transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm tracking-wider">Bizi daha fazla keşfet</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
