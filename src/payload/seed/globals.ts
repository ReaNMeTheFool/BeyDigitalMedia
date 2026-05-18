import type { Payload } from "payload";

export async function seedGlobals(payload: Payload) {
  // 1. SiteSettings
  try {
    const existing = await payload.findGlobal({
      slug: "siteSettings",
    });
    if (!existing) {
      await payload.updateGlobal({
        slug: "siteSettings",
        data: {
          siteName: "Bey Digital Media",
          tagline: "Dijital Pazarlama Ajansi",
          contactEmail: "info@beydigitalmedia.com",
        },
      });
      console.log("✅ SiteSettings created");
    } else {
      console.log("ℹ️ SiteSettings already exists");
    }
  } catch (e) {
    console.error("❌ SiteSettings error:", e);
  }

  // 2. Navigation
  try {
    const existing = await payload.findGlobal({
      slug: "navigation",
    });
    if (!existing) {
      await payload.updateGlobal({
        slug: "navigation",
        data: {
          links: [
            { label: "Hizmetler", href: "#services", order: 1 },
            { label: "Portfolyo", href: "#portfolio", order: 2 },
            { label: "Hakkımızda", href: "#about", order: 3 },
            { label: "Blog", href: "/blog", order: 4 },
            { label: "İletişim", href: "#contact", order: 5 },
          ],
          ctaLabel: "Ücretsiz Teklif Al",
          ctaHref: "#contact",
        },
      });
      console.log("✅ Navigation created");
    } else {
      console.log("ℹ️ Navigation already exists");
    }
  } catch (e) {
    console.error("❌ Navigation error:", e);
  }

  // 3. Footer
  try {
    const existing = await payload.findGlobal({
      slug: "footer",
    });
    if (!existing) {
      await payload.updateGlobal({
        slug: "footer",
        data: {
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
          bottomText: "© 2024 Bey Digital Media. Tüm hakları saklıdır.",
          showNewsletter: false,
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
                { label: "Hakkımızda", href: "#about" },
                { label: "Portfolyo", href: "/portfolyo" },
                { label: "SSS", href: "#faq" },
                { label: "İletişim", href: "/iletisim" },
              ],
            },
          ],
        },
      });
      console.log("✅ Footer created");
    } else {
      console.log("ℹ️ Footer already exists");
    }
  } catch (e) {
    console.error("❌ Footer error:", e);
  }
}
