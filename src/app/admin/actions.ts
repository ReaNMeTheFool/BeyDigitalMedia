"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  deleteBlogPost,
  deleteFaq,
  deleteProject,
  deleteService,
  deleteTestimonial,
  getHomePage,
  getFooter,
  getMedia,
  getSiteSettings,
  listFaqs,
  listProjects,
  listServices,
  listTestimonials,
  markSubmissionRead,
  upsertBlogPost,
  upsertFaq,
  upsertProject,
  upsertService,
  upsertSettings,
  upsertTestimonial,
  createMedia,
} from "@/lib/content";
import { getDB, getMEDIA } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { AdminFormState } from "@/components/admin/form-state";
import type {
  CtaBlock,
  Footer,
  HeroBlock,
  MarqueeBlock,
  Navigation,
  PageBlock,
  ServicesGridBlock,
  PortfolioSliderBlock,
  SiteSettings,
  FaqAccordionBlock,
  TestimonialsCarouselBlock,
} from "@/types/content";

const ok = (message: string): AdminFormState => ({ status: "ok", message, errors: {} });
const fail = (message: string, errors: Record<string, string[]> = {}): AdminFormState => ({
  status: "error",
  message,
  errors,
});

function fieldErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
}

// ---------- FormData okuma yardimcilari ----------

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function strOrNull(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

function numOrNull(formData: FormData, key: string): number | null {
  const raw = str(formData, key);
  if (raw === "") return null;
  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value) ? value : null;
}

function checked(formData: FormData, key: string): boolean {
  return formData.get(key) != null;
}

/** `base.<index>.<key>` adli alanlari sirali satirlara toplar. */
function readRows(
  formData: FormData,
  base: string,
  keys: string[],
): Record<string, string>[] {
  const rows: Record<string, string>[] = [];
  for (let i = 0; i < 200; i++) {
    const row: Record<string, string> = {};
    let hasAny = false;
    for (const key of keys) {
      const value = str(formData, `${base}.${i}.${key}`);
      if (value !== "") hasAny = true;
      row[key] = value;
    }
    if (hasAny) rows.push(row);
  }
  return rows;
}

function parseJsonText<T>(raw: string): { ok: true; value: T } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(raw) as T };
  } catch {
    return { ok: false };
  }
}

