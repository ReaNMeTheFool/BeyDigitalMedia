import { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

const baseUrl = "https://www.beydigitalmedia.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/portfolyo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    // Pages koleksiyonundan dinamik sayfalar (home hariç)
    const pagesResult = await payload.find({
      collection: "pages",
      limit: 1000,
      where: {
        slug: {
          not_equals: "home",
        },
      },
    });

    for (const page of pagesResult.docs) {
      const slug = (page as any).slug;
      const updatedAt = (page as any).updatedAt;
      if (slug) {
        routes.push({
          url: `${baseUrl}/${slug}`,
          lastModified: updatedAt ? new Date(updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }

    // Blog yazıları
    const blogResult = await payload.find({
      collection: "blogPosts",
      limit: 1000,
    });

    for (const post of blogResult.docs) {
      const slug = (post as any).slug;
      const publishedDate = (post as any).publishedDate;
      if (slug) {
        routes.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: publishedDate ? new Date(publishedDate) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }

    // Portfolyo projeleri
    const projectsResult = await payload.find({
      collection: "projects",
      limit: 1000,
    });

    for (const project of projectsResult.docs) {
      const slug = (project as any).slug;
      const updatedAt = (project as any).updatedAt;
      if (slug) {
        routes.push({
          url: `${baseUrl}/portfolyo/${slug}`,
          lastModified: updatedAt ? new Date(updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // CMS'e erişilemezse sadece statik sayfaları döndür
  }

  return routes;
}
