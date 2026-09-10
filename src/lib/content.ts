import {
  getDB,
  mediaId,
  mediaRef,
  num,
  parseJson,
  resolveMediaMap,
  rowToCategory,
  rowToContactSubmission,
  rowToFaq,
  rowToPage,
  rowToProject,
  rowToService,
  rowToTestimonial,
  rowsToBlogPosts,
  str,
} from "@/lib/db";
import {
  defaultFooter,
  defaultNavigation,
  defaultSiteSettings,
} from "@/lib/content-defaults";
import type {
  Category,
  ContactSubmission,
  Footer,
  MediaItem,
  MediaRef,
  Navigation,
  Page,
  Service,
  SiteSettings,
  Testimonial,
  Faq,
  BlogPost,
  Project,
} from "@/types/content";

type Row = Record<string, unknown>;

/**
 * D1 icerik katmani. Herkese okuma fonksiyonlari bos/bozuk veritabaninda
 * hata firlatmaz; admin fonksiyonlari boolean/donendeger ile sonuc bildirir.
 */

async function getSettingsRow(key: string): Promise<Row | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT value FROM settings WHERE key = ?")
      .bind(key)
      .first<Row>();
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await getSettingsRow("siteSettings");
    if (!row) return defaultSiteSettings;
    // JSON'da logo/favicon medya id'si olarak saklanir (sayi)
    const stored = parseJson<Record<string, unknown>>(row.value, {});
    const { logo, favicon, ...rest } = stored;
    const restSettings = rest as Partial<SiteSettings>;
    let logoRef: MediaRef | null = null;
    let faviconRef: MediaRef | null = null;
    try {
      const ids = [num(logo), num(favicon)].filter((v): v is number => v != null);
      const map = await resolveMediaMap(ids);
      logoRef = mediaRef(map, logo);
      faviconRef = mediaRef(map, favicon);
    } catch {
      // medya cozumleme basarisizsa null kalir
    }
    return {
      ...defaultSiteSettings,
      ...restSettings,
      theme: { ...defaultSiteSettings.theme, ...restSettings.theme },
      logo: logoRef,
      favicon: faviconRef,
    };
  } catch {
    return defaultSiteSettings;
  }
}

export async function getNavigation(): Promise<Navigation> {
  try {
    const row = await getSettingsRow("navigation");
    if (!row) return defaultNavigation;
    const stored = parseJson<Partial<Navigation>>(row.value, {});
    return { ...defaultNavigation, ...stored };
  } catch {
    return defaultNavigation;
  }
}

export async function getFooter(): Promise<Footer> {
  try {
    const row = await getSettingsRow("footer");
    if (!row) return defaultFooter;
    const stored = parseJson<Partial<Footer>>(row.value, {});
    return { ...defaultFooter, ...stored };
  } catch {
    return defaultFooter;
  }
}

export async function getHomePage(): Promise<Page | null> {
  return getPage("home");
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT * FROM pages WHERE slug = ?")
      .bind(slug)
      .first<Row>();
    if (!row) return null;
    return await rowToPage(row);
  } catch {
    return null;
  }
}

export async function listServices(): Promise<Service[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM services ORDER BY sort_order ASC, id ASC")
      .all<Row>();
    const rows = results ?? [];
    const mediaMap = await resolveMediaMap(
      rows.map((row) => num(row.icon_media_id)).filter((v): v is number => v != null),
    );
    return rows.map((row) => rowToService(row, mediaMap));
  } catch {
    return [];
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT * FROM services WHERE slug = ?")
      .bind(slug)
      .first<Row>();
    if (!row) return null;
    const mediaMap = await resolveMediaMap(
      num(row.icon_media_id) != null ? [num(row.icon_media_id) as number] : [],
    );
    return rowToService(row, mediaMap);
  } catch {
    return null;
  }
}

export async function listProjects(): Promise<Project[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM projects ORDER BY sort_order ASC, id ASC")
      .all<Row>();
    const rows = results ?? [];
    const mediaMap = await resolveMediaMap(
      rows.map((row) => num(row.logo_media_id)).filter((v): v is number => v != null),
    );
    return rows.map((row) => rowToProject(row, mediaMap));
  } catch {
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT * FROM projects WHERE slug = ?")
      .bind(slug)
      .first<Row>();
    if (!row) return null;
    const mediaMap = await resolveMediaMap(
      num(row.logo_media_id) != null ? [num(row.logo_media_id) as number] : [],
    );
    return rowToProject(row, mediaMap);
  } catch {
    return null;
  }
}

export async function listTestimonials(): Promise<Testimonial[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC")
      .all<Row>();
    const rows = results ?? [];
    const mediaMap = await resolveMediaMap(
      rows.map((row) => num(row.image_media_id)).filter((v): v is number => v != null),
    );
    return rows.map((row) => rowToTestimonial(row, mediaMap));
  } catch {
    return [];
  }
}

export async function listFaqs(): Promise<Faq[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC")
      .all<Row>();
    return (results ?? []).map(rowToFaq);
  } catch {
    return [];
  }
}