function slugify(value: string): string {
  const trMap: Record<string, string> = {
    ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
    ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
  };
  return value
    .toLowerCase()
    .replace(/[ıİşŞğĞüÜöÖçÇ]/g, (ch) => trMap[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EXT_CONTENT_TYPES: Record<string, string> = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
  ico: "image/x-icon",
  pdf: "application/pdf",
  mp4: "video/mp4",
  webm: "video/webm",
};

function extContentType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXT_CONTENT_TYPES[ext] ?? "application/octet-stream";
}

const slugSchema = z
  .string()
  .min(1, "Slug zorunludur")
  .max(120, "Slug çok uzun")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir");

// ---------- Ana sayfa (pages tablosu) ----------

async function saveHomeBlocks(blocks: PageBlock[]): Promise<boolean> {
  try {
    const db = getDB();
    const row = await db.prepare("SELECT id FROM pages WHERE slug = 'home'").first<{ id: number }>();
    if (row) {
      const result = await db
        .prepare("UPDATE pages SET content = ? WHERE id = ?")
        .bind(JSON.stringify(blocks), row.id)
        .run();
      return result.success;
    }
    const result = await db
      .prepare("INSERT INTO pages (slug, title, content) VALUES ('home', 'Ana Sayfa', ?)")
      .bind(JSON.stringify(blocks))
      .run();
    return result.success;
  } catch {
    return false;
  }
}

function findHomeBlock(blocks: PageBlock[], blockType: string): PageBlock | undefined {
  return blocks.find((block) => block.blockType === blockType);
}

export async function updateHeroAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const page = await getHomePage();
  if (!page) return fail("Ana sayfa kaydı bulunamadı.");

  const blocks = page.content ?? [];
  const index = blocks.findIndex((block) => block.blockType === "hero");
  const existing = findHomeBlock(blocks, "hero") as HeroBlock | undefined;
  const words = readRows(formData, "words", ["word"])
    .map((row) => ({ word: row.word }))
    .filter((word) => word.word !== "");

  const hero: HeroBlock = {
    ...(existing ?? { blockType: "hero" }),
    blockType: "hero",
    icerik: {
      ...(existing?.icerik ?? {}),
      titlePrefix: strOrNull(formData, "titlePrefix"),
      animatedWords: words,
      titleSuffix: strOrNull(formData, "titleSuffix"),
      subtitle: strOrNull(formData, "subtitle"),
    },
    cta: {
      ...(existing?.cta ?? {}),
      primaryCta: {
        text: str(formData, "primaryCtaText"),
        link: str(formData, "primaryCtaLink"),
      },
      secondaryCta: {
        text: str(formData, "secondaryCtaText"),
        link: str(formData, "secondaryCtaLink"),
      },
    },
  };

  const next = index >= 0 ? blocks.map((block, i) => (i === index ? hero : block)) : [...blocks, hero];
  if (!(await saveHomeBlocks(next))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Hero bölümü kaydedildi.");
}

export async function updateMarqueeAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const page = await getHomePage();
  if (!page) return fail("Ana sayfa kaydı bulunamadı.");

  const blocks = page.content ?? [];
  const index = blocks.findIndex((block) => block.blockType === "marquee");
  const existing = findHomeBlock(blocks, "marquee") as MarqueeBlock | undefined;
  const items = readRows(formData, "items", ["text"])
    .map((row) => ({ text: row.text }))
    .filter((item) => item.text !== "");

  const marquee: MarqueeBlock = {
    ...(existing ?? {}),
    blockType: "marquee",
    items,
  };

  const next = index >= 0 ? blocks.map((block, i) => (i === index ? marquee : block)) : [...blocks, marquee];
  if (!(await saveHomeBlocks(next))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Kayan şerit kaydedildi.");
}

export async function updateCtaAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const page = await getHomePage();
  if (!page) return fail("Ana sayfa kaydı bulunamadı.");

  const blocks = page.content ?? [];
  const index = blocks.findIndex((block) => block.blockType === "cta");
  const existing = findHomeBlock(blocks, "cta") as CtaBlock | undefined;

  const cta: CtaBlock = {
    ...(existing ?? {}),
    blockType: "cta",
    title: str(formData, "title"),
    subtitle: strOrNull(formData, "subtitle"),
    ctaText: str(formData, "ctaText"),
    ctaLink: str(formData, "ctaLink"),
  };

  const next = index >= 0 ? blocks.map((block, i) => (i === index ? cta : block)) : [...blocks, cta];
  if (!(await saveHomeBlocks(next))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("CTA bölümü kaydedildi.");
}

export async function updateAboutAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const page = await getHomePage();
  if (!page) return fail("Ana sayfa kaydı bulunamadı.");

  const blocks = page.content ?? [];
  const index = blocks.findIndex((block) => block.blockType === "about");
  const existing = findHomeBlock(blocks, "about") as PageBlock & { blockType: "about" } | undefined;

  const about = {
    ...(existing ?? {}),
    blockType: "about" as const,
    title: str(formData, "title"),
    content: str(formData, "content"),
  };

  const next = index >= 0 ? blocks.map((block, i) => (i === index ? about : block)) : [...blocks, about];
  if (!(await saveHomeBlocks(next))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Hakkımızda bölümü kaydedildi.");
}

const DATA_BLOCK_TYPES = ["servicesGrid", "portfolioSlider", "testimonialsCarousel", "faqAccordion"] as const;

export async function updateHomeBlockAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const page = await getHomePage();
  if (!page) return fail("Ana sayfa kaydı bulunamadı.");

  const blockType = str(formData, "blockType");
  if (!(DATA_BLOCK_TYPES as readonly string[]).includes(blockType)) {
    return fail("Bilinmeyen blok türü.");
  }

  const blocks = page.content ?? [];
  const selectedIds = new Set(
    formData
      .getAll("selectedIds")
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value)),
  );

  let updated: PageBlock;
  if (blockType === "servicesGrid") {
    const existing = findHomeBlock(blocks, "servicesGrid") as ServicesGridBlock | undefined;
    const grid: ServicesGridBlock = {
      ...(existing ?? {}),
      blockType: "servicesGrid",
      sectionTitle: strOrNull(formData, "sectionTitle"),
      showAllServices: checked(formData, "showAll"),
      selectedServices: (await listServices()).filter((service) => selectedIds.has(service.id)),
    };
    updated = grid;
  } else if (blockType === "portfolioSlider") {
    const existing = findHomeBlock(blocks, "portfolioSlider") as PortfolioSliderBlock | undefined;
    const slider: PortfolioSliderBlock = {
      ...(existing ?? {}),
      blockType: "portfolioSlider",
      title: str(formData, "title"),
      subtitle: strOrNull(formData, "subtitle"),
      showAllPortfolios: checked(formData, "showAll"),
      selectedPortfolios: (await listProjects()).filter((project) => selectedIds.has(project.id)),
    };
    updated = slider;
  } else if (blockType === "testimonialsCarousel") {
    const existing = findHomeBlock(blocks, "testimonialsCarousel") as TestimonialsCarouselBlock | undefined;
    const carousel: TestimonialsCarouselBlock = {
      ...(existing ?? {}),
      blockType: "testimonialsCarousel",
      title: str(formData, "title"),
      showAllTestimonials: checked(formData, "showAll"),
      selectedTestimonials: (await listTestimonials()).filter((testimonial) => selectedIds.has(testimonial.id)),
    };
    updated = carousel;
  } else {
    const existing = findHomeBlock(blocks, "faqAccordion") as FaqAccordionBlock | undefined;
    const accordion: FaqAccordionBlock = {
      ...(existing ?? {}),
      blockType: "faqAccordion",
      title: str(formData, "title"),
      subtitle: strOrNull(formData, "subtitle"),
      showAllFaqs: checked(formData, "showAll"),
      selectedFaqs: (await listFaqs()).filter((faq) => selectedIds.has(faq.id)),
    };
    updated = accordion;
  }

  const index2 = blocks.findIndex((block) => block.blockType === blockType);
  const next = index2 >= 0 ? blocks.map((block, i) => (i === index2 ? updated : block)) : [...blocks, updated];
  if (!(await saveHomeBlocks(next))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Blok kaydedildi.");
}

