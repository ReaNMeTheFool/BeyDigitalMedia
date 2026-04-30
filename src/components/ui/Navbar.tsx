"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

const defaultNavLinks: NavLink[] = [
  { name: "Ana Sayfa", href: "#hero" },
  {
    name: "Hizmetler",
    href: "#services",
    children: [
      { name: "Sosyal Medya Yönetimi", href: "/sosyal-medya-yonetimi" },
      { name: "Meta Ads", href: "/meta-ads" },
      { name: "Google Ads", href: "/google-ads" },
      { name: "Web Tasarım", href: "/web-tasarim" },
      { name: "SEO", href: "/seo" },
      { name: "Logo Tasarımı", href: "/logo-tasarimi" },
      { name: "Kurumsal Kimlik", href: "/kurumsal-kimlik" },
      { name: "Raporlama", href: "/detayli-raporlama" },
    ],
  },
  { name: "Otomasyon", href: "#ai-otomasyon" },
  { name: "Neden Biz?", href: "#why-us" },
  { name: "Portfolyo", href: "#portfolio" },
  { name: "Hakkımızda", href: "#about" },
  { name: "SSS", href: "#faq" },
  { name: "İletişim", href: "#contact" },
];

interface NavbarProps {
  logoSrc?: string;
  brandName?: string;
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Navbar({
  logoSrc = "/beydigital_logo.webp",
  brandName = "Bey Digital Media",
  navLinks = defaultNavLinks,
  ctaLabel = "Ücretsiz Teklif Al",
  ctaHref = "#contact",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

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
  }, [isHomePage]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (!isHomePage) {
      router.push("/" + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 relative">
            {/* Desktop: Logo solda 50px, nav tam ortada */}
            <Link
              href="/"
              className="hidden lg:flex absolute left-[50px] top-1/2 -translate-y-1/2 items-center gap-2"
            >
              <Image
                src={logoSrc}
                alt={brandName}
                width={48}
                height={48}
                className="object-contain"
                priority
                unoptimized
              />
              <span className="font-bold text-xl text-[#cdd6f4]">
                {brandName}
              </span>
            </Link>

            <div className="hidden lg:block w-full h-full">
              <div className="max-w-7xl mx-auto h-full relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[34px] flex items-center gap-5 xl:gap-7">
                  {navLinks.map((link) =>
                    link.children && link.children.length > 0 ? (
                      <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-[#7da5ff] ${
                            activeSection === "services"
                              ? "text-[#7da5ff] font-semibold"
                              : isScrolled
                              ? "text-[#cdd6f4]"
                              : "text-[#cdd6f4]/90"
                          }`}
                        >
                          {link.name}
                        </button>

                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#1e1e2e] border border-[#2d2d44] rounded-xl shadow-xl overflow-hidden z-50"
                            >
                              <div className="py-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="block px-4 py-2.5 text-sm text-[#cdd6f4]/90 hover:text-[#7da5ff] hover:bg-[#252538] transition-colors"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-[#7da5ff] ${
                          activeSection === link.href.replace("#", "")
                            ? "text-[#7da5ff] font-semibold"
                            : isScrolled
                            ? "text-[#cdd6f4]"
                            : "text-[#cdd6f4]/90"
                        }`}
                      >
                        {link.name}
                      </button>
                    )
                  )}
                </div>
                {ctaLabel && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <button
                      onClick={() => scrollToSection(ctaHref)}
                      className="px-5 py-2.5 bg-[#0040ff] text-white rounded-xl font-semibold text-sm hover:bg-[#0033cc] transition-colors shadow-lg shadow-[#0040ff]/25"
                    >
                      {ctaLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Logo sol, hamburger sağ */}
            <Link href="/" className="lg:hidden absolute left-0 flex items-center gap-2">
              <Image
                src={logoSrc}
                alt={brandName}
                width={40}
                height={40}
                className="object-contain"
                priority
                unoptimized
              />
              <span className="font-bold text-lg text-[#cdd6f4]">
                {brandName}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden absolute right-0 p-2 rounded-lg text-[#cdd6f4]"
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
            {navLinks.map((link) =>
              link.children && link.children.length > 0 ? (
                <div key={link.name}>
                  <div className="flex items-center">
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`flex-1 text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                        activeSection === "services"
                          ? "text-[#0040ff] bg-[#0040ff]/5"
                          : "text-[#cdd6f4] hover:bg-[#252538]"
                      }`}
                    >
                      {link.name}
                    </button>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="p-2 text-[#cdd6f4] hover:text-[#7da5ff]"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-1 flex flex-col gap-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-left py-2 px-4 rounded-lg text-sm text-[#cdd6f4]/80 hover:text-[#7da5ff] hover:bg-[#252538] transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
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
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
