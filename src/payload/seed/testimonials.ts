import type { Payload } from "payload";

export async function seedTestimonials(payload: Payload) {
  const testimonials = [
    {
      name: "Mehmet",
      company: "Lada Wedding",
      rating: 5,
      text: "Bey Digital Media ile çalışmak mükemmel bir deneyimdi. E-ticaret sitemizin satışları %150 arttı. SEO ve sosyal medya stratejileri gerçekten işe yarıyor.",
    },
    {
      name: "Erenalp Guzgun",
      company: "Guzgun Tekstil",
      rating: 5,
      text: "Uzun zamandır sosyal medyada böyle düzenli ve yaratıcı içerikler görmemiştik. Bey Digital Media sayesinde sayfamız adeta kendini buldu diyebiliriz 😊 Her detayı özenle takip etmeleri ve bizi biz gibi yansıtmaları işin en güzel yanı. Emeğinize sağlık!",
    },
    {
      name: "Erkutay Torun",
      company: "Emfa Pet",
      rating: 5,
      text: "Kurumsal web sitemizin yeniden tasarımında gösterdikleri profesyonellik takdire şayan. Modern, hızlı ve kullanıcı dostu bir site oldu.",
    },
    {
      name: "Murat Adlığ",
      company: "Nil Forklift",
      rating: 5,
      text: "Sosyal medya yönetimi konusunda gerçekten profesyonel bir ekip. Sayfamızın etkileşimi kısa sürede ciddi oranda arttı. Tavsiye ederim.",
    },
    {
      name: "Ebru Özpehlivan",
      company: "İşbir Yatak",
      rating: 5,
      text: "Logo ve kurumsal kimlik çalışmamız tam istediğimiz gibi oldu. Yiğit Bey'in renk psikolojisine hakimiyeti projemizi bir üst seviyeye taşıdı.",
    },
  ];

  for (const t of testimonials) {
    try {
      const existing = await payload.find({
        collection: "testimonials",
        where: { name: { equals: t.name } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "testimonials",
          data: {
            name: t.name,
            company: t.company,
            rating: t.rating,
            text: t.text,
          },
        });
        console.log(`✅ Testimonial: ${t.name}`);
      } else {
        console.log(`ℹ️ Testimonial exists: ${t.name}`);
      }
    } catch (e) {
      console.error(`❌ Testimonial ${t.name} error:`, e);
    }
  }
}