export async function saveHomeJsonAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const raw = str(formData, "content");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return fail("JSON çözümlenemedi.", { content: ["Geçerli bir JSON dizisi girin."] });
  }

  const isValid =
    Array.isArray(parsed) &&
    parsed.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { blockType?: unknown }).blockType === "string",
    );
  if (!isValid) {
    return fail("İçerik formatı geçersiz.", {
      content: ["Her öğe string türünde blockType alanına sahip bir nesne olmalıdır."],
    });
  }

  if (!(await saveHomeBlocks(parsed as PageBlock[]))) return fail("Ana sayfa kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Ana sayfa blokları kaydedildi.");
}

// ---------- Hizmetler ----------

const serviceSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, "Başlık zorunludur").max(200, "Başlık çok uzun"),
  subtitle: z.string().max(400, "Alt başlık çok uzun"),
  description: z.string().max(2000, "Açıklama çok uzun"),
  longDescription: z.string().max(50000, "Uzun açıklama çok uzun"),
  accentColor: z.string().max(40, "Renk değeri çok uzun"),
  metaTitle: z.string().max(200, "Meta başlık çok uzun"),
  metaDescription: z.string().max(300, "Meta açıklama çok uzun"),
  order: z.number().int("Sıra tam sayı olmalıdır").min(0, "Sıra negatif olamaz").max(10000, "Sıra çok büyük"),
});

