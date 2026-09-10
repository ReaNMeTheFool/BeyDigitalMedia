/**
 * Payload MongoDB icerigini D1 SQL INSERT'lerine cevirir.
 * Girdi: mongodump arsivi (.archive/.archive.gz) veya dump klasoru (.bson / extended-JSON .json).
 * Cikti: migrations/0001_schema.sql sonrasi calistirilabilir, idempotent INSERT'ler.
 *
 * Kullanim: npx tsx scripts/migrate-mongo-to-d1.ts <girdi> [--out <dosya>]
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { gunzipSync } from "node:zlib";

type Doc = Record<string, unknown>;

const COLLECTIONS = new Set([
  "services",
  "projects",
  "testimonials",
  "faqs",
  "pages",
  "blogposts",
  "categories",
  "media",
  "contactsubmissions",
  "sitesettings",
  "navigation",
  "footer",
  "globals",
]);

function usage(): string {
  return `Usage: npx tsx scripts/migrate-mongo-to-d1.ts <input> [--out <file>]

Payload MongoDB icerigini D1 SQL INSERT'lerine cevirir.
Once migrations/0001_schema.sql uygulanmis olmalidir.

Input:
  mongodump arsivi (.archive veya .archive.gz)
  mongodump cikti klasoru (<db>/*.bson) veya extended-JSON dump klasoru (*.json)

Options:
  --out <file>  SQL cikti dosyasi (varsayilan: stdout)
  --help        Bu yardimi goster

Examples:
  npx tsx scripts/migrate-mongo-to-d1.ts dump.archive --out /tmp/d1-seed.sql
  npx tsx scripts/migrate-mongo-to-d1.ts dump/beydigitalmedia > /tmp/d1-seed.sql`;
}

// ---------- BSON cozumleyici (mongodump .archive/.bson icin minimal) ----------

const utf8 = new TextDecoder();
const hexTable = "0123456789abcdef";

function toHex(bytes: Uint8Array, start: number, end: number): string {
  let out = "";
  for (let i = start; i < end; i++) {
    out += hexTable[bytes[i] >> 4] + hexTable[bytes[i] & 0x0f];
  }
  return out;
}

class BsonReader {
  offset = 0;
  private readonly view: DataView;

  constructor(private readonly bytes: Uint8Array) {
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }

  /** Uzunluk on ekli tam BSON belgesi. */
  readDocument(): Doc {
    const start = this.offset;
    const size = this.view.getInt32(start, true);
    if (size < 5 || start + size > this.bytes.length) {
      throw new Error(`Gecersiz BSON belge boyutu: ${size}`);
    }
    this.offset = start + 4;
    const doc = this.readElements(start + size);
    this.offset = start + size;
    return doc;
  }

  /** Uzunluk on eki olmayan belge govdesi (mongodump arsiv bolumleri). */
  readElementsUntil(end: number): Doc {
    return this.readElements(end);
  }

  private readElements(end: number): Doc {
    const doc: Doc = {};
    while (this.offset < end - 1) {
      const type = this.bytes[this.offset++];
      if (type === 0) break;
      const name = this.cstring();
      doc[name] = this.readValue(type);
    }
    this.offset = end;
    return doc;
  }

  private cstring(): string {
    let nul = this.offset;
    while (nul < this.bytes.length && this.bytes[nul] !== 0x00) nul++;
    const s = utf8.decode(this.bytes.subarray(this.offset, nul));
    this.offset = nul + 1;
    return s;
  }

  private readValue(type: number): unknown {
    switch (type) {
      case 0x01: {
        const v = this.view.getFloat64(this.offset, true);
        this.offset += 8;
        return v;
      }
      case 0x02:
        return this.bsonString();
      case 0x03:
      case 0x04: {
        const sub = new BsonReader(this.bytes);
        sub.offset = this.offset;
        const doc = sub.readDocument();
        this.offset = sub.offset;
        if (type === 0x04) return docToArray(doc);
        return doc;
      }
      case 0x05: {
        const len = this.view.getInt32(this.offset, true);
        this.offset += 5; // uzunluk + alt tip
        const data = this.bytes.subarray(this.offset, this.offset + len);
        this.offset += len;
        return btoa(String.fromCharCode(...data));
      }
      case 0x07: {
        const hex = toHex(this.bytes, this.offset, this.offset + 12);
        this.offset += 12;
        return hex;
      }
      case 0x08:
        return this.bytes[this.offset++] !== 0;
      case 0x09: {
        const ms = Number(this.view.getBigInt64(this.offset, true));
        this.offset += 8;
        return new Date(ms).toISOString();
      }
      case 0x0a:
        return null;
      case 0x0b: {
        const pattern = this.cstring();
        this.cstring(); // options
        return pattern;
      }
      case 0x0d:
      case 0x0e:
        return this.bsonString();
      case 0x10: {
        const v = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return v;
      }
      case 0x11:
      case 0x12: {
        const v = Number(this.view.getBigUint64(this.offset, true));
        this.offset += 8;
        return v;
      }
      default:
        throw new Error(`Desteklenmeyen BSON tipi: 0x${type.toString(16)}`);
    }
  }

  private bsonString(): string {
    const len = this.view.getInt32(this.offset, true);
    this.offset += 4;
    const s = utf8.decode(this.bytes.subarray(this.offset, this.offset + len - 1));
    this.offset += len;
    return s;
  }
}

