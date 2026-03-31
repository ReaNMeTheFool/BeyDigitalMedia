"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Ana Sayfa", href: "#hero" },
  { name: "Hizmetler", href: "#services" },
  { name: "Neden Biz?", href: "#why-us" },
  { name: "Portfolyo", href: "#portfolio" },
  { name: "Hakkımızda", href: "#about" },
  { name: "SSS", href: "#faq" },
  { name: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Aktif bölümü tespit et
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-[#181825]/80 border-b border-[#2d2d44]/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 relative overflow-hidden">
            {/* Logo - Absolute positioning */}
            <Link href="/" className="flex items-center gap-2 absolute left-0 sm:left-8">
              <Image
                src="/beydigital_logo.webp"
                alt="Bey Digital Media"
                width={48}
                height={48}
                className="object-contain"
                priority
                unoptimized
              />
              <span
                className={`font-bold text-xl transition-colors ${
                  isScrolled ? "text-[#cdd6f4]" : "text-[#cdd6f4]"
                }`}
              >
                Bey Digital Media
              </span>
            </Link>

            {/* Desktop Navigation - True center */}
            <div className="hidden lg:flex items-center gap-8 justify-center w-full pl-5">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-[#0040ff] ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#0040ff]"
                      : isScrolled
                      ? "text-[#cdd6f4]"
                      : "text-[#cdd6f4]/90"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ml-auto p-2 rounded-lg transition-colors ${
                isScrolled ? "text-[#cdd6f4]" : "text-[#cdd6f4]"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 bg-[#1e1e2e] border-b border-[#2d2d44] p-4 flex flex-col gap-4 shadow-lg z-40 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#0040ff] bg-[#0040ff]/5"
                    : "text-[#cdd6f4] hover:bg-[#252538]"
                }`}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