export async function upsertServiceAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const editId = numOrNull(formData, "id");

  const parsed = serviceSchema.safeParse({
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    subtitle: str(formData, "subtitle"),
    description: str(formData, "description"),
    longDescription: str(formData, "longDescription"),
    accentColor: str(formData, "accentColor"),
    metaTitle: str(formData, "metaTitle"),
    metaDescription: str(formData, "metaDescription"),
    order: numOrNull(formData, "order") ?? 0,
  });
  if (!parsed.success) return fail("Lütfen form alanlarını kontrol edin.", fieldErrors(parsed.error));

  const features = readRows(formData, "features", ["title", "description"])
    .filter((row) => row.title !== "" || row.description !== "")
    .map((row) => ({ title: row.title, description: row.description }));

  const process = readRows(formData, "process", ["title", "description"])
    .filter((row) => row.title !== "" || row.description !== "")
    .map((row, index) => ({ step: index + 1, title: row.title, description: row.description }));

  const id = await upsertService({
    id: editId ?? undefined,
    slug: parsed.data.slug,
    title: parsed.data.title,
    subtitle: parsed.data.subtitle,
    description: parsed.data.description,
    longDescription: parsed.data.longDescription,
    features,
    process,
    metaTitle: parsed.data.metaTitle,
    metaDescription: parsed.data.metaDescription,
    icon: numOrNull(formData, "iconMediaId"),
    accentColor: parsed.data.accentColor,
    order: parsed.data.order,
  });

  if (id == null) {
    return fail("Kayıt kaydedilemedi. Slug benzersiz olmalı veya veritabanı hatası oluşmuş olabilir.");
  }
  revalidatePath("/", "layout");
  if (editId == null) redirect(`/admin/services/${id}`);
  return ok("Hizmet kaydedildi.");
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await deleteService(id);
  }
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

// ---------- Projeler ----------

const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, "Başlık zorunludur").max(200, "Başlık çok uzun"),
  category: z.string().max(120, "Kategori çok uzun"),
  results: z.string().max(300, "Sonuç metni çok uzun"),
  resultsColor: z.string().max(40, "Sonuç rengi çok uzun"),
  color: z.string().max(120, "Renk/gradyan değeri çok uzun"),
  logoScale: z.number().min(0.1, "Ölçek en az 0.1 olmalı").max(5, "Ölçek en fazla 5 olabilir"),
  order: z.number().int("Sıra tam sayı olmalıdır").min(0, "Sıra negatif olamaz").max(10000, "Sıra çok büyük"),
});

export async function upsertProjectAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const editId = numOrNull(formData, "id");

  const parsed = projectSchema.safeParse({
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    category: str(formData, "category"),
    results: str(formData, "results"),
    resultsColor: str(formData, "resultsColor"),
    color: str(formData, "color"),
    logoScale: numOrNull(formData, "logoScale") ?? 1,
    order: numOrNull(formData, "order") ?? 0,
  });
  if (!parsed.success) return fail("Lütfen form alanlarını kontrol edin.", fieldErrors(parsed.error));

  const services = readRows(formData, "tags", ["label", "slug", "breakBefore"])
    .filter((row) => row.label !== "")
    .map((row) => ({
      label: row.label,
      slug: row.slug !== "" ? slugify(row.slug) : slugify(row.label),
      breakBefore: row.breakBefore === "1",
    }));

  const id = await upsertProject({
    id: editId ?? undefined,
    slug: parsed.data.slug,
    title: parsed.data.title,
    category: parsed.data.category,
    services,
    results: parsed.data.results,
    resultsColor: strOrNull(formData, "resultsColor"),
    logo: numOrNull(formData, "logoMediaId"),
    logoScale: parsed.data.logoScale,
    smallTags: checked(formData, "smallTags"),
    color: parsed.data.color,
    order: parsed.data.order,
  });

  if (id == null) {
    return fail("Kayıt kaydedilemedi. Slug benzersiz olmalı veya veritabanı hatası oluşmuş olabilir.");
  }
  revalidatePath("/", "layout");
  if (editId == null) redirect(`/admin/projects/${id}`);
  return ok("Proje kaydedildi.");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await deleteProject(id);
  }
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

// ---------- Referanslar ----------

const testimonialSchema = z.object({
  name: z.string().min(1, "İsim zorunludur").max(120, "İsim çok uzun"),
  company: z.string().max(160, "Şirket çok uzun"),
  role: z.string().max(160, "Ünvan çok uzun"),
  rating: z.number().int("Puan tam sayı olmalıdır").min(1, "Puan en az 1 olmalı").max(5, "Puan en fazla 5 olabilir"),
  text: z.string().min(1, "Yorum metni zorunludur").max(2000, "Yorum metni çok uzun"),
  order: z.number().int("Sıra tam sayı olmalıdır").min(0, "Sıra negatif olamaz").max(10000, "Sıra çok büyük"),
});