export async function listBlogPosts(limit = 100): Promise<BlogPost[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM blog_posts ORDER BY published_date DESC LIMIT ?")
      .bind(limit)
      .all<Row>();
    return await rowsToBlogPosts(results ?? []);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT * FROM blog_posts WHERE slug = ?")
      .bind(slug)
      .first<Row>();
    if (!row) return null;
    const [post] = await rowsToBlogPosts([row]);
    return post ?? null;
  } catch {
    return null;
  }
}

export async function listCategories(): Promise<Category[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT id, name, slug FROM categories ORDER BY name ASC")
      .all<Row>();
    return (results ?? []).map(rowToCategory);
  } catch {
    return [];
  }
}

export async function listMedia(): Promise<MediaItem[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT id, filename, url, alt FROM media ORDER BY id DESC")
      .all<Row>();
    return (results ?? []).map((row) => ({
      id: num(row.id) as number,
      filename: str(row.filename),
      url: str(row.url),
      alt: typeof row.alt === "string" ? row.alt : null,
    }));
  } catch {
    return [];
  }
}

export async function getMedia(id: number): Promise<MediaRef | null> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT id, url, alt FROM media WHERE id = ?")
      .bind(id)
      .first<Row>();
    if (!row) return null;
    return {
      id: num(row.id) as number,
      url: str(row.url),
      alt: typeof row.alt === "string" ? row.alt : null,
    };
  } catch {
    return null;
  }
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  ip?: string | null;
}

export async function createContactSubmission(
  input: ContactSubmissionInput,
): Promise<number | null> {
  try {
    const db = getDB();
    const result = await db
      .prepare(
        "INSERT INTO contact_submissions (name, email, phone, service, message, read, ip) VALUES (?, ?, ?, ?, ?, 0, ?)",
      )
      .bind(
        input.name,
        input.email,
        input.phone ?? null,
        input.service ?? null,
        input.message,
        input.ip ?? null,
      )
      .run();
    return result.meta.last_row_id ?? null;
  } catch {
    return null;
  }
}

export async function countRecentSubmissions(ip: string): Promise<number> {
  try {
    const db = getDB();
    const row = await db
      .prepare(
        "SELECT COUNT(*) AS c FROM contact_submissions WHERE ip = ? AND created_at > datetime('now', '-5 minutes')",
      )
      .bind(ip)
      .first<{ c: number }>();
    return row?.c ?? 0;
  } catch {
    return 0;
  }
}

export async function listContactSubmissions(limit = 100): Promise<ContactSubmission[]> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC, id DESC LIMIT ?")
      .bind(limit)
      .all<Row>();
    return (results ?? []).map(rowToContactSubmission);
  } catch {
    return [];
  }
}

export async function markSubmissionRead(id: number, read = true): Promise<boolean> {
  try {
    const db = getDB();
    await db
      .prepare("UPDATE contact_submissions SET read = ? WHERE id = ?")
      .bind(read ? 1 : 0, id)
      .run();
    return true;
  } catch {
    return false;
  }
}

export type ServiceInput = {
  id?: number;
  slug: string;
  title?: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  features?: Service["features"];
  process?: Service["process"];
  metaTitle?: string;
  metaDescription?: string;
  icon?: MediaRef | number | null;
  accentColor?: string;
  order?: number | null;
};

export type ProjectInput = {
  id?: number;
  slug: string;
  title?: string;
  category?: string;
  services?: Project["services"];
  results?: string;
  resultsColor?: string | null;
  logo?: MediaRef | number | null;
  logoScale?: number | null;
  smallTags?: boolean | null;
  color?: string;
  order?: number | null;
};

export type TestimonialInput = {
  id?: number;
  name?: string;
  company?: string;
  role?: string | null;
  rating?: number | null;
  text?: string;
  image?: MediaRef | number | null;
  order?: number | null;
};

export type FaqInput = {
  id?: number;
  question?: string;
  answer?: string;
  order?: number | null;
};

