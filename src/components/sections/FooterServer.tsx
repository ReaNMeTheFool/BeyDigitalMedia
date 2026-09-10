import { getFooter, getSiteSettings } from "@/lib/content";
import Footer from "./Footer";

// Footer.tsx'teki defaultFooterLinks ile aynı içerik.
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

export default async function FooterServer() {
  const footerData = await getFooter();
  const siteSettings = await getSiteSettings();

  const columns = footerData?.columns || [];

  const footerLinks = {
    services:
      columns.find((c) =>
        ["Hizmetler", "Services", "hizmetler", "services"].includes(c.title)
      )?.links?.map((l) => ({ label: l.label, href: l.href })) ||
      defaultFooterLinks.services,
    company:
      columns.find((c) =>
        ["Şirket", "Company", "şirket", "company", "Hakkımızda", "About"].includes(c.title)
      )?.links?.map((l) => ({ label: l.label, href: l.href })) ||
      defaultFooterLinks.company,
    social: (() => {
      const raw = footerData?.socialLinks || siteSettings?.socialLinks;
      if (!raw) return defaultFooterLinks.social;
      const order: Record<string, number> = {
        instagram: 0,
        youtube: 1,
        facebook: 2,
        tiktok: 3,
      };
      const mapped = raw.map((s) => ({
        label: s.platform,
        href: s.url,
        platform: s.platform.toLowerCase(),
      }));
      mapped.sort(
        (a, b) =>
          (order[a.platform] ?? 999) - (order[b.platform] ?? 999)
      );
      return mapped;
    })(),
  };

  return (
    <Footer
      ctaTitle={footerData?.ctaTitle || undefined}
      ctaSubtitle={footerData?.ctaSubtitle || undefined}
      ctaButtonText={footerData?.ctaButtonText || undefined}
      brandName={siteSettings?.siteName || undefined}
      brandTagline={footerData?.brandTagline || undefined}
      footerLinks={footerLinks}
      contactEmail={siteSettings?.contactEmail || undefined}
      contactPhone={siteSettings?.contactPhone || undefined}
      bottomText={footerData?.bottomText || undefined}
    />
  );
}
