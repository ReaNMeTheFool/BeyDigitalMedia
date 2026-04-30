"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, Phone, ArrowUpRight, Youtube, Facebook } from "lucide-react";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}
import Link from "next/link";
import ContactForm from "../ui/ContactForm";

const defaultFooterLinks = {
  services: [
    { label: "Sosyal Medya Yönetimi", href: "/sosyal-medya-yonetimi" },
    { label: "Meta Ads", href: "/meta-ads" },
    { label: "Google Ads", href: "/google-ads" },
    { label: "Web Tasarım", href: "/web-tasarim" },
    { label: "SEO", href: "/seo" },
    { label: "Logo & Kurumsal Kimlik", href: "/logo-tasarimi" },
  ],
  company: [
    { label: "Hakkımızda", href: "#about" },
    { label: "Portfolyo", href: "#portfolio" },
    { label: "SSS", href: "#faq" },
    { label: "İletişim", href: "#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/beydigitalmedia", platform: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/@beydigitalmedia", platform: "youtube" },
    { label: "Facebook", href: "https://www.facebook.com/beydigitalmedia", platform: "facebook" },
    { label: "TikTok", href: "https://www.tiktok.com/@beydigitalmedia", platform: "tiktok" },
  ],
};

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: TikTokIcon,
};

interface FooterProps {
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  brandName?: string;
  brandTagline?: string;
  footerLinks?: typeof defaultFooterLinks;
  contactEmail?: string;
  contactPhone?: string;
  bottomText?: string;
}

export default function Footer({
  ctaTitle = 'Dijital <span class="text-[#ffd76e]">Dönüşüm</span> İçin <br /><span style="color: #04a5e5">Hazır mısınız?</span>',
  ctaSubtitle = "Markanızı bir üst seviyeye taşımak için hemen bizimle iletişime geçin. Ücretsiz danışmanlık için formu doldurun.",
  ctaButtonText = "Ücretsiz Teklif Alın",
  ctaButtonHref = "#contact",
  brandName = 'Bey <span class="text-[#ffd76e]">Digital</span> Media',
  brandTagline = "Built for Digital Growth.",
  footerLinks = defaultFooterLinks,
  contactEmail = "Beydigitalmedia@gmail.com",
  contactPhone = "+90 544 376 03 39",
  bottomText = `© ${new Date().getFullYear()} Bey Digital Media. Tüm hakları saklıdır.`,
}: FooterProps) {
  return (
    <footer id="contact" className="bg-[#181825] text-[#cdd6f4] relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#11111b] to-transparent pointer-events-none z-10" />
      {/* CTA Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: ctaTitle }}
              />
              <p className="text-[#cdd6f4]/90 text-lg mb-8">
                {ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 text-[#cdd6f4] hover:text-[#ffd76e] transition-colors break-all"
                >
                  <Mail size={20} className="shrink-0" />
                  {contactEmail}
                </a>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  onClick={(e) => {
                    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
                    if (!isMobile) {
                      e.preventDefault();
                      window.open(`https://wa.me/${contactPhone.replace(/\D/g, "")}`, "_blank");
                    }
                  }}
                  className="inline-flex items-center gap-2 text-[#cdd6f4] hover:text-[#ffd76e] transition-colors"
                >
                  <Phone size={20} />
                  {contactPhone}
                </a>
              </div>
            </div>
            <div className="bg-[#cdd6f4]/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-[#cdd6f4]/10">
              <h3 className="text-xl font-bold mb-6">{ctaButtonText}</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="text-2xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: brandName }}
            />
            <p className="text-[#cdd6f4]/80 mb-6">
              {brandTagline}
            </p>
            <div className="flex gap-4">
              {footerLinks.social?.map((social) => {
                const IconComponent = iconMap[social.platform];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#cdd6f4]/10 rounded-full flex items-center justify-center hover:bg-[#ffd76e] hover:text-[#181825] transition-all"
                    aria-label={social.label}
                  >
                    {IconComponent ? <IconComponent size={20} /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Hizmetler</h4>
            <ul className="space-y-3">
              {footerLinks.services?.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.company?.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#ffd76e] shrink-0" />
                <a href={`mailto:${contactEmail}`} className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors break-all">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#ffd76e] shrink-0" />
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  onClick={(e) => {
                    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
                    if (!isMobile) {
                      e.preventDefault();
                      window.open(`https://wa.me/${contactPhone.replace(/\D/g, "")}`, "_blank");
                    }
                  }}
                  className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors"
                >
                  {contactPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-[#cdd6f4]/60 text-sm text-center">
            {bottomText}
          </p>
        </div>
      </div>
    </footer>
  );
}
