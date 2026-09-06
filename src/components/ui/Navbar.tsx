"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ActionStamp from "@/components/document/ActionStamp";

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
  { name: "Blog", href: "/blog" },
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
  }, [isHomePage, navLinks]);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-300 ${
          isScrolled ? "shadow-doc border-b border-ink/20" : "border-b border-ink/20"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            {/* Masaustu: logo solda, fihrist ortada */}
            <Link
              href="/"
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[3px] bg-ink">
                <Image
                  src={logoSrc}
                  alt={brandName}
                  width={48}
                  height={48}
                  className="h-7 w-7 object-contain"
                  priority
                />
              </span>
              <span className="font-bold text-base text-ink">{brandName}</span>
            </Link>

            <div className="hidden lg:block w-full h-full">
              <div className="max-w-7xl mx-auto h-full relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[80px] flex items-center gap-4 xl:gap-5">
                  {navLinks.map((link, index) =>
                    link.children && link.children.length > 0 ? (
                      <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                      >
                        <button
                          onClick={() => scrollToSection(link.href)}
                          aria-label="Hizmetler menüsü"
                          className={`shrink-0 whitespace-nowrap text-[13px] transition-colors hover:text-ink ${
                            activeSection === "services"
                              ? "font-bold text-ink underline decoration-ink underline-offset-[6px]"
                              : "text-pencil"
                          }`}
                        >
                          <span className="mr-1 font-mono text-[10px] text-pencil/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {link.name}
                        </button>

                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-[3px] border border-ink/30 bg-paper py-1 shadow-doc overflow-hidden z-50"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block px-4 py-2 text-[13px] text-ink/85 hover:bg-paper-alt hover:text-ink transition-colors"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className={`shrink-0 whitespace-nowrap text-[13px] transition-colors hover:text-ink ${
                          activeSection === link.href.replace("#", "")
                            ? "font-bold text-ink underline decoration-ink underline-offset-[6px]"
                            : "text-pencil"
                        }`}
                      >
                        <span className="mr-1 font-mono text-[10px] text-pencil/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.name}
                      </button>
                    )
                  )}
                </div>
                {ctaLabel && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ActionStamp
                      variant="ink"
                      size="sm"
                      onClick={() => scrollToSection(ctaHref)}
                    >
                      {ctaLabel}
                    </ActionStamp>
                  </div>
                )}
              </div>
            </div>

            {/* Mobil: logo sol, hamburger sag */}
            <Link href="/" className="lg:hidden absolute left-0 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[3px] bg-ink">
                <Image
                  src={logoSrc}
                  alt={brandName}
                  width={48}
                  height={48}
                  className="h-6 w-6 object-contain"
                  priority
                />
              </span>
              <span className="font-bold text-base text-ink">{brandName}</span>
            </Link>

            {/* Mobil Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden absolute right-0 p-2 rounded-[3px] border border-ink/40 text-ink"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menüyü aç"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobil Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 overflow-hidden border-b border-ink/30 bg-paper shadow-doc z-40 lg:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link, index) =>
                link.children && link.children.length > 0 ? (
                  <div key={link.name} className="border-b border-dashed border-ink/25 py-1">
                    <div className="flex items-center">
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className={`flex-1 text-left py-2 px-2 text-sm transition-colors ${
                          activeSection === "services"
                            ? "font-bold text-ink"
                            : "text-ink/85 hover:text-ink"
                        }`}
                      >
                        <span className="mr-2 font-mono text-[10px] text-pencil">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.name}
                      </button>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-2 text-pencil hover:text-ink"
                        aria-label="Hizmetler alt menüsü"
                        aria-expanded={mobileServicesOpen}
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
                          <div className="ml-4 border-l border-dashed border-ink/30 pb-1 flex flex-col">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-left py-2 pl-4 text-[13px] text-pencil hover:text-ink transition-colors"
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
                    className={`border-b border-dashed border-ink/25 py-2.5 px-2 text-left text-sm transition-colors last:border-b-0 ${
                      activeSection === link.href.replace("#", "")
                        ? "font-bold text-ink"
                        : "text-ink/85 hover:text-ink"
                    }`}
                  >
                    <span className="mr-2 font-mono text-[10px] text-pencil">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                  </button>
                )
              )}
              {ctaLabel && (
                <div className="pt-4">
                  <ActionStamp
                    variant="action"
                    size="md"
                    className="w-full"
                    onClick={() => scrollToSection(ctaHref)}
                  >
                    {ctaLabel}
                  </ActionStamp>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
