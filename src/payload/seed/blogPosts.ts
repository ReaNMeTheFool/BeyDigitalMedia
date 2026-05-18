import type { Payload } from "payload";
import { richText } from "./richText";

export async function seedBlogPosts(payload: Payload) {
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
}
