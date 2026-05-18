import type { Payload } from "payload";
import { richText } from "./richText";

export async function seedHomePage(payload: Payload) {
  try {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "pages",
        data: {
          slug: "home",
          title: "Ana Sayfa",
          metaTitle: "Bey Digital Media | Dijital Pazarlama Ajansi",
          metaDescription:
            "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.",
          content: [
            {
              blockType: "hero",
              title: "Dijitalde Büyüyün",
              subtitle: "Markanızı dijital dünyada büyütün",
              description:
                "Bey Digital Media olarak markanızı dijital dünyada büyütmek için Meta Ads, Google Ads, Sosyal Medya Yönetimi ve daha fazlasını sunuyoruz.",
              primaryCta: { text: "Ücretsiz Teklif Al", link: "#contact" },
              secondaryCta: { text: "Hizmetlerimiz", link: "#services" },
            },
            { blockType: "marquee", items: [{ text: "Sosyal Medya" }, { text: "Meta Ads" }, { text: "Google Ads" }, { text: "Web Tasarım" }, { text: "SEO" }, { text: "Logo Tasarımı" }, { text: "Kurumsal Kimlik" }, { text: "Dijital Büyüme" }] },
            { blockType: "servicesGrid", showAllServices: true },
            { blockType: "portfolioSlider" },
            { blockType: "testimonialsCarousel" },
            { blockType: "faqAccordion", showAllFaqs: true },
            { blockType: "cta", title: "Dijital Büyüme", ctaText: "Ücretsiz Teklif Al", ctaLink: "#contact" },
            { blockType: "about", title: "Hakkımızda", content: richText("Bey Digital Media olarak 8 yılı aşkın süredir markaların dijital dünyada büyümesine yardımcı oluyoruz.") },
          ],
        },
      });
      console.log("✅ Home page created");
    } else {
      console.log("ℹ️ Home page already exists");
    }
  } catch (e) {
    console.error("❌ Home page error:", e);
  }
}
