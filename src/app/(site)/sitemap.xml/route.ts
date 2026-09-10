import { listBlogPosts, listProjects, listServices } from "@/lib/content";
import { getDB } from "@/lib/db";

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
  let entries = "";

  // Statik sayfalar
  entries += buildUrlEntry(baseUrl, new Date(), "daily", 1.0);
  entries += buildUrlEntry(`${baseUrl}/hakkimizda`, new Date(), "weekly", 0.8);
  entries += buildUrlEntry(`${baseUrl}/blog`, new Date(), "daily", 0.9);
  entries += buildUrlEntry(`${baseUrl}/iletisim`, new Date(), "monthly", 0.6);

  // Pages tablosundan dinamik sayfalar (home haric); kayit tarihleri
  // D1'de tutulmadigi icin lastmod verilmez
  try {
    const { results } = await getDB()
      .prepare("SELECT slug FROM pages WHERE slug <> 'home' ORDER BY id ASC")
      .all<{ slug?: string }>();

    for (const page of results ?? []) {
      if (page.slug) {
        entries += buildUrlEntry(`${baseUrl}/${page.slug}`, undefined, "weekly", 0.7);
      }
    }
  } catch {
    // sayfa kayitlarina erisilemezse atla
  }

  // Services tablosu
  for (const service of await listServices()) {
    if (service.slug) {
      entries += buildUrlEntry(
        `${baseUrl}/${service.slug}`,
        undefined,
        "weekly",
        0.8
      );
    }
  }

  // Blog yazilari
  for (const post of await listBlogPosts(1000)) {
    if (post.slug) {
      entries += buildUrlEntry(
        `${baseUrl}/blog/${post.slug}`,
        post.publishedDate ? new Date(post.publishedDate) : undefined,
        "weekly",
        0.7
      );
    }
  }

  // Portfolyo projeleri
  for (const project of await listProjects()) {
    if (project.slug) {
      entries += buildUrlEntry(
        `${baseUrl}/portfolyo/${project.slug}`,
        undefined,
        "monthly",
        0.6
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
