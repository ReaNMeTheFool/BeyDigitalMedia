import type { Payload } from "payload";

export async function seedProjects(payload: Payload) {
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
}
