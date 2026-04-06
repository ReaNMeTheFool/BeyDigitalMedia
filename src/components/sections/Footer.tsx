"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import ContactForm from "../ui/ContactForm";

const footerLinks = {
  services: [
    { label: "Sosyal Medya Yönetimi", href: "#services" },
    { label: "Meta Ads", href: "#services" },
    { label: "Google Ads", href: "#services" },
    { label: "Web Tasarım", href: "#services" },
    { label: "SEO", href: "#services" },
    { label: "Logo & Kurumsal Kimlik", href: "#services" },
  ],
  company: [
    { label: "Hakkımızda", href: "#about" },
    { label: "Portfolyo", href: "#portfolio" },
    { label: "SSS", href: "#faq" },
    { label: "İletişim", href: "#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/beydigitalmedia", icon: Instagram },
  ],
};

export default function Footer() {
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Dijital <span className="text-[#ffd76e]">Dönüşüm</span> İçin{" "}<br />
                <span style={{ color: "#04a5e5" }}>Hazır mısınız?</span>
              </h2>
              <p className="text-[#cdd6f4]/90 text-lg mb-8">
                Markanızı bir üst seviyeye taşımak için hemen bizimle iletişime geçin.
                Ücretsiz danışmanlık için formu doldurun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:Beydigitalmedia@gmail.com"
                  className="inline-flex items-center gap-2 text-[#cdd6f4] hover:text-[#ffd76e] transition-colors"
                >
                  <Mail size={20} />
                  Beydigitalmedia@gmail.com
                </a>
                <a
                  href="tel:+905443760339"
                  className="inline-flex items-center gap-2 text-[#cdd6f4] hover:text-[#ffd76e] transition-colors"
                >
                  <Phone size={20} />
                  +90 544 376 03 39
                </a>
              </div>
            </div>
            <div className="bg-[#cdd6f4]/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-[#cdd6f4]/10">
              <h3 className="text-xl font-bold mb-6">Ücretsiz Teklif Alın</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              Bey <span className="text-[#ffd76e]">Digital</span> Media
            </div>
            <p className="text-[#cdd6f4]/80 mb-6">
              Built for Digital Growth.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#cdd6f4]/10 rounded-full flex items-center justify-center hover:bg-[#ffd76e] hover:text-[#181825] transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Hizmetler</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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
                <a href="mailto:Beydigitalmedia@gmail.com" className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors">
                  Beydigitalmedia@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#ffd76e] shrink-0" />
                <a href="tel:+905443760339" className="text-[#cdd6f4]/80 hover:text-[#ffd76e] transition-colors">
                  +90 544 376 03 39
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
            © {new Date().getFullYear()} Bey Digital Media. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
