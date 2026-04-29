import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://beydigitalmedia.com";

  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolyo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // Blog yazıları (dinamik)
  // Gerçek uygulamada bu verileri CMS'den veya veritabanından çekmelisiniz
  const blogPosts = [
    {
      slug: "2024-sosyal-medya-trendleri",
      lastModified: new Date("2024-03-15"),
    },
    {
      slug: "seo-teknik-optimizasyon-rehberi",
      lastModified: new Date("2024-03-10"),
    },
    {
      slug: "renk-psikolojisi-marka-kimligi",
      lastModified: new Date("2024-03-05"),
    },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Portfolyo projeleri (dinamik)
  const portfolioProjects = [
    { slug: "luxe-boutique", lastModified: new Date("2024-03-01") },
    { slug: "techstart", lastModified: new Date("2024-02-28") },
    { slug: "organik-yasam", lastModified: new Date("2024-02-25") },
    { slug: "mimarlik-atolyesi", lastModified: new Date("2024-02-20") },
    { slug: "fitness-pro", lastModified: new Date("2024-02-15") },
    { slug: "kahve-dunyasi", lastModified: new Date("2024-02-10") },
  ];

  const portfolioPages = portfolioProjects.map((project) => ({
    url: `${baseUrl}/portfolyo/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}
