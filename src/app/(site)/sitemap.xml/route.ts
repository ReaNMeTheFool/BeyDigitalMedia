import { getPayloadClient } from "@/lib/payload";

const baseUrl = "https://beydigitalmedia.com";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(
  loc: string,
  lastmod?: Date,
  changefreq?: string,
  priority?: number
): string {
  let entry = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n`;
  if (lastmod) {
    entry += `    <lastmod>${lastmod.toISOString()}</lastmod>\n`;
  }
  if (changefreq) {
    entry += `    <changefreq>${changefreq}</changefreq>\n`;
  }
  if (priority !== undefined) {
    entry += `    <priority>${priority.toFixed(1)}</priority>\n`;
  }
  entry += `  </url>\n`;
  return entry;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getPayloadClient();
  let entries = "";

  // Statik sayfalar
  entries += buildUrlEntry(baseUrl, new Date(), "daily", 1.0);
  entries += buildUrlEntry(`${baseUrl}/hakkimizda`, new Date(), "weekly", 0.8);
  entries += buildUrlEntry(`${baseUrl}/blog`, new Date(), "daily", 0.9);
  entries += buildUrlEntry(`${baseUrl}/iletisim`, new Date(), "monthly", 0.6);

  try {
    // Pages koleksiyonundan dinamik sayfalar (home haric)
    const pagesResult = await payload.find({
      collection: "pages",
      limit: 1000,
      where: {
        slug: {
          not_equals: "home",
        },
      },
    });

    for (const page of pagesResult.docs as { slug?: string; updatedAt?: string }[]) {
      if (page.slug) {
        entries += buildUrlEntry(
          `${baseUrl}/${page.slug}`,
          page.updatedAt ? new Date(page.updatedAt) : new Date(),
          "weekly",
          0.7
        );
      }
    }

    // Services koleksiyonu
    const servicesResult = await payload.find({
      collection: "services",
      limit: 1000,
    });

    for (const service of servicesResult.docs as { slug?: string; updatedAt?: string }[]) {
      if (service.slug) {
        entries += buildUrlEntry(
          `${baseUrl}/${service.slug}`,
          service.updatedAt ? new Date(service.updatedAt) : new Date(),
          "weekly",
          0.8
        );
      }
    }

    // Blog yazilari
    const blogResult = await payload.find({
      collection: "blogPosts",
      limit: 1000,
    });

    for (const post of blogResult.docs as { slug?: string; publishedDate?: string }[]) {
      if (post.slug) {
        entries += buildUrlEntry(
          `${baseUrl}/blog/${post.slug}`,
          post.publishedDate ? new Date(post.publishedDate) : new Date(),
          "weekly",
          0.7
        );
      }
    }

    // Portfolyo projeleri
    const projectsResult = await payload.find({
      collection: "projects",
      limit: 1000,
    });

    for (const project of projectsResult.docs as { slug?: string; updatedAt?: string }[]) {
      if (project.slug) {
        entries += buildUrlEntry(
          `${baseUrl}/portfolyo/${project.slug}`,
          project.updatedAt ? new Date(project.updatedAt) : new Date(),
          "monthly",
          0.6
        );
      }
    }
  } catch {
    // CMS'e erisilemezse sadece statik sayfalari dondur
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
