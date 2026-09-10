/// <reference types="@cloudflare/workers-types" />
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  BlogPost,
  Category,
  ContactSubmission,
  Faq,
  MediaRef,
  Page,
  PageBlock,
  Project,
  Service,
  Testimonial,
} from "@/types/content";

/**
 * Cloudflare binding erisimi. D1 -> DB, R2 -> MEDIA (wrangler.jsonc).
 */

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    MEDIA: R2Bucket;
  }
}

export function getDB(): D1Database {
  return getCloudflareContext().env.DB;
}

export function getMEDIA(): R2Bucket {
  return getCloudflareContext().env.MEDIA;
}

type Row = Record<string, unknown>;

// ---------- Satir -> alan nesnesi donusturuculer ----------

export function parseJson<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== "string" || raw.length === 0) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : value == null ? fallback : String(value);
}

export function num(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return null;
}

export function bool(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  return null;
}

export async function resolveMediaMap(ids: number[]): Promise<Map<number, MediaRef>> {
  const unique = [...new Set(ids.filter((id) => Number.isFinite(id)))];
  const map = new Map<number, MediaRef>();
  if (unique.length === 0) return map;
  const db = getDB();
  for (let i = 0; i < unique.length; i += 50) {
    const chunk = unique.slice(i, i + 50);
    const placeholders = chunk.map(() => "?").join(",");
    const { results } = await db
      .prepare(`SELECT id, url, alt FROM media WHERE id IN (${placeholders})`)
      .bind(...chunk)
      .all<Row>();
    for (const row of results ?? []) {
      map.set(num(row.id) as number, {
        id: num(row.id) as number,
        url: str(row.url),
        alt: typeof row.alt === "string" ? row.alt : null,
      });
    }
  }
  return map;
}

export function mediaRef(map: Map<number, MediaRef>, id: unknown): MediaRef | null {
  const n = num(id);
  if (n == null) return null;
  return map.get(n) ?? null;
}

export function mediaId(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "id" in value) {
    return num((value as MediaRef).id);
  }
  return null;
}

/** Bloklardaki medya id referanslarini MediaRef'e cevirir. */
export async function hydrateBlocks(blocks: PageBlock[]): Promise<PageBlock[]> {
  const ids: number[] = [];
  for (const block of blocks) {
    if (block.blockType === "about") {
      const id = mediaId(block.image);
      if (id != null) ids.push(id);
    }
    if (block.blockType === "partnerBadges") {
      for (const badge of block.badges ?? []) {
        const id = mediaId(badge.icon);
        if (id != null) ids.push(id);
      }
    }
  }
  let map = new Map<number, MediaRef>();
  if (ids.length > 0) {
    try {
      map = await resolveMediaMap(ids);
    } catch {
      map = new Map();
    }
  }
  return blocks.map((block) => {
    if (block.blockType === "about") {
      return { ...block, image: mediaRef(map, block.image) };
    }
    if (block.blockType === "partnerBadges") {
      return {
        ...block,
        badges: (block.badges ?? []).map((badge) => ({
          ...badge,
          icon: mediaRef(map, badge.icon),
        })),
      };
    }
    return block;
  });
}

export function rowToService(row: Row, mediaMap: Map<number, MediaRef>): Service {
  return {
    id: num(row.id) as number,
    slug: str(row.slug),
    title: str(row.title),
    subtitle: str(row.subtitle),
    description: str(row.description),
    longDescription: str(row.long_description),
    features: parseJson<Service["features"]>(row.features, null),
    process: parseJson<Service["process"]>(row.process, null),
    metaTitle: str(row.meta_title),
    metaDescription: str(row.meta_description),
    icon: mediaRef(mediaMap, row.icon_media_id),
    accentColor: str(row.accent_color, "#0040ff"),
    order: num(row.sort_order),
  };
}

export function rowToProject(row: Row, mediaMap: Map<number, MediaRef>): Project {
  return {
    id: num(row.id) as number,
    order: num(row.sort_order),
    slug: str(row.slug),
    title: str(row.title),
    category: str(row.category),
    services: parseJson<Project["services"]>(row.services_tags, null),
    results: str(row.results),
    resultsColor: typeof row.results_color === "string" ? row.results_color : null,
    logo: mediaRef(mediaMap, row.logo_media_id),
    logoScale: num(row.logo_scale),
    smallTags: bool(row.small_tags),
    color: str(row.color),
  };
}

export function rowToTestimonial(row: Row, mediaMap: Map<number, MediaRef>): Testimonial {
  return {
    id: num(row.id) as number,
    image: mediaRef(mediaMap, row.image_media_id),
    rating: num(row.rating),
    order: num(row.sort_order),
    name: str(row.name),
    company: str(row.company),
    role: typeof row.role === "string" ? row.role : null,
    text: str(row.text),
  };
}

export function rowToFaq(row: Row): Faq {
  return {
    id: num(row.id) as number,
    order: num(row.sort_order),
    question: str(row.question),
    answer: str(row.answer),
  };
}

export function rowToCategory(row: Row): Category {
  return {
    id: num(row.id) as number,
    name: str(row.name),
    slug: str(row.slug),
  };
}

export async function rowsToBlogPosts(rows: Row[]): Promise<BlogPost[]> {
  const mediaIds = rows.map((row) => num(row.featured_image_media_id)).filter((v): v is number => v != null);
  let mediaMap = new Map<number, MediaRef>();
  try {
    mediaMap = await resolveMediaMap(mediaIds);
  } catch {
    mediaMap = new Map();
  }
  const categoryIds = rows.map((row) => num(row.category_id)).filter((v): v is number => v != null);
  const categoryMap = new Map<number, Category>();
  if (categoryIds.length > 0) {
    try {
      const db = getDB();
      const placeholders = [...new Set(categoryIds)].map(() => "?").join(",");
      const { results } = await db
        .prepare(`SELECT id, name, slug FROM categories WHERE id IN (${placeholders})`)
        .bind(...[...new Set(categoryIds)])
        .all<Row>();
      for (const row of results ?? []) {
        const cat = rowToCategory(row);
        categoryMap.set(cat.id, cat);
      }
    } catch {
      // kategori cozumleme basarisizsa null kalir
    }
  }
  return rows.map((row) => {
    const categoryId = num(row.category_id);
    return {
      id: num(row.id) as number,
      featuredImage: mediaRef(mediaMap, row.featured_image_media_id),
      category: categoryId != null ? categoryMap.get(categoryId) ?? null : null,
      slug: str(row.slug),
      title: str(row.title),
      excerpt: str(row.excerpt),
      content: str(row.content),
      publishedDate: str(row.published_date),
      metaTitle: typeof row.meta_title === "string" ? row.meta_title : null,
      metaDescription: typeof row.meta_description === "string" ? row.meta_description : null,
    };
  });
}

export async function rowToPage(row: Row): Promise<Page> {
  return {
    id: num(row.id) as number,
    slug: str(row.slug),
    title: str(row.title),
    content: await hydrateBlocks(parseJson<PageBlock[]>(row.content, [])),
    metaTitle: typeof row.meta_title === "string" ? row.meta_title : null,
    metaDescription: typeof row.meta_description === "string" ? row.meta_description : null,
  };
}

export function rowToContactSubmission(row: Row): ContactSubmission {
  return {
    id: num(row.id) as number,
    name: str(row.name),
    email: str(row.email),
    phone: typeof row.phone === "string" ? row.phone : null,
    service: typeof row.service === "string" ? row.service : null,
    message: str(row.message),
    read: bool(row.read),
    ip: typeof row.ip === "string" ? row.ip : null,
    createdAt: str(row.created_at),
  };
}
