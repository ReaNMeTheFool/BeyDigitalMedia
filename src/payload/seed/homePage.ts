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
          metaTitle: "Bey Digital Media | Dijital Pazarlama Ajansı",
          metaDescription:
            "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.",
          content: [
            {
              blockType: "hero",
              icerik: {
                titlePrefix: "Dijital",
                titleSuffix: "Çözümleri",
                subtitle:
                  "Türkiye'nin önde gelen dijital pazarlama ajansı olarak markanızı büyütmek için buradayız.",
              },
              cta: {
                primaryCta: { text: "Ücretsiz Teklif Al", link: "#contact" },
                secondaryCta: { text: "Hizmetlerimizi Keşfet", link: "#services" },
              },
            },
            { blockType: "marquee", items: [{ text: "Sosyal Medya" }, { text: "Meta Ads" }, { text: "Google Ads" }, { text: "Web Tasarım" }, { text: "SEO" }, { text: "Logo Tasarımı" }, { text: "Kurumsal Kimlik" }, { text: "Dijital Büyüme" }] },
            { blockType: "servicesGrid", sectionTitle: "Hizmetlerimiz", showAllServices: true },
            {
              blockType: "portfolioSlider",
              title: "Gerçek Başarı Hikayeleri",
              subtitle:
                "Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.",
              showAllPortfolios: true,
            },
            { blockType: "testimonialsCarousel", title: "Bizim Hakkımızda Ne Dediler?", showAllTestimonials: true },
            {
              blockType: "faqAccordion",
              title: "Merak Ettikleriniz",
              subtitle:
                "Dijital pazarlama ve hizmetlerimiz hakkında en çok sorulan soruların cevapları.",
              showAllFaqs: true,
            },
            {
              blockType: "cta",
              title: "Dijital Büyüme",
              subtitle: "Markanız için ilk adımı atın.",
              ctaText: "Ücretsiz Teklif Al",
              ctaLink: "#contact",
            },
            {
              blockType: "about",
              title: "Hakkımızda",
              content: richText("Bey Digital Media olarak 8 yılı aşkın süredir markaların dijital dünyada büyümesine yardımcı oluyoruz."),
            },
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
