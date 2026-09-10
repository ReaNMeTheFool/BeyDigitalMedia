-- 0001: D1 semasi (10 tablo). JSON tipli kolonlar SQLite'ta TEXT olarak tutulur.

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  long_description TEXT,
  features TEXT, -- JSON: { title, description }[]
  process TEXT, -- JSON: { step, title, description }[]
  meta_title TEXT,
  meta_description TEXT,
  icon_media_id INTEGER,
  accent_color TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  category TEXT,
  services_tags TEXT, -- JSON: { label, slug, breakBefore }[]
  results TEXT,
  results_color TEXT,
  logo_media_id INTEGER,
  logo_scale REAL DEFAULT 1,
  small_tags INTEGER DEFAULT 0,
  color TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  company TEXT,
  role TEXT,
  rating INTEGER DEFAULT 5,
  text TEXT,
  image_media_id INTEGER,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT,
  answer TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  excerpt TEXT,
  content TEXT, -- HTML
  published_date TEXT,
  category_id INTEGER,
  featured_image_media_id INTEGER,
  meta_title TEXT,
  meta_description TEXT
);

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT, -- JSON: PageBlock[]
  meta_title TEXT,
  meta_description TEXT
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT UNIQUE NOT NULL,
  url TEXT,
  alt TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT -- JSON
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  service TEXT,
  message TEXT,
  read INTEGER DEFAULT 0,
  ip TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
