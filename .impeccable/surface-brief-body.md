# Surface brief — full-site redesign (primary target: homepage)

## Scope and mode

Whole site: homepage (primary), 9 service pages, portfolio detail, about, contact, blog shell, 404. Visitor mode: Persuade. Code-led build (no image generation available on this machine); every stamp, rule, and form is drawn in CSS/SVG, no raster dependencies.

## Audience, job, action, proof

Turkish SMB owners, skeptical, mobile-heavy. Job: decide whether Bey Digital Media gets the marketing spend. Action: Ücretsiz Teklif Al → existing contact form server action (persists to `contactSubmissions`, Resend notification). Proof: real stats (150+/100+/8+/%100), 5 testimonials, 5 portfolio metrics with client logos, anonymized campaign data. Nothing invented; blog stays empty until real articles exist.

## Constraints

Keep untouched: Payload CMS wiring and collections, server actions, SEO infrastructure (JSON-LD, sitemap, canonical/OG), Turkish copy verbatim from CMS/seed, logo as-is, canonical contact identity, Payload admin. No "Bursa" anywhere in site copy. Anti-goals: agency-template cliché, avant-garde overload, hype/hard-sell devices, SaaS-dashboard feel. Stack: Next.js 16, Tailwind 4, framer-motion available.

## Chosen direction and memorable moment

Fatura & Kaşe (assigned grounded candidate 5 of 7, seed 16ad156d): the site as the agency's official document system — serial headers, dotted ledger rules, line-item results, kaşe stamp impressions, founder signature on every proof document. Memorable moment: the result-certificate first viewport closing with the founder's signature line and the single red TEKLİF AL stamp.

## Unresolved decisions (committed at build)

Exact typefaces (fiscal-form character, outside the banned default list), concrete IA restructure, motion split between CSS and framer-motion. Nothing else open.

## Direction contract

THESIS: The site is a cabinet of certified results — every claim ships as an official Turkish fiscal document; the dark-hero-plus-gradient agency default is refused.

OWN-WORLD: Form-paper ground, document ink, kaşe violet, one action red; banko rules, dotted leaders, serial numbers, pressed stamps, tabular numerals; sturdy grotesque caps, typewriter mono details.

STORY: The visitor reads a result certificate, trusts numbers entered like a ledger, and signs the quote request.

FIRST VIEWPORT: Homepage as the result certificate: serial header with logo and index nav; headline as document title; four real stats as ruled line items; one full-scale kaşe impression; founder signature line; red TEKLİF AL stamp inside the viewport.

FORM: Assigned grounded candidate 5 of 7, seed key 16ad156d. Signature interaction: the stamp press — stamps apply under visible pressure and rest as ink; sections change through perforation and pull-tab transitions.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