/** BSON dizisi numerik anahtarli belge olarak okunur; diziye cevirir. */
function docToArray(doc: Doc): unknown[] {
  const out: unknown[] = [];
  for (const [key, value] of Object.entries(doc)) {
    const idx = Number(key);
    if (Number.isInteger(idx) && idx >= 0) out[idx] = doc[key];
  }
  for (let i = 0; i < out.length; i++) {
    if (out[i] === undefined) out[i] = null;
  }
  return out;
}

/** Ard arda eklenmis BSON belgelerini akis sonuna kadar okur. */
function readBsonStream(bytes: Uint8Array): Doc[] {
  const docs: Doc[] = [];
  let off = 0;
  while (off + 5 <= bytes.length) {
    const size = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getInt32(off, true);
    if (size < 5 || off + size > bytes.length) break;
    const reader = new BsonReader(bytes);
    reader.offset = off;
    docs.push(reader.readDocument());
    off += size;
  }
  return docs;
}

/**
 * mongodump arsivi: 4 bayt magic + ham BSON header belgesi, ardindan
 * bolumler. Her bolum: [int32 uzunluk = BSON belge boyutu][belge govdesi
 * (uzunluk on eksiz)]. 0xFFFFFFFF ayirici bolumleri atlanir. "collection"
 * alanli belgeler namespace bildirir, "_id" alanliler veri belgesidir.
 */
function parseArchive(bytes: Uint8Array): Map<string, Doc[]> {
  if (bytes.length < 8 || new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, true) !== 0x8199e26d) {
    throw new Error("Gecersiz mongodump arsivi (magic 0x8199E26D bulunamadi)");
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const collections = new Map<string, Doc[]>();
  let off = 4;
  const headerLen = view.getInt32(off, true);
  if (headerLen < 5 || off + headerLen > bytes.length) {
    throw new Error("Gecersiz arsiv header belgesi");
  }
  off += headerLen;
  let current: string | null = null;
  while (off + 4 <= bytes.length) {
    const len = view.getInt32(off, true);
    if (len === -1) {
      off += 4; // bolum ayirici
      continue;
    }
    if (len < 5 || off + len > bytes.length) break;
    try {
      const reader = new BsonReader(bytes);
      reader.offset = off + 4;
      const doc = reader.readElementsUntil(off + len);
      if (doc._id !== undefined && current) {
        const list = collections.get(current) ?? [];
        list.push(doc);
        collections.set(current, list);
      } else if (typeof doc.collection === "string") {
        current = doc.collection;
      }
    } catch (e) {
      console.error(`Bolum cozumlenemedi @${off}:`, e instanceof Error ? e.message : e);
    }
    off += len;
  }
  return collections;
}