export async function upsertTestimonialAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const editId = numOrNull(formData, "id");

  const parsed = testimonialSchema.safeParse({
    name: str(formData, "name"),
    company: str(formData, "company"),
    role: str(formData, "role"),
    rating: numOrNull(formData, "rating") ?? 5,
    text: str(formData, "text"),
    order: numOrNull(formData, "order") ?? 0,
  });
  if (!parsed.success) return fail("Lütfen form alanlarını kontrol edin.", fieldErrors(parsed.error));

  const id = await upsertTestimonial({
    id: editId ?? undefined,
    name: parsed.data.name,
    company: parsed.data.company,
    role: strOrNull(formData, "role"),
    rating: parsed.data.rating,
    text: parsed.data.text,
    image: numOrNull(formData, "imageMediaId"),
    order: parsed.data.order,
  });

  if (id == null) return fail("Kayıt kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok(editId == null ? "Referans eklendi." : "Referans kaydedildi.");
}

export async function deleteTestimonialAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await deleteTestimonial(id);
  }
  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}

// ---------- SSS ----------

const faqSchema = z.object({
  question: z.string().min(1, "Soru zorunludur").max(400, "Soru çok uzun"),
  answer: z.string().min(1, "Cevap zorunludur").max(10000, "Cevap çok uzun"),
  order: z.number().int("Sıra tam sayı olmalıdır").min(0, "Sıra negatif olamaz").max(10000, "Sıra çok büyük"),
});

export async function upsertFaqAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const editId = numOrNull(formData, "id");

  const parsed = faqSchema.safeParse({
    question: str(formData, "question"),
    answer: str(formData, "answer"),
    order: numOrNull(formData, "order") ?? 0,
  });
  if (!parsed.success) return fail("Lütfen form alanlarını kontrol edin.", fieldErrors(parsed.error));

  const id = await upsertFaq({
    id: editId ?? undefined,
    question: parsed.data.question,
    answer: parsed.data.answer,
    order: parsed.data.order,
  });

  if (id == null) return fail("Kayıt kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok(editId == null ? "Soru eklendi." : "Soru kaydedildi.");
}

export async function deleteFaqAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await deleteFaq(id);
  }
  revalidatePath("/", "layout");
  redirect("/admin/faqs");
}

// ---------- Blog ----------

const blogPostSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, "Başlık zorunludur").max(250, "Başlık çok uzun"),
  excerpt: z.string().max(500, "Özet çok uzun"),
  content: z.string().max(200000, "İçerik çok uzun"),
  publishedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Yayın tarihi YYYY-MM-DD biçiminde olmalıdır"),
  metaTitle: z.string().max(200, "Meta başlık çok uzun"),
  metaDescription: z.string().max(300, "Meta açıklama çok uzun"),
});

export async function upsertBlogPostAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const editId = numOrNull(formData, "id");

  const parsed = blogPostSchema.safeParse({
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    publishedDate: str(formData, "publishedDate") || new Date().toISOString().slice(0, 10),
    metaTitle: str(formData, "metaTitle"),
    metaDescription: str(formData, "metaDescription"),
  });
  if (!parsed.success) return fail("Lütfen form alanlarını kontrol edin.", fieldErrors(parsed.error));

  const id = await upsertBlogPost({
    id: editId ?? undefined,
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    publishedDate: parsed.data.publishedDate,
    category: numOrNull(formData, "categoryId"),
    featuredImage: numOrNull(formData, "featuredImageMediaId"),
    metaTitle: strOrNull(formData, "metaTitle"),
    metaDescription: strOrNull(formData, "metaDescription"),
  });

  if (id == null) {
    return fail("Kayıt kaydedilemedi. Slug benzersiz olmalı veya veritabanı hatası oluşmuş olabilir.");
  }
  revalidatePath("/", "layout");
  if (editId == null) redirect(`/admin/blog/${id}`);
  return ok("Yazı kaydedildi.");
}

export async function deleteBlogPostAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await deleteBlogPost(id);
  }
  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

// ---------- Site ayarları ----------

const socialSchema = z.object({
  platform: z.string().min(1, "Platform zorunludur").max(80, "Platform adı çok uzun"),
  url: z.string().min(1, "Adres zorunludur").max(500, "Adres çok uzun"),
});

