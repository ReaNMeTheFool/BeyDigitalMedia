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
  entries += buildUrlEntry(`${baseUrl}/hizmetler`, new Date(), "weekly", 0.8);
  entries += buildUrlEntry(`${baseUrl}/portfolyo`, new Date(), "weekly", 0.8);
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

    for (const page of pagesResult.docs) {
      const slug = (page as any).slug;
      const updatedAt = (page as any).updatedAt;
      if (slug) {
        entries += buildUrlEntry(
          `${baseUrl}/${slug}`,
          updatedAt ? new Date(updatedAt) : new Date(),
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

    for (const service of servicesResult.docs) {
      const slug = (service as any).slug;
      const updatedAt = (service as any).updatedAt;
      if (slug) {
        entries += buildUrlEntry(
          `${baseUrl}/${slug}`,
          updatedAt ? new Date(updatedAt) : new Date(),
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

    for (const post of blogResult.docs) {
      const slug = (post as any).slug;
      const publishedDate = (post as any).publishedDate;
      if (slug) {
        entries += buildUrlEntry(
          `${baseUrl}/blog/${slug}`,
          publishedDate ? new Date(publishedDate) : new Date(),
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

    for (const project of projectsResult.docs) {
      const slug = (project as any).slug;
      const updatedAt = (project as any).updatedAt;
      if (slug) {
        entries += buildUrlEntry(
          `${baseUrl}/portfolyo/${slug}`,
          updatedAt ? new Date(updatedAt) : new Date(),
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