// ---------- Extended JSON (dump klasoru .json) normalizasyonu ----------

function fromExtendedJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(fromExtendedJson);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 1) {
      switch (keys[0]) {
        case "$oid":
          return String(obj.$oid);
        case "$date":
          return dateToIso(obj.$date);
        case "$numberInt":
        case "$numberLong":
        case "$numberDouble":
        case "$numberDecimal":
          return Number(obj[keys[0]]);
        case "$binary":
        case "$undefined":
        case "$minKey":
        case "$maxKey":
          return null;
      }
    }
    const out: Doc = {};
    for (const [k, v] of Object.entries(obj)) out[k] = fromExtendedJson(v);
    return out;
  }
  return value;
}

function dateToIso(value: unknown): string {
  if (typeof value === "string") return new Date(value).toISOString();
  if (typeof value === "number") return new Date(value).toISOString();
  if (value && typeof value === "object" && "$numberLong" in (value as Doc)) {
    return new Date(Number((value as Doc).$numberLong)).toISOString();
  }
  return new Date().toISOString();
}

// ---------- Ykleme ----------

function loadDocs(input: string): Map<string, Doc[]> {
  const abs = path.resolve(input);
  if (!existsSync(abs)) {
    throw new Error(`Girdi bulunamadi: ${abs}`);
  }
  const st = statSync(abs);
  if (st.isFile()) return loadArchiveFile(abs);
  return loadDirectory(abs);
}

function loadArchiveFile(abs: string): Map<string, Doc[]> {
  const raw = new Uint8Array(readFileSync(abs));
  const isGzip = abs.endsWith(".gz") || (raw.length > 2 && raw[0] === 0x1f && raw[1] === 0x8b);
  return parseArchive(isGzip ? gunzipSync(raw) : raw);
}

function loadDirectory(abs: string): Map<string, Doc[]> {
  const collections = new Map<string, Doc[]>();
  for (const entry of readdirSync(abs)) {
    const full = path.join(abs, entry);
    if (statSync(full).isDirectory()) {
      for (const [name, docs] of loadDirectory(full)) {
        mergeDocs(collections, name, docs);
      }
      continue;
    }
    if (entry.endsWith(".bson")) {
      const name = entry.slice(0, -".bson".length);
      mergeDocs(collections, name, readBsonStream(readFileSync(full)));
    } else if (entry.endsWith(".json") && !entry.endsWith(".metadata.json")) {
      const name = entry.slice(0, -".json".length);
      mergeDocs(collections, name, readJsonDocs(full));
    }
  }
  return collections;
}

function readJsonDocs(full: string): Doc[] {
  const raw = readFileSync(full, "utf8");
  const docs: Doc[] = [];
  try {
    const parsed = fromExtendedJson(JSON.parse(raw));
    if (Array.isArray(parsed)) return parsed as Doc[];
    if (parsed && typeof parsed === "object") return [parsed as Doc];
    return [];
  } catch {
    // NDJSON
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const parsed = fromExtendedJson(JSON.parse(trimmed));
      if (parsed && typeof parsed === "object") docs.push(parsed as Doc);
    } catch {
      // bozuk satiri atla
    }
  }
  return docs;
}

function mergeDocs(collections: Map<string, Doc[]>, name: string, docs: Doc[]) {
  const key = name.toLowerCase();
  if (!COLLECTIONS.has(key) || docs.length === 0) return;
  const list = collections.get(key) ?? [];
  list.push(...docs);
  collections.set(key, list);
}

// ---------- richText duzlestirme ----------