export async function saveSiteSettingsAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  const socialRows = readRows(formData, "social", ["platform", "url"]).filter(
    (row) => row.platform !== "" || row.url !== "",
  );
  const socialLinks = [];
  for (const row of socialRows) {
    const parsed = socialSchema.safeParse(row);
    if (!parsed.success) {
      return fail("Sosyal bağlantılar eksik.", { socialLinks: [parsed.error.issues[0]?.message ?? "Platform ve adres zorunludur."] });
    }
    socialLinks.push(parsed.data);
  }

  const current = await getSiteSettings();
  // logo/favicon depoda medya id'si (number) olarak tutulur; getSiteSettings
  // okurken MediaRef'e cozumler.
  const value = {
    siteName: strOrNull(formData, "siteName"),
    tagline: strOrNull(formData, "tagline"),
    contactEmail: strOrNull(formData, "contactEmail"),
    contactPhone: strOrNull(formData, "contactPhone"),
    defaultMetaTitle: strOrNull(formData, "defaultMetaTitle"),
    defaultMetaDescription: strOrNull(formData, "defaultMetaDescription"),
    googleVerification: strOrNull(formData, "googleVerification"),
    theme: current.theme,
    socialLinks: socialLinks.length > 0 ? socialLinks : null,
    logo: numOrNull(formData, "logoMediaId"),
    favicon: numOrNull(formData, "faviconMediaId"),
  } as unknown as SiteSettings;

  if (!(await upsertSettings("siteSettings", value))) return fail("Ayarlar kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Site ayarları kaydedildi.");
}

const navLinkSchema = z.object({
  label: z.string().min(1, "Etiket zorunludur").max(120, "Etiket çok uzun"),
  href: z.string().min(1, "Bağlantı adresi zorunludur").max(300, "Adres çok uzun"),
});

export async function saveNavigationAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  const rows = readRows(formData, "links", ["label", "href", "children"]);
  const links: Navigation["links"] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.label === "" && row.href === "") continue;
    const parsed = navLinkSchema.safeParse(row);
    if (!parsed.success) {
      return fail(`${i + 1}. bağlantı geçersiz.`, {
        [`links.${i}.label`]: parsed.error.issues.map((issue) => issue.message),
      });
    }
    let children: { label: string; href: string }[] = [];
    if (row.children !== "" && row.children !== "[]") {
      const parsedChildren = parseJsonText<{ label: unknown; href: unknown }[]>(row.children);
      if (
        !parsedChildren.ok ||
        !Array.isArray(parsedChildren.value) ||
        parsedChildren.value.some((child) => {
          if (typeof child !== "object" || child === null) return true;
          const check = navLinkSchema.safeParse(child);
          return !check.success;
        })
      ) {
        return fail(`${i + 1}. bağlantının alt öğeleri geçersiz.`, {
          [`links.${i}.children`]: ['Örnek: [{"label":"Alt sayfa","href":"/alt-sayfa"}]'],
        });
      }
      children = parsedChildren.value.map((child) => ({
        label: String(child.label),
        href: String(child.href),
      }));
    }
    links.push({
      label: parsed.data.label,
      href: parsed.data.href,
      children: children.length > 0 ? children : null,
    });
  }

  const value: Navigation = {
    links,
    ctaLabel: strOrNull(formData, "ctaLabel"),
    ctaHref: strOrNull(formData, "ctaHref"),
  };

  if (!(await upsertSettings("navigation", value))) return fail("Navigasyon kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Navigasyon kaydedildi.");
}

const footerLinkSchema = z.object({
  label: z.string().min(1, "Etiket zorunludur").max(160, "Etiket çok uzun"),
  href: z.string().min(1, "Bağlantı adresi zorunludur").max(300, "Adres çok uzun"),
});

