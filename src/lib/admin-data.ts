import {
  getDB,
  resolveMediaMap,
  rowToProject,
  rowToService,
  rowToTestimonial,
  rowToFaq,
  rowsToBlogPosts,
} from "@/lib/db";
import type { BlogPost, Faq, Project, Service, Testimonial } from "@/types/content";

type Row = Record<string, unknown>;

/**
 * Admin duzenleme sayfalari icin id bazli okuma. content.ts API'si id
 * getter'lari icermadigindan dogrudan D1 sorgusu yapar.
 */

async function queryRow(sql: string, id: number): Promise<Row | null> {
  try {
    return (await getDB().prepare(sql).bind(id).first<Row>()) ?? null;
  } catch {
    return null;
  }
}

export async function getServiceById(id: number): Promise<Service | null> {
  try {
    const row = await queryRow("SELECT * FROM services WHERE id = ?", id);
    if (!row) return null;
    const iconId = typeof row.icon_media_id === "number" ? row.icon_media_id : null;
    const mediaMap = iconId != null ? await resolveMediaMap([iconId]) : new Map();
    return rowToService(row, mediaMap);
  } catch {
    return null;
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const row = await queryRow("SELECT * FROM projects WHERE id = ?", id);
    if (!row) return null;
    const logoId = typeof row.logo_media_id === "number" ? row.logo_media_id : null;
    const mediaMap = logoId != null ? await resolveMediaMap([logoId]) : new Map();
    return rowToProject(row, mediaMap);
  } catch {
    return null;
  }
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  try {
    const row = await queryRow("SELECT * FROM testimonials WHERE id = ?", id);
    if (!row) return null;
    const imageId = typeof row.image_media_id === "number" ? row.image_media_id : null;
    const mediaMap = imageId != null ? await resolveMediaMap([imageId]) : new Map();
    return rowToTestimonial(row, mediaMap);
  } catch {
    return null;
  }
}

export async function getFaqById(id: number): Promise<Faq | null> {
  try {
    const row = await queryRow("SELECT * FROM faqs WHERE id = ?", id);
    if (!row) return null;
    return rowToFaq(row);
  } catch {
    return null;
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  try {
    const row = await queryRow("SELECT * FROM blog_posts WHERE id = ?", id);
    if (!row) return null;
    const [post] = await rowsToBlogPosts([row]);
    return post ?? null;
  } catch {
    return null;
  }
}