function lexicalToText(value: unknown): string {
  const root =
    value && typeof value === "object" && "root" in (value as Doc)
      ? (value as { root?: unknown }).root
      : value;
  if (!root || typeof root !== "object") return "";
  const children = (root as { children?: unknown }).children;
  if (!Array.isArray(children)) return "";
  return (children as unknown[])
    .map(nodeToText)
    .filter((t) => t.length > 0)
    .join("\n\n");
}

function nodeToText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Doc;
  if (n.type === "linebreak") return "\n";
  if (n.type === "text" && typeof n.text === "string") return n.text;
  if (Array.isArray(n.children)) {
    return (n.children as unknown[]).map(nodeToText).join("");
  }
  return "";
}

function lexicalToHtml(value: unknown): string {
  const root =
    value && typeof value === "object" && "root" in (value as Doc)
      ? (value as { root?: unknown }).root
      : value;
  const children = root && typeof root === "object" ? (root as { children?: unknown }).children : null;
  if (!Array.isArray(children)) return "";
  return (children as unknown[])
    .map((child) => {
      const text = nodeToText(child).trim();
      return text ? `<p>${escapeHtml(text)}</p>` : "";
    })
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- SQL ----------

function sqlValue(v: unknown): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "1" : "0";
  return `'${String(v).replace(/'/g, "''")}'`;
}

function insert(table: string, columns: string[], values: unknown[]): string {
  return `INSERT OR IGNORE INTO ${table} (${columns.join(", ")}) VALUES (${values
    .map(sqlValue)
    .join(", ")});`;
}

/** _id/updatedAt/createdAt/id/blockName anahtarlarini derinlemesine atar. */
function prune(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(prune);
  if (value && typeof value === "object") {
    const out: Doc = {};
    for (const [k, v] of Object.entries(value as Doc)) {
      if (k === "_id" || k === "updatedAt" || k === "createdAt" || k === "id" || k === "blockName") {
        continue;
      }
      out[k] = prune(v);
    }
    return out;
  }
  return value;
}

interface EmitState {
  lines: string[];
  mediaIdByOid: Map<string, number>;
  categoryIdByOid: Map<string, number>;
}

function oidOf(doc: Doc): string {
  return typeof doc._id === "string" ? doc._id : "";
}

/** Koleksiyonu _id sirasina gore sabit siraya alip 1..n id atar. */
function assignIds(docs: Doc[]): Map<Doc, number> {
  const sorted = [...docs].sort((a, b) => oidOf(a).localeCompare(oidOf(b)));
  const map = new Map<Doc, number>();
  sorted.forEach((doc, i) => map.set(doc, i + 1));
  return map;
}

function mediaIdOf(
  value: unknown,
  mediaIdByOid: Map<string, number>,
): number | null {
  if (typeof value !== "string") return null;
  return mediaIdByOid.get(value) ?? null;
}

