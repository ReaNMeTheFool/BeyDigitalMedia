import { getPayload } from "payload";
import config from "@payload-config";
import servicesData from "../lib/services-data";

function richText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text }],
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

async function seed() {
  const payload = await getPayload({ config });

  console.log("🌱 Seeding started...");

  // 1. Admin user
  try {
    // Önce username ile ara
    const existingByUsername = await payload.find({
      collection: "users",
      where: { username: { equals: "admin" } },
      limit: 1,
    });
    if (existingByUsername.docs.length === 0) {
      // Eski email-based admin var mı kontrol et ve güncelle
      const existingByEmail = await payload.find({
        collection: "users",
        where: { email: { equals: "admin@beydigitalmedia.com" } },
        limit: 1,
      });
      if (existingByEmail.docs.length > 0) {
        const userId = existingByEmail.docs[0].id;
        await payload.update({
          collection: "users",
          id: userId,
          data: {
            username: "admin",
            password: "admin123",
          },
        });
        console.log("✅ Admin user updated with username: admin");
      } else {
        await payload.create({
          collection: "users",
          data: {
            username: "admin",
            password: "admin123",
            name: "Admin",
            role: "admin",
          },
        });
        console.log("✅ Admin user created (username: admin)");
      }
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (e) {
    console.error("❌ Admin user error:", e);
  }

  // 2. Services
  for (const [slug, service] of Object.entries(servicesData)) {
    try {
      const existing = await payload.find({
        collection: "services",
        where: { slug: { equals: slug } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "services",
          data: {
            slug: service.slug,
            title: service.title,
            subtitle: service.subtitle,
            description: service.description,
            longDescription: richText(service.longDescription.join("\n\n")),
            features: service.features,
            process: service.process,
            accentColor: service.accentColor,
            metaTitle: service.metaTitle,
            metaDescription: service.metaDescription,
          },
        });
        console.log(`✅ Service: ${service.title}`);
      } else {
        console.log(`ℹ️ Service exists: ${service.title}`);
      }
    } catch (e) {
      console.error(`❌ Service ${slug} error:`, e);
    }
  }

  // 3. Blog Posts
  const blogPosts = [
    {
      slug: "sosyal-medya-trendleri-2024",
      title: "2024'te Sosyal Medya Trendleri: Markalar İçin Rehber",
      excerpt:
        "Yapay zeka destekli içerik üretiminden mikro-influencer pazarlamasına, bu yıl sosyal medyada öne çıkacak trendleri keşfedin.",
      content:
        "Sosyal medya dünyası her geçen gün hızla değişiyor. 2024 yılında markaların takip etmesi gereken en önemli trendleri derledik...",
      category: "Sosyal Medya",
      publishedDate: "2024-03-15T00:00:00.000Z",
    },
    {
      slug: "seo-teknik-optimizasyon",
      title: "SEO'da Başarı İçin Teknik Optimizasyon Rehberi",
      excerpt:
        "Web sitenizin arama motorlarında üst sıralarda yer alması için gereken teknik SEO adımlarını detaylıca inceliyoruz.",
      content:
        "Teknik SEO, web sitenizin arama motorları tarafından kolayca taranabilir ve indekslenebilir olmasını sağlayan temel yapı taşıdır...",
      category: "SEO",
      publishedDate: "2024-03-10T00:00:00.000Z",
    },
    {
      slug: "renk-psikolojisi",
      title: "Marka Kimliğinde Renk Psikolojisinin Önemi",
      excerpt:
        "Doğru renk seçimi markanızın algısını nasıl etkiler? Renklerin tüketici davranışları üzerindeki etkisini keşfedin.",
      content:
        "Renkler, markanızın kimliğinin en önemli parçalarından biridir. Tüketicilerin markanızı algılama şeklini doğrudan etkiler...",
      category: "Tasarım",
      publishedDate: "2024-03-05T00:00:00.000Z",
    },
  ];

  for (const post of blogPosts) {
    try {
      const existing = await payload.find({
        collection: "blogPosts",
        where: { slug: { equals: post.slug } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        let categoryId = null;
        const catResult = await payload.find({
          collection: "categories",
          where: { name: { equals: post.category } },
          limit: 1,
        });
        if (catResult.docs.length === 0) {
          const newCat = await payload.create({
            collection: "categories",
            data: {
              name: post.category,
              slug: post.category.toLowerCase().replace(/\s+/g, "-"),
            },
          });
          categoryId = newCat.id;
        } else {
          categoryId = catResult.docs[0].id;
        }

        await payload.create({
          collection: "blogPosts",
          data: {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: richText(post.content),
            category: categoryId,
            publishedDate: post.publishedDate,
          },
        });
        console.log(`✅ Blog post: ${post.title}`);
      } else {
        console.log(`ℹ️ Blog post exists: ${post.title}`);
      }
    } catch (e) {
      console.error(`❌ Blog post ${post.slug} error:`, e);
    }
  }

  // 4. Projects
  const projects = [
    {
      slug: "guzgun-tekstil",
      title: "Guzgun Tekstil",
      category: "Dijital Pazarlama",
      services: [
        { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
        { label: "Meta Ads", slug: "meta-ads" },
        { label: "Web Tasarım", slug: "web-tasarim" },
        { label: "Google Ads", slug: "google-ads", breakBefore: true },
        { label: "SEO", slug: "seo" },
      ],
      color: "from-emerald-500 to-teal-600",
      results: "Etkileşim Oranı +2000%",
      resultsColor: "#fefefe",
      smallTags: true,
    },
    {
      slug: "isbir-yatak",
      title: "İşbir Yatak",
      category: "Sosyal Medya",
      services: [
        { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
        { label: "Meta Ads", slug: "meta-ads" },
      ],
      color: "from-violet-500 to-purple-600",
      results: "Etkileşim oranı +150%",
      resultsColor: "#d93b38",
    },
    {
      slug: "lada-wedding",
      title: "Lada Wedding",
      category: "Reklam",
      services: [{ label: "Meta Ads", slug: "meta-ads" }],
      color: "from-rose-500 to-pink-600",
      results: "Dönüşüm oranı +300%",
    },
    {
      slug: "nil-forklift",
      title: "Nil Forklift",
      category: "Sosyal Medya",
      services: [
        { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
        { label: "Meta Ads", slug: "meta-ads" },
      ],
      color: "from-amber-500 to-orange-600",
      results: "Etkileşim Oranı +200%",
      resultsColor: "#f59e0b",
    },
    {
      slug: "emfa-pet",
      title: "Emfa Pet",
      category: "Sosyal Medya",
      services: [
        { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
        { label: "Meta Ads", slug: "meta-ads" },
      ],
      color: "from-cyan-500 to-blue-600",
      results: "Etkileşim Oranı +500%",
      logoScale: 1.35,
      resultsColor: "#fc031c",
    },
  ];

  for (const project of projects) {
    try {
      const existing = await payload.find({
        collection: "projects",
        where: { slug: { equals: project.slug } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "projects",
          data: {
            slug: project.slug,
            title: project.title,
            category: project.category,
            services: project.services,
            color: project.color,
            results: project.results,
            resultsColor: project.resultsColor,
            smallTags: project.smallTags,
          },
        });
        console.log(`✅ Project: ${project.title}`);
      } else {
        console.log(`ℹ️ Project exists: ${project.title}`);
      }
    } catch (e) {
      console.error(`❌ Project ${project.slug} error:`, e);
    }
  }

  // 5. Testimonials
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

  // 6. FAQs
  const faqs = [
    {
      question:
        "Sosyal medya yönetimi ve AI otomasyonu markama nasıl entegre ediliyor?",
      answer:
        "Geleneksel içerik üretiminin ötesine geçiyoruz. Markanızın dijital varlığını inşa ederken, hedef kitlenizle güçlü ve organik bir bağ kuracak stratejiler geliştiriyoruz. Aynı zamanda operasyonlarınızı yormayacak zeki chatbotlar ve otomasyon algoritmalarıyla etkileşimi 7/24 sürdürülebilir bir noktaya taşıyoruz.",
    },
    {
      question:
        "Meta Ads ve Google Ads yönetiminde nasıl bir strateji izliyorsunuz?",
      answer:
        "Bütçenizi rastgele yakmıyoruz. Veri bilimi ve ileri düzey hedefleme yöntemlerini kullanarak doğrudan satın alma eğilimi yüksek kitleleri tespit ediyoruz. Amacımız sadece görünürlük değil, markanızı sektör lideri konumuna taşıyacak ve maksimum ROAS'ı elde etmenizi sağlayacak kurgular oluşturmaktır.",
    },
    {
      question: "Web tasarım süreçlerinizde nelere dikkat ediyorsunuz?",
      answer:
        "Kullanıcıyı yoran, hantal şablonlar yerine; modern, pürüzsüz animasyonlara sahip ve kullanıcı dostu tasarımlar geliştiriyoruz. Her bir pikseli kurumsal kimliğinize uygun işliyor, ziyaretçinin sitenize girdiği an premium bir deneyim yaşamasını hedefliyoruz. Arayüzlerimiz, tamamen sizin dijital merkeziniz olarak kurgulanır.",
    },
    {
      question:
        "SEO (Arama Motoru Optimizasyonu) çalışmalarınız ne zaman etki eder?",
      answer:
        "Algoritmaları manipüle eden geçici taktiklerle değil, uzun vadeli ve sağlam bir otorite inşası ile ilerliyoruz. Arama sorgularında otoritenizi sabitlemek, sektörün rekabetine göre ortalama 1-6 ay sürer. Doğru stratejiler kurgulandığında, arama sonuçlarında sarsılmaz bir konuma ulaşırsınız.",
    },
    {
      question: "Raporlama süreci ve şeffaflık vizyonunuz nedir?",
      answer:
        "Sadece kalıplaşmış vaatler değil, salt veri sunuyoruz. Erişim, ROAS, dönüşüm oranları ve büyüme trendlerini size net ve şeffaf grafiklerle raporluyoruz. Neyin iyi dönüştüğünü, hangi hamlenin optimize edilmesi gerektiğini gizlilik perdesi olmadan göreceksiniz. Çünkü markanızın gelişimi, başarımızın yegane kanıtıdır.",
    },
    {
      question:
        "Tüm ihtiyacımı tek bir yer (Bey Digital Media) ile çözebilir miyim?",
      answer:
        "Kesinlikle. Logo tasarımından yapay zeka yapılarına, performans pazarlamasından kompleks web yazılımlarına kadar dijital varlığınız için gereken her şeyi tek bir yapı içinde sunuyoruz. Dağınık sistemler yerine, tüm platformların birbiriyle konuştuğu kusursuz bir ekosistem inşa ediyoruz.",
    },
  ];

  for (const f of faqs) {
    try {
      const existing = await payload.find({
        collection: "faqs",
        where: { question: { equals: f.question } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "faqs",
          data: {
            question: f.question,
            answer: richText(f.answer),
          },
        });
        console.log(`✅ FAQ: ${f.question.slice(0, 40)}...`);
      } else {
        console.log(`ℹ️ FAQ exists: ${f.question.slice(0, 40)}...`);
      }
    } catch (e) {
      console.error(`❌ FAQ error:`, e);
    }
  }

  // 7. Home Page
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
          metaTitle: "Bey Digital Media | Bursa Dijital Pazarlama Ajansı",
          metaDescription:
            "Bursa merkezli dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
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

  // 8. Globals - SiteSettings
  try {
    const existing = await payload.findGlobal({
      slug: "siteSettings",
    });
    if (!existing) {
      await payload.updateGlobal({
        slug: "siteSettings",
        data: {
          siteName: "Bey Digital Media",
          tagline: "Bursa Dijital Pazarlama Ajansı",
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

  // 9. Globals - Navigation
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

  // 10. Globals - Footer
  try {
    const existing = await payload.findGlobal({
      slug: "footer",
    });
    if (!existing) {
      await payload.updateGlobal({
        slug: "footer",
        data: {
          bottomText: "© 2024 Bey Digital Media. Tüm hakları saklıdır.",
          showNewsletter: false,
        },
      });
      console.log("✅ Footer created");
    } else {
      console.log("ℹ️ Footer already exists");
    }
  } catch (e) {
    console.error("❌ Footer error:", e);
  }

  console.log("🌱 Seeding completed!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
