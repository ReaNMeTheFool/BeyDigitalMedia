"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "../ui/ContactForm";
import SerialStrip from "@/components/document/SerialStrip";
import PerforationDivider from "@/components/document/PerforationDivider";
import SignatureLine from "@/components/document/SignatureLine";
import { iconMap } from "@/lib/icon-map";
import { sanitizeHtml } from "@/lib/sanitize-html";

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
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Portfolyo", href: "/#portfolio" },
    { label: "SSS", href: "/#faq" },
    { label: "İletişim", href: "/iletisim" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/beydigitalmedia", platform: "instagram" },
    { label: "YouTube", href: "https://www.youtube.com/@beydigitalmedia", platform: "youtube" },
    { label: "Facebook", href: "https://www.facebook.com/beydigitalmedia", platform: "facebook" },
    { label: "TikTok", href: "https://www.tiktok.com/@beydigitalmedia", platform: "tiktok" },
  ],
};

interface FooterProps {
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  brandName?: string;
  brandTagline?: string;
  footerLinks?: typeof defaultFooterLinks;
  contactEmail?: string;
  contactPhone?: string;
  bottomText?: string;
}

export default function Footer({
  ctaTitle = 'Dijital <span class="text-[#ffd76e]">Dönüşüm</span> İçin <br /><span class="text-[#4c7fff]">Hazır mısınız?</span>',
  ctaSubtitle = "Dijitalde büyümek için ilk adımı atın. Uzman ekibimizle ücretsiz danışmanlık için formu doldurun.",
  ctaButtonText = "Ücretsiz Teklif Alın",
  brandName = 'Bey <span class="text-[#ffd76e]">Digital</span> Media',
  brandTagline = "Dijitalde Büyüyoruz.",
  footerLinks = defaultFooterLinks,
  contactEmail = "info@beydigitalmedia.com",
  contactPhone = "+90 544 376 03 39",
  bottomText = `© ${new Date().getFullYear()} Bey Digital Media. Tüm hakları saklıdır.`,
}: FooterProps) {
  return (
    <footer id="contact" className="bg-paper text-ink relative">
      <PerforationDivider tone="paper-alt" />

      {/* CTA / form bölümü */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <SerialStrip serial="C-01" label="İletişim" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-ink"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(ctaTitle) }}
            />
            <p className="text-pencil text-lg mb-8 max-w-xl">{ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink transition-colors break-all"
              >
                <Mail size={18} className="shrink-0" aria-hidden="true" />
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
                className="inline-flex items-center gap-2 font-mono text-sm text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink transition-colors"
              >
                <Phone size={18} className="shrink-0" aria-hidden="true" />
                {contactPhone}
              </a>
            </div>
          </div>

          {/* Teklif formu belgesi */}
          <div className="rounded-[3px] border border-ink/40 bg-paper shadow-doc p-5 sm:p-8">
            <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil mb-6">
              <span>Teklif Formu</span>
              <span aria-hidden="true" className="dots-leader" />
              <span>BDM-{new Date().getFullYear()}</span>
            </div>
            <h3 className="text-xl font-bold text-ink mb-6">{ctaButtonText}</h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Kolofon */}
      <div className="border-t border-ink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Marka */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[3px] bg-ink">
                  <Image
                    src="/beydigital_logo.webp"
                    alt=""
                    width={48}
                    height={48}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <div
                  className="text-lg font-bold text-ink"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(brandName) }}
                />
              </div>
              <p className="text-pencil text-sm mb-6">{brandTagline}</p>
              <div className="flex gap-3">
                {footerLinks.social?.map((social) => {
                  const IconComponent = iconMap[social.platform];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 w-9 rounded-[3px] border border-ink/40 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
                      aria-label={social.label}
                    >
                      {IconComponent ? <IconComponent size={18} /> : null}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Hizmetler */}
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil border-b border-ink/20 pb-2 mb-4">
                Hizmetler
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.services?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/85 hover:text-ink hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Şirket */}
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil border-b border-ink/20 pb-2 mb-4">
                Şirket
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/85 hover:text-ink hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim */}
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil border-b border-ink/20 pb-2 mb-4">
                İletişim
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm text-ink/85 hover:text-ink hover:underline underline-offset-4 transition-colors break-all"
                  >
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, "")}`}
                    onClick={(e) => {
                      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
                      if (!isMobile) {
                        e.preventDefault();
                        window.open(`https://wa.me/${contactPhone.replace(/\D/g, "")}`, "_blank");
                      }
                    }}
                    className="text-sm text-ink/85 hover:text-ink hover:underline underline-offset-4 transition-colors"
                  >
                    {contactPhone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-dashed border-ink/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-pencil text-center sm:text-left">{bottomText}</p>
          <SignatureLine name="Yiğit Emre Balaban" caption="İmza" className="scale-90 origin-bottom-right" />
        </div>
      </div>
    </footer>
  );
}