function emitSql(collections: Map<string, Doc[]>): string {
  const lines: string[] = [
    "-- mongo -> D1 aktarim ciktisi. Once migrations/0001_schema.sql uygulanmalidir.",
    "-- Idempotent: mevcut satirlar korunur (INSERT OR IGNORE).",
  ];
  const counts: string[] = [];

  const mediaDocs = collections.get("media") ?? [];
  const mediaIds = assignIds(mediaDocs);
  const mediaIdByOid = new Map<string, number>();
  for (const doc of mediaDocs) {
    const id = mediaIds.get(doc) as number;
    if (oidOf(doc)) mediaIdByOid.set(oidOf(doc), id);
  }

  const categoryDocs = collections.get("categories") ?? [];
  const categoryIds = assignIds(categoryDocs);
  const categoryIdByOid = new Map<string, number>();
  for (const doc of categoryDocs) {
    const id = categoryIds.get(doc) as number;
    if (oidOf(doc)) categoryIdByOid.set(oidOf(doc), id);
  }

  // media
  if (mediaDocs.length > 0) {
    lines.push("", "-- media");
    for (const doc of mediaDocs) {
      const filename =
        typeof doc.filename === "string" && doc.filename
          ? doc.filename
          : typeof doc.url === "string"
            ? doc.url.split("/").pop() ?? ""
            : "";
      const url = typeof doc.url === "string" && doc.url ? doc.url : `/media/${filename}`;
      lines.push(
        insert(
          "media",
          ["id", "filename", "url", "alt"],
          [mediaIds.get(doc), filename, url, typeof doc.alt === "string" ? doc.alt : null],
        ),
      );
    }
    counts.push(`media: ${mediaDocs.length}`);
  }

  // categories
  if (categoryDocs.length > 0) {
    lines.push("", "-- categories");
    for (const doc of categoryDocs) {
      lines.push(
        insert(
          "categories",
          ["id", "name", "slug"],
          [categoryIds.get(doc), doc.name ?? "", doc.slug ?? ""],
        ),
      );
    }
    counts.push(`categories: ${categoryDocs.length}`);
  }

  // services
  const serviceDocs = collections.get("services") ?? [];
  if (serviceDocs.length > 0) {
    const ids = assignIds(serviceDocs);
    lines.push("", "-- services");
    serviceDocs.forEach((doc, index) => {
      lines.push(
        insert(
          "services",
          [
            "id",
            "slug",
            "title",
            "subtitle",
            "description",
            "long_description",
            "features",
            "process",
            "meta_title",
            "meta_description",
            "icon_media_id",
            "accent_color",
            "sort_order",
          ],
          [
            ids.get(doc),
            doc.slug ?? "",
            doc.title ?? "",
            doc.subtitle ?? "",
            doc.description ?? "",
            lexicalToText(doc.longDescription),
            doc.features === undefined || doc.features === null
              ? null
              : JSON.stringify(prune(doc.features)),
            doc.process === undefined || doc.process === null
              ? null
              : JSON.stringify(prune(doc.process)),
            doc.metaTitle ?? null,
            doc.metaDescription ?? null,
            mediaIdOf(doc.icon, mediaIdByOid),
            doc.accentColor ?? null,
            typeof doc.order === "number" ? doc.order : index + 1,
          ],
        ),
      );
    });
    counts.push(`services: ${serviceDocs.length}`);
  }

  // projects
  const projectDocs = collections.get("projects") ?? [];
  if (projectDocs.length > 0) {
    const ids = assignIds(projectDocs);
    lines.push("", "-- projects");
    projectDocs.forEach((doc, index) => {
      lines.push(
        insert(
          "projects",
          [
            "id",
            "slug",
            "title",
            "category",
            "services_tags",
            "results",
            "results_color",
            "logo_media_id",
            "logo_scale",
            "small_tags",
            "color",
            "sort_order",
          ],
          [
            ids.get(doc),
            doc.slug ?? "",
            doc.title ?? "",
            doc.category ?? "",
            doc.services === undefined || doc.services === null
              ? null
              : JSON.stringify(prune(doc.services)),
            doc.results ?? "",
            doc.resultsColor ?? null,
            mediaIdOf(doc.logo, mediaIdByOid),
            typeof doc.logoScale === "number" ? doc.logoScale : 1,
            doc.smallTags ? 1 : 0,
            doc.color ?? "",
            typeof doc.order === "number" ? doc.order : index + 1,
          ],
        ),
      );
    });
    counts.push(`projects: ${projectDocs.length}`);
  }

  // testimonials
  const testimonialDocs = collections.get("testimonials") ?? [];
  if (testimonialDocs.length > 0) {
    const ids = assignIds(testimonialDocs);
    lines.push("", "-- testimonials");
    testimonialDocs.forEach((doc, index) => {
      lines.push(
        insert(
          "testimonials",
          ["id", "name", "company", "role", "rating", "text", "image_media_id", "sort_order"],
          [
            ids.get(doc),
            doc.name ?? "",
            doc.company ?? "",
            doc.role ?? null,
            typeof doc.rating === "number" ? doc.rating : 5,
            doc.text ?? "",
            mediaIdOf(doc.image, mediaIdByOid),
            typeof doc.order === "number" ? doc.order : index + 1,
          ],
        ),
      );
    });
    counts.push(`testimonials: ${testimonialDocs.length}`);
  }

  // faqs
  const faqDocs = collections.get("faqs") ?? [];
  if (faqDocs.length > 0) {
    const ids = assignIds(faqDocs);
    lines.push("", "-- faqs");
    faqDocs.forEach((doc, index) => {
      lines.push(
        insert(
          "faqs",
          ["id", "question", "answer", "sort_order"],
          [
            ids.get(doc),
            doc.question ?? "",
            lexicalToText(doc.answer),
            typeof doc.order === "number" ? doc.order : index + 1,
          ],
        ),
      );
    });
    counts.push(`faqs: ${faqDocs.length}`);
  }

  // blog_posts
  const blogDocs = collections.get("blogposts") ?? [];
  if (blogDocs.length > 0) {
    const ids = assignIds(blogDocs);
    lines.push("", "-- blog_posts");
    blogDocs.forEach((doc) => {
      const categoryOid = typeof doc.category === "string" ? doc.category : null;
      lines.push(
        insert(
          "blog_posts",
          [
            "id",
            "slug",
            "title",
            "excerpt",
            "content",
            "published_date",
            "category_id",
            "featured_image_media_id",
            "meta_title",
            "meta_description",
          ],
          [
            ids.get(doc),
            doc.slug ?? "",
            doc.title ?? "",
            doc.excerpt ?? "",
            lexicalToHtml(doc.content),
            typeof doc.publishedDate === "string" ? doc.publishedDate.slice(0, 10) : null,
            categoryOid ? categoryIdByOid.get(categoryOid) ?? null : null,
            mediaIdOf(doc.featuredImage, mediaIdByOid),
            doc.metaTitle ?? null,
            doc.metaDescription ?? null,
          ],
        ),
      );
    });
    counts.push(`blog_posts: ${blogDocs.length}`);
  }

  // pages
  const pageDocs = collections.get("pages") ?? [];
  if (pageDocs.length > 0) {
    const ids = assignIds(pageDocs);
    lines.push("", "-- pages");
    for (const doc of pageDocs) {
      lines.push(
        insert(
          "pages",
          ["id", "slug", "title", "content", "meta_title", "meta_description"],
          [
            ids.get(doc),
            doc.slug ?? "",
            doc.title ?? "",
            doc.content === undefined || doc.content === null
              ? null
              : JSON.stringify(mapBlocks(doc.content as unknown[], mediaIdByOid)),
            doc.metaTitle ?? null,
            doc.metaDescription ?? null,
          ],
        ),
      );
    }
    counts.push(`pages: ${pageDocs.length}`);
  }

  // settings (globals). Payload 3.x globals koleksiyonu globalType alanini
  // kullanir; ayri <slug> koleksiyonlari varsa onlar oncelidir.
  const globalKeys: Array<[string, string]> = [
    ["sitesettings", "siteSettings"],
    ["navigation", "navigation"],
    ["footer", "footer"],
  ];
  const globalsDocs = collections.get("globals") ?? [];
  const byGlobalType = new Map<string, Doc>();
  for (const doc of globalsDocs) {
    const type = typeof doc.globalType === "string" ? doc.globalType : "";
    if (type && !byGlobalType.has(type)) byGlobalType.set(type, doc);
  }
  const settingRows: Array<[string, unknown]> = [];
  for (const [src, key] of globalKeys) {
    const direct = collections.get(src) ?? [];
    const doc = direct[0] ?? byGlobalType.get(key);
    if (!doc) continue;
    settingRows.push([key, mapGlobal(doc, mediaIdByOid)]);
  }
  if (settingRows.length > 0) {
    lines.push("", "-- settings (globals)");
    for (const [key, value] of settingRows) {
      lines.push(insert("settings", ["key", "value"], [key, JSON.stringify(value)]));
    }
    counts.push(`settings: ${settingRows.length}`);
  }

  // contact_submissions
  const submissionDocs = collections.get("contactsubmissions") ?? [];
  if (submissionDocs.length > 0) {
    const ids = assignIds(submissionDocs);
    lines.push("", "-- contact_submissions");
    for (const doc of submissionDocs) {
      lines.push(
        insert(
          "contact_submissions",
          ["id", "name", "email", "phone", "service", "message", "read", "ip", "created_at"],
          [
            ids.get(doc),
            doc.name ?? "",
            doc.email ?? "",
            doc.phone ?? null,
            doc.service ?? null,
            doc.message ?? "",
            doc.read ? 1 : 0,
            null,
            typeof doc.createdAt === "string" ? doc.createdAt : null,
          ],
        ),
      );
    }
    counts.push(`contact_submissions: ${submissionDocs.length}`);
  }

  for (const [name, docs] of collections) {
    if (!COLLECTIONS.has(name)) counts.push(`${name} (yoksayildi): ${docs.length}`);
  }

  return `${lines.join("\n")}\n`;
}

