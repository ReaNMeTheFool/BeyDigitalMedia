# Gates: Leaf 1.1.2 — Payload removal + D1 data layer

Scope: Remove Payload/mongoose/sharp and all payload routes/deps; add src/types/content.ts, src/lib/db.ts, src/lib/content-defaults.ts, src/lib/content.ts, migrations (schema+seed), scripts/migrate-mongo-to-d1.ts. Pages still compile via the kept src/payload-types.ts (deleted in leaf 3).

- [ ] G1: No payload/mongoose/sharp runtime imports remain in src/ (payload-types.ts and src/app/(payload) excepted until leaf 3).
  CHECK: grep -rEn "from ['\"](payload|@payloadcms|mongoose|sharp)" src/ --include="*.ts" --include="*.tsx" | grep -v "payload-types" | grep -v "app/(payload)" | wc -l
  EXPECT: /^0$/
  EVIDENCE: pending

- [ ] G2: Payload directories removed: src/payload/**, src/payload.config.ts, src/app/(payload)/**; deps removed from package.json (payload, @payloadcms/*, mongodb/mongoose, sharp) and package-lock regenerated.
  CHECK: ls src/payload src/payload.config.ts "src/app/(payload)" 2>&1 | head -3; grep -cE '"(payload|mongoose|sharp|@payloadcms)' package.json
  EXPECT: /No such file/ and /^0$/
  EVIDENCE: pending

- [ ] G3: src/types/content.ts exports the full contracted surface (all 9 doc types, 12 block types, 3 globals, MediaRef) with richText fields as string.
  CHECK: for t in Service Project Testimonial Faq BlogPost Category Page ContactSubmission MediaRef HeroBlock MarqueeBlock ServicesGridBlock PortfolioSliderBlock TestimonialsCarouselBlock FaqAccordionBlock AboutBlock AiAutomationBlock WhyUsBlock PricingBlock PartnerBadgesBlock CtaBlock SiteSettings Navigation Footer; do grep -qE "export (type|interface) $t\b" src/types/content.ts || echo "MISSING:$t"; done
  EXPECT: no MISSING lines
  EVIDENCE: pending

- [ ] G4: src/lib/content.ts exports every contracted function.
  CHECK: for f in getSiteSettings getNavigation getFooter getHomePage getPage listServices getService listProjects getProject listTestimonials listFaqs listBlogPosts getBlogPost listCategories listMedia getMedia createContactSubmission countRecentSubmissions listContactSubmissions markSubmissionRead upsertService deleteService upsertProject deleteProject upsertTestimonial deleteTestimonial upsertFaq deleteFaq upsertBlogPost deleteBlogPost upsertSettings createMedia reorder; do grep -qE "export (async )?(function|const) $f\b" src/lib/content.ts || echo "MISSING:$f"; done
  EXPECT: no MISSING lines
  EVIDENCE: pending

- [ ] G5: Schema has all 10 tables and loads into local D1; seed populates 9 services, 5 projects, 5 testimonials, 6 faqs, 2 pages, 3 settings.
  CHECK: npx wrangler d1 execute DB --local --file migrations/0001_schema.sql && npx wrangler d1 execute DB --local --file migrations/0002_seed.sql && npx wrangler d1 execute DB --local --command "SELECT (SELECT COUNT(*) FROM services)||'/'||(SELECT COUNT(*) FROM projects)||'/'||(SELECT COUNT(*) FROM testimonials)||'/'||(SELECT COUNT(*) FROM faqs)||'/'||(SELECT COUNT(*) FROM pages)||'/'||(SELECT COUNT(*) FROM settings)"
  EXPECT: /9\/5\/5\/6\/2\/3/
  EVIDENCE: pending

- [ ] G6: scripts/migrate-mongo-to-d1.ts exists and prints usage with --help; code compiles.
  CHECK: npx tsx scripts/migrate-mongo-to-d1.ts --help 2>&1 | head -5
  EXPECT: /usage|Usage|mongodump/
  EVIDENCE: pending

- [ ] G7: Type-check passes with old pages still on payload-types (kept file), and content.ts/db.ts introduce no new type errors.
  CHECK: npx tsc --noEmit 2>&1 | tail -3
  EXPECT: exit code 0 (empty output)
  EVIDENCE: pending