export type BlogPostInput = {
  id?: number;
  slug: string;
  title?: string;
  excerpt?: string;
  content?: string;
  publishedDate?: string;
  category?: Category | number | null;
  featuredImage?: MediaRef | number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export type SettingsKey = "siteSettings" | "navigation" | "footer";

interface UpsertColumn {
  column: string;
  value: unknown;
}

function upsert(
  table: string,
  columns: UpsertColumn[],
  id: number | undefined,
): Promise<number | null> {
  const cols = columns.map((c) => c.column);
  const values = columns.map((c) => c.value);
  if (id != null) {
    const sets = cols.map((c) => `${c} = ?`).join(", ");
    return execWrite(`UPDATE ${table} SET ${sets} WHERE id = ?`, [...values, id]).then(
      (r) => (r.ok ? id : null),
    );
  }
  const placeholders = cols.map(() => "?").join(", ");
  return execWrite(
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})`,
    values,
  ).then((r) => r.id);
}

async function execWrite(
  sql: string,
  values: unknown[],
): Promise<{ ok: boolean; id: number | null }> {
  try {
    const db = getDB();
    const result = await db.prepare(sql).bind(...values).run();
    return { ok: true, id: result.meta.last_row_id ?? null };
  } catch {
    return { ok: false, id: null };
  }
}

export async function upsertService(input: ServiceInput): Promise<number | null> {
  return upsert(
    "services",
    [
      { column: "slug", value: input.slug },
      { column: "title", value: input.title ?? "" },
      { column: "subtitle", value: input.subtitle ?? "" },
      { column: "description", value: input.description ?? "" },
      { column: "long_description", value: input.longDescription ?? "" },
      { column: "features", value: input.features === undefined ? null : JSON.stringify(input.features) },
      { column: "process", value: input.process === undefined ? null : JSON.stringify(input.process) },
      { column: "meta_title", value: input.metaTitle ?? "" },
      { column: "meta_description", value: input.metaDescription ?? "" },
      { column: "icon_media_id", value: mediaId(input.icon) },
      { column: "accent_color", value: input.accentColor ?? "#0040ff" },
      { column: "sort_order", value: input.order ?? 0 },
    ],
    input.id,
  );
}

export async function deleteService(id: number): Promise<boolean> {
  return (await execWrite("DELETE FROM services WHERE id = ?", [id])).ok;
}

export async function upsertProject(input: ProjectInput): Promise<number | null> {
  return upsert(
    "projects",
    [
      { column: "slug", value: input.slug },
      { column: "title", value: input.title ?? "" },
      { column: "category", value: input.category ?? "" },
      {
        column: "services_tags",
        value: input.services === undefined ? null : JSON.stringify(input.services),
      },
      { column: "results", value: input.results ?? "" },
      { column: "results_color", value: input.resultsColor ?? null },
      { column: "logo_media_id", value: mediaId(input.logo) },
      { column: "logo_scale", value: input.logoScale ?? 1 },
      { column: "small_tags", value: input.smallTags ? 1 : 0 },
      { column: "color", value: input.color ?? "" },
      { column: "sort_order", value: input.order ?? 0 },
    ],
    input.id,
  );
}

export async function deleteProject(id: number): Promise<boolean> {
  return (await execWrite("DELETE FROM projects WHERE id = ?", [id])).ok;
}

export async function upsertTestimonial(input: TestimonialInput): Promise<number | null> {
  return upsert(
    "testimonials",
    [
      { column: "name", value: input.name ?? "" },
      { column: "company", value: input.company ?? "" },
      { column: "role", value: input.role ?? null },
      { column: "rating", value: input.rating ?? 5 },
      { column: "text", value: input.text ?? "" },
      { column: "image_media_id", value: mediaId(input.image) },
      { column: "sort_order", value: input.order ?? 0 },
    ],
    input.id,
  );
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  return (await execWrite("DELETE FROM testimonials WHERE id = ?", [id])).ok;
}

export async function upsertFaq(input: FaqInput): Promise<number | null> {
  return upsert(
    "faqs",
    [
      { column: "question", value: input.question ?? "" },
      { column: "answer", value: input.answer ?? "" },
      { column: "sort_order", value: input.order ?? 0 },
    ],
    input.id,
  );
}

export async function deleteFaq(id: number): Promise<boolean> {
  return (await execWrite("DELETE FROM faqs WHERE id = ?", [id])).ok;
}

export async function upsertBlogPost(input: BlogPostInput): Promise<number | null> {
  return upsert(
    "blog_posts",
    [
      { column: "slug", value: input.slug },
      { column: "title", value: input.title ?? "" },
      { column: "excerpt", value: input.excerpt ?? "" },
      { column: "content", value: input.content ?? "" },
      { column: "published_date", value: input.publishedDate ?? new Date().toISOString().slice(0, 10) },
      {
        column: "category_id",
        value: typeof input.category === "number" ? input.category : input.category?.id ?? null,
      },
      { column: "featured_image_media_id", value: mediaId(input.featuredImage) },
      { column: "meta_title", value: input.metaTitle ?? null },
      { column: "meta_description", value: input.metaDescription ?? null },
    ],
    input.id,
  );
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  return (await execWrite("DELETE FROM blog_posts WHERE id = ?", [id])).ok;
}

export async function upsertSettings(
  key: SettingsKey,
  value: SiteSettings | Navigation | Footer,
): Promise<boolean> {
  try {
    const db = getDB();
    await db
      .prepare(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      )
      .bind(key, JSON.stringify(value))
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function createMedia(input: {
  filename: string;
  url: string;
  alt?: string | null;
}): Promise<MediaRef | null> {
  const result = await execWrite(
    "INSERT INTO media (filename, url, alt) VALUES (?, ?, ?)",
    [input.filename, input.url, input.alt ?? null],
  );
  const id = result.ok ? result.id : null;
  if (id == null) return null;
  return { id, url: input.url, alt: input.alt ?? null };
}

export type ReorderTable = "services" | "projects" | "testimonials" | "faqs";

export async function reorder(table: ReorderTable, ids: number[]): Promise<boolean> {
  try {
    const db = getDB();
    const stmt = db.prepare(`UPDATE ${table} SET sort_order = ? WHERE id = ?`);
    const results = await db.batch(
      ids.map((id, index) => stmt.bind(index, id)),
    );
    return results.every((r) => r.success);
  } catch {
    return false;
  }
}