function mapBlocks(blocks: unknown[], mediaIdByOid: Map<string, number>): unknown[] {
  return blocks.map((block) => mapBlock(block, mediaIdByOid));
}

function mapBlock(block: unknown, mediaIdByOid: Map<string, number>): unknown {
  if (!block || typeof block !== "object") return block;
  const b = block as Doc;
  const out: Doc = { blockType: b.blockType };
  for (const [key, value] of Object.entries(b)) {
    if (key === "id" || key === "blockName" || key === "blockType" || key === "_id") continue;
    out[key] = mapBlockField(key, value, mediaIdByOid);
  }
  return out;
}

function mapBlockField(key: string, value: unknown, mediaIdByOid: Map<string, number>): unknown {
  if (key === "content" || key === "description") return lexicalToText(value);
  if (key === "image" || key === "icon") return mediaIdOf(value, mediaIdByOid);
  if (
    key === "selectedServices" ||
    key === "selectedPortfolios" ||
    key === "selectedTestimonials" ||
    key === "selectedFaqs"
  ) {
    if (!Array.isArray(value)) return null;
    return value.map((v) => (typeof v === "string" ? v : null)).filter((v) => v !== null);
  }
  return prune(value);
}

function mapGlobal(doc: Doc, mediaIdByOid: Map<string, number>): unknown {
  const out: Doc = {};
  for (const [key, value] of Object.entries(doc)) {
    if (key === "_id" || key === "updatedAt" || key === "createdAt" || key === "globalType") continue;
    if (key === "logo" || key === "favicon") {
      out[key] = mediaIdOf(value, mediaIdByOid);
      continue;
    }
    out[key] = prune(value);
  }
  return out;
}

// ---------- Giris ----------

function parseArgs(argv: string[]): { input: string | null; out: string | null; help: boolean } {
  let input: string | null = null;
  let out: string | null = null;
  let help = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") help = true;
    else if (arg === "--out") out = argv[++i] ?? null;
    else if (arg === "--out=X") out = arg.slice("--out=".length);
    else if (!arg.startsWith("--") && input === null) input = arg;
  }
  return { input, out, help };
}

async function main() {
  const { input, out, help } = parseArgs(process.argv.slice(2));
  if (help || !input) {
    console.log(usage());
    process.exit(help ? 0 : 1);
  }
  const collections = loadDocs(input);
  const sql = emitSql(collections);
  if (out) {
    const dir = path.dirname(path.resolve(out));
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(out, sql);
    console.error(`SQL yazildi: ${out}`);
  } else {
    process.stdout.write(sql);
  }
  for (const [name, docs] of collections) {
    console.error(`${name}: ${docs.length} belge`);
  }
}

main().catch((e: unknown) => {
  console.error("Hata:", e instanceof Error ? e.message : e);
  process.exit(1);
});
