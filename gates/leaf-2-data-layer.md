# Gates: Leaf 1.1.2 — D1 data layer (additive only)

Scope: Additive only — create src/types/content.ts, src/lib/db.ts, src/lib/content-defaults.ts, src/lib/content.ts, migrations 0001 (schema) + 0002 (seed), scripts/migrate-mongo-to-d1.ts. NO deletions, NO dep changes, NO edits to existing app files (pages keep compiling against the untouched Payload tree; src/payload-types.ts stays until leaf 1.2.1).

- [ ] G1: src/types/content.ts exports the full contracted surface (all 9 doc types, 12 block types, 3 globals, MediaRef) with richText fields as string.
  CHECK: for t in Service Project Testimonial Faq BlogPost Category Page ContactSubmission MediaRef HeroBlock MarqueeBlock ServicesGridBlock PortfolioSliderBlock TestimonialsCarouselBlock FaqAccordionBlock AboutBlock AiAutomationBlock WhyUsBlock PricingBlock PartnerBadgesBlock CtaBlock SiteSettings Navigation Footer; do grep -qE "export (type|interface) $t\b" src/types/content.ts || echo "MISSING:$t"; done
  EXPECT: no MISSING lines
  EVIDENCE: pending

- [ ] G2: src/lib/content.ts exports every contracted function.
  CHECK: for f in getSiteSettings getNavigation getFooter getHomePage getPage listServices getService listProjects getProject listTestimonials listFaqs listBlogPosts getBlogPost listCategories listMedia getMedia createContactSubmission countRecentSubmissions listContactSubmissions markSubmissionRead upsertService deleteService upsertProject deleteProject upsertTestimonial deleteTestimonial upsertFaq deleteFaq upsertBlogPost deleteBlogPost upsertSettings createMedia reorder; do grep -qE "export (async )?(function|const) $f\b" src/lib/content.ts || echo "MISSING:$f"; done
  EXPECT: no MISSING lines
  EVIDENCE: pending

- [ ] G3: Schema has all 10 tables and loads into local D1; seed populates 9 services, 5 projects, 5 testimonials, 6 faqs, 2 pages, 3 settings.
  CHECK: npx wrangler d1 execute DB --local --file migrations/0001_schema.sql && npx wrangler d1 execute DB --local --file migrations/0002_seed.sql && npx wrangler d1 execute DB --local --command "SELECT (SELECT COUNT(*) FROM services)||'/'||(SELECT COUNT(*) FROM projects)||'/'||(SELECT COUNT(*) FROM testimonials)||'/'||(SELECT COUNT(*) FROM faqs)||'/'||(SELECT COUNT(*) FROM pages)||'/'||(SELECT COUNT(*) FROM settings)"
  EXPECT: /9\/5\/5\/6\/2\/3/
  EVIDENCE: pending

- [ ] G4: scripts/migrate-mongo-to-d1.ts exists and prints usage with --help; code compiles.
  CHECK: npx tsx scripts/migrate-mongo-to-d1.ts --help 2>&1 | head -5
  EXPECT: /usage|Usage|mongodump/
  EVIDENCE: pending

- [ ] G5: New files type-check clean and introduce no new errors; existing tree untouched (git shows only additions + migrations + script).
  CHECK: npx tsc --noEmit && git diff --name-only HEAD | grep -vE "^(src/types/content\.ts|src/lib/(db|content|content-defaults)\.ts|migrations/|scripts/migrate-mongo-to-d1\.ts)$" | grep -v "^gates/" | grep -v "^PLAN.md" | wc -l
  EXPECT: exit 0 and /^0$/
  EVIDENCE: pending