export async function saveFooterAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  const socialRows = readRows(formData, "social", ["platform", "url"]).filter(
    (row) => row.platform !== "" || row.url !== "",
  );
  const socialLinks = [];
  for (const row of socialRows) {
    const parsed = socialSchema.safeParse(row);
    if (!parsed.success) {
      return fail("Sosyal bağlantılar eksik.", { socialLinks: [parsed.error.issues[0]?.message ?? "Platform ve adres zorunludur."] });
    }
    socialLinks.push(parsed.data);
  }

  const currentFooter = await getFooter();
  const columnRows = readRows(formData, "columns", ["title", "links"]);
  const columns: Footer["columns"] = [];
  for (let i = 0; i < columnRows.length; i++) {
    const row = columnRows[i];
    if (row.title === "" && row.links === "") continue;
    if (row.title === "") {
      return fail(`${i + 1}. sütunun başlığı zorunludur.`, { [`columns.${i}.title`]: ["Sütun başlığı zorunludur."] });
    }
    let columnLinks: { label: string; href: string }[] = [];
    if (row.links !== "" && row.links !== "[]") {
      const parsedLinks = parseJsonText<{ label: unknown; href: unknown }[]>(row.links);
      if (
        !parsedLinks.ok ||
        !Array.isArray(parsedLinks.value) ||
        parsedLinks.value.some((link) => {
          if (typeof link !== "object" || link === null) return true;
          return !footerLinkSchema.safeParse(link).success;
        })
      ) {
        return fail(`${i + 1}. sütunun bağlantıları geçersiz.`, {
          [`columns.${i}.links`]: ['Örnek: [{"label":"Hakkımızda","href":"/hakkimizda"}]'],
        });
      }
      columnLinks = parsedLinks.value.map((link) => ({
        label: String(link.label),
        href: String(link.href),
      }));
    }
    columns.push({ title: row.title, links: columnLinks.length > 0 ? columnLinks : null });
  }

  const value: Footer = {
    ctaTitle: strOrNull(formData, "ctaTitle"),
    ctaSubtitle: strOrNull(formData, "ctaSubtitle"),
    ctaButtonText: strOrNull(formData, "ctaButtonText"),
    columns,
    bottomText: strOrNull(formData, "bottomText"),
    brandTagline: strOrNull(formData, "brandTagline"),
    showNewsletter: currentFooter.showNewsletter ?? false,
    socialLinks: socialLinks.length > 0 ? socialLinks : null,
  };

  if (!(await upsertSettings("footer", value))) return fail("Alt bilgi kaydedilemedi.");
  revalidatePath("/", "layout");
  return ok("Alt bilgi kaydedildi.");
}

// ---------- Lead'ler ----------

export async function markLeadReadAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const read = formData.get("read") === "1";
  if (Number.isFinite(id)) {
    await markSubmissionRead(id, read);
  }
  revalidatePath("/", "layout");
}

export async function deleteLeadAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await getDB().prepare("DELETE FROM contact_submissions WHERE id = ?").bind(id).run();
  }
  revalidatePath("/", "layout");
  redirect("/admin");
}

// ---------- Medya ----------

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export async function uploadMediaAction(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return fail("Dosya seçilmedi.", { file: ["Yüklenecek bir dosya seçin."] });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return fail("Dosya çok büyük.", { file: ["En fazla 25 MB boyutunda dosya yükleyebilirsiniz."] });
  }

  const alt = str(formData, "alt");
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .slice(0, 120);
  if (safeName.length === 0) {
    return fail("Dosya adı geçersiz.", { file: ["Dosya adı harf veya rakam içermelidir."] });
  }

  const key = `${Date.now()}-${safeName}`;
  const contentType = file.type !== "" ? file.type : extContentType(safeName);

  const MEDIA = getMEDIA();
  try {
    await MEDIA.put(key, file, { httpMetadata: { contentType } });
  } catch {
    return fail("Dosya depoya yazılamadı.");
  }

  const ref = await createMedia({ filename: key, url: `/dyn-media/${key}`, alt: alt === "" ? null : alt });
  if (ref == null) {
    await MEDIA.delete(key);
    return fail("Dosya kaydı oluşturulamadı.");
  }

  revalidatePath("/", "layout");
  return ok("Dosya yüklendi.");
}

export async function deleteMediaAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    const ref = await getMedia(id);
    if (ref) {
      if (ref.url.startsWith("/dyn-media/")) {
        await getMEDIA().delete(ref.url.slice("/dyn-media/".length));
      }
      await getDB().prepare("DELETE FROM media WHERE id = ?").bind(id).run();
    }
  }
  revalidatePath("/", "layout");
  redirect("/admin/media");
}
