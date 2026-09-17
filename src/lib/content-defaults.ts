import type { Navigation, SiteSettings, Footer, CtaBlock } from "@/types/content";

/**
 * D1 satirlari eksik oldugunda kullanilan icerik varsayilanlari.
 */

export const defaultSiteSettings: SiteSettings = {
  siteName: "Bey Digital Media",
  tagline: "Dijital Pazarlama Ajansı",
  logo: null,
  favicon: null,
  contactEmail: "info@beydigitalmedia.com",
  contactPhone: null,
  defaultMetaTitle: null,
  defaultMetaDescription: null,
  googleVerification: null,
  theme: {
    primaryColor: "#0040ff",
    accentColor: "#ffd76e",
    surfaceColor: "#1e1e2e",
    backgroundColor: "#181825",
    textColor: "#cdd6f4",
  },
  socialLinks: null,
};

export const defaultNavigation: Navigation = {
  links: null,
  ctaLabel: null,
  ctaHref: null,
};

export const defaultFooter: Footer = {
  ctaTitle:
    'Dijital <span class="text-[#ffd76e]">Dönüşüm</span> İçin <br /><span class="text-[#4c7fff]">Hazır mısınız?</span>',
  ctaSubtitle:
    "Markanızı bir üst seviyeye taşımak için hemen bizimle iletişime geçin. Ücretsiz danışmanlık için formu doldurun.",
  ctaButtonText: "Ücretsiz Teklif Alın",
  columns: [
    {
      title: "Hizmetler",
      links: [
        { label: "Sosyal Medya Yönetimi", href: "/sosyal-medya-yonetimi" },
        { label: "Meta Ads", href: "/meta-ads" },
        { label: "Google Ads", href: "/google-ads" },
        { label: "Web Tasarım", href: "/web-tasarim" },
        { label: "SEO", href: "/seo" },
        { label: "Logo & Kurumsal Kimlik", href: "/logo-tasarimi" },
      ],
    },
    {
      title: "Şirket",
      links: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "Portfolyo", href: "/#portfolio" },
        { label: "SSS", href: "/#faq" },
        { label: "İletişim", href: "/iletisim" },
      ],
    },
  ],
  bottomText: "© Bey Digital Media. Tüm hakları saklıdır.",
  brandTagline: "Dijitalde Büyüyoruz.",
  showNewsletter: false,
  socialLinks: [
    {
      platform: "Instagram",
      url: "https://instagram.com/beydigitalmedia",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@beydigitalmedia",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/beydigitalmedia",
    },
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@beydigitalmedia",
    },
  ],
};

export const defaultHeroIcerik = {
  titlePrefix: "Dijital",
  titleSuffix: "Çözümleri",
  subtitle:
    "Türkiye'nin önde gelen dijital pazarlama ajansı olarak markanızı büyütmek için buradayız.",
};

export const defaultHeroCta = {
  primaryCta: { text: "Ücretsiz Teklif Al", link: "#contact" },
  secondaryCta: { text: "Hizmetlerimizi Keşfet", link: "#services" },
};

export const defaultCtaBlock: Omit<CtaBlock, "blockType"> = {
  title: "Harekete Geçin",
  subtitle: "Markanız için ilk adımı atın.",
  ctaText: "Teklif Al",
  ctaLink: "#contact",
};
