---
name: Bey Digital Media
description: Fatura & Kaşe — a Turkish digital-marketing agency site where every claim ships as a certified document
colors:
  form-paper: "#f6f4ec"
  form-paper-alt: "#eceade"
  document-ink: "#14162b"
  kase-violet: "#4340b0"
  action-red: "#c8341f"
  pencil-gray: "#6f6a60"
typography:
  display:
    fontFamily: "var(--font-archivo), Archivo, system-ui, sans-serif"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-archivo), Archivo, system-ui, sans-serif"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-courier), 'Courier Prime', ui-monospace, monospace"
    fontWeight: 700
    fontSize: "0.6875rem"
    letterSpacing: "0.14em"
    lineHeight: 1.4
rounded:
  sm: "3px"
  none: "0px"
components:
  button-action:
    backgroundColor: "{colors.action-red}"
    textColor: "{colors.form-paper}"
    typography: "700 0.875rem {typography.display.fontFamily}, uppercase, tracking 0.14em"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-action-hover:
    backgroundColor: "{colors.action-red}"
  button-ink:
    backgroundColor: "transparent"
    textColor: "{colors.document-ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.document-ink}"
    rounded: "{rounded.none}"
    padding: "8px 0px"
  chip-tag:
    backgroundColor: "{colors.form-paper}"
    textColor: "{colors.document-ink}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: Bey Digital Media

## Overview

**Creative North Star: "Fatura & Kaşe — every claim is a certified document"**

The site is the agency's official paperwork. Each page is one document with a type (Sonuç Belgesi, Hizmet Föyü, Bitmiş İş Belgesi, Teklif Talebi, Arşiv Kayıtları), a serial strip, ruled sections, verification stamps, and a signature. The visitor reads a result certificate, trusts numbers entered like a ledger, and signs the quote request. The dark-hero-and-gradient agency look this replaced is the standing anti-reference.

Density is form-like: generous white paper between dense, ruled rows. Expression lives in document furniture — dotted leaders, perforation tears, stamp impressions — never in decoration. All stamps, rules, and leaders are CSS/SVG; the system uses zero raster assets.

**Key Characteristics:**
- Serial-numbered pages: every template opens with `SERİ NO BDM-…` and a document-type label
- Ledger rows (label → dotted leader → mono tabular value) carry every number
- Kaşe stamps read as pressed ink (turbulence-masked, multiply-blended), never as badges
- Exactly one red element per viewport: the action stamp
- Sections tear apart along perforation dividers, alternating paper / paper-alt grounds

## Colors

The palette is fiscal paperwork: two papers, one ink, one stamp violet, one action red, one pencil.

### Primary
- **Document Ink** (#14162b): all text, 1px rules, borders, the ink stamp variant, focus rings, and the near-black record tiles in the footer/contact sidebars. This is the only "dark" the system owns.
- **Kaşe Violet** (#4340b0): stamp ink, links, accent words inside display headlines, selection background, star ratings, CMS legacy accent remaps. Violet is ink that stamps — it may decorate proof, never actions.

### Secondary
- **Action Red** (#c8341f): the single red. Appears only as the action stamp (TEKLİF AL, form submit, primary CTA on 404) and true error/attention states. See The One Red Rule.

### Neutral
- **Form Paper** (#f6f4ec): the page ground everywhere (`html`, `body`, cards, nav).
- **Form Paper Alt** (#eceade): alternate section panels and form/document panels that sit on paper.
- **Pencil Gray** (#6f6a60): secondary copy, field placeholders, quiet labels, the non-ink monochrome marks.

### Named Rules
**The One Red Rule.** Red is a permission, not a color: one red element per viewport, and it is always the conversion action. The footer form submit may share a page bottom with a CTA section because both are the same single action. Navbar CTA is therefore the ink variant. Red dots, red separators, red decoration: forbidden.

**The Remap Rule.** Accent spans arriving from CMS content (legacy hexes `#ffd76e`, `#4c7fff`, `#0040ff`, `#8b5cf6`) render as Kaşe Violet via globals.css. Copy is never edited to match the palette; the palette absorbs the copy.

## Typography

**Display/Body Font:** Archivo (variable, next/font, latin-ext) — sturdy grotesque.
**Label/Mono Font:** Courier Prime (next/font, latin-ext) — typewriter.

**Character:** A printed form: loud grotesque caps where the document declares itself, typewriter mono where a machine would have typed. No serif display face anywhere.

### Hierarchy
- **Display** (Archivo 900, uppercase, clamp ~2.5–5rem, line-height 1.05, tracking −0.02em): document titles ("DİJİTAL KAZANCINIZI ÇÖZÜMLERİ", "WEB TASARIM"). Accent words set in Kaşe Violet, optionally underlined with a dotted rule.
- **Headline** (Archivo 800–900, 1.5–2rem): section titles ("HİZMETLERİMİZ", "MERAK ETTİKLERİNİZ").
- **Title** (Archivo 700, 1–1.25rem): card and document-panel titles ("Mesaj Gönder", "Misyonumuz").
- **Body** (Archivo 400, 1rem/1.6, max ~65ch): articles and descriptions, in Pencil Gray inside panels, Ink on open paper.
- **Label** (Courier Prime 700, 11px, tracking 0.12–0.2em, uppercase): serial numbers, form labels, document-type markers, chips, footer column heads. Numbers are always mono with `tabular-nums` (set globally on `body`).

### Named Rules
**The Turkish Caps Rule.** Uppercase display text relies on `lang="tr"` for correct i→İ; never hand-upcase Turkish strings.

## Layout

Single-column document flow on a centered container (`max-w-5xl`–`max-w-6xl`, padding `px-4 sm:px-6 lg:px-8`). Sections are full-width document panels alternating `form-paper` / `form-paper-alt`, separated by the PerforationDivider (punched semicircles in the previous panel's ground + dashed tear rule). Anchor targets carry `scroll-margin-top: 88px` under the fixed-height nav strip. Responsive: multi-column ledgers and certificate grids collapse to a single column below `lg`; the mobile nav is a full-paper overlay menu. Spacing uses Tailwind's default scale; rhythm is section-level (large paper gaps between documents), not card-level.

## Elevation & Depth

The system is flat paper with exactly one resting shadow. Depth is conveyed by layering documents on the page (alt-paper panels, bordered frames), by the multiply-blended stamp ink sitting *in* the paper, and by perforation cuts — not by elevation.

### Shadow Vocabulary
- **--shadow-doc** (`0 1px 2px rgba(20, 22, 43, 0.08), 0 14px 28px -20px rgba(20, 22, 43, 0.4)`): the single resting shadow under lifted documents (framed logo plates, the 404 sheet). Never animated, never stacked, never used as hover glow.

### Named Rules
**The Flat Paper Rule.** Surfaces are flat at rest. Shadows appear only where a physical sheet would sit on the page, once, with --shadow-doc. No hover elevation, no glass, no gradient grounds.

## Shapes

Document corners: `rounded-[3px]` (3px) is the maximum radius — cards, frames, chips, inputs. Buttons are square (0 radius). Stamps are circular (SVG). Rules are 1px ink lines or dashed tears; leaders are dotted radial-gradient strips (`.dots-leader`, 7px period). Frame borders are `border-ink/40` 1px; action stamps double their border with an inset paper ring instead of a thicker outline.

## Components

### Buttons — ActionStamp (`src/components/document/ActionStamp.tsx`)
- **Shape:** square corners, double-ring border (2.5px red + inset 2px paper ring on the red variant; 2px ink on the ink variant)
- **Primary (action):** Action Red fill, paper text, Archivo 700 uppercase, tracking 0.14em; hover brightens (`brightness-110`); press translates 1px down and scales 0.98
- **Secondary (ink):** transparent on paper, ink border and text; hover fills ink and flips text to paper
- **Semantics:** real `<a>`/`<Link>`/`<button type="submit">` — the stamp is a skin, never a styled div

### Kaşe Stamp (`src/components/document/KaseStamp.tsx`)
- **Style:** double-ring circular SVG (4px + 1.5px rings), Courier Prime text on a circular textPath, Archivo center initials, rotated ~−8°
- **Ink treatment:** `.kase-ink` turbulence mask + `mix-blend-mode: multiply` so it reads pressed into the paper
- **Motion:** press-in on first view (scale 1.16 → 0.985 → 1, ~0.28s, once); static under `prefers-reduced-motion`
- **A11y:** `aria-hidden` with optional sr-only duplicate of the stamp text

### Ledger Row (`src/components/document/LedgerRow.tsx`)
- **Style:** uppercase label (Archivo or mono, Pencil Gray) → `.dots-leader` → mono bold tabular value in Ink; 1px ink/20 separators between rows

### Serial Strip (`src/components/document/SerialStrip.tsx`)
- **Style:** `SERİ NO` + bold mono serial (BDM-{year}-{id}) → dotted leader → mono document-type label; opens every template and the footer colophon

### Inputs / Fields (`src/components/ui/ContactForm.tsx` shell)
- **Style:** transparent background, no box; dashed ink underline at rest, solid ink underline on focus; mono uppercase labels above; placeholders in Pencil Gray
- **Error / Success:** validation errors in Action Red; success confirmation is a violet double-keyline stamped panel

### Navigation
- **Fihrist strip:** paper ground, bottom 1px rule, numbered mono entries (01–09), active page underlined in ink; CTA is the ink ActionStamp; mobile overlay menu on form paper with the red action stamp
- **Footer colophon:** perforation top edge, serial strip, paper document panel for the form, index-style link columns, signature in the bottom bar

## Do's and Don'ts

### Do:
- **Do** open every new template with a SerialStrip and a document-type label; give the page its document name (Hizmet Föyü, Teklif Talebi, …).
- **Do** set every number as a ledger row: label → dots-leader → Courier Prime tabular value.
- **Do** keep stamps pressed: any new stamp uses `.kase-ink` (turbulence mask + multiply), a double ring, and a slight rotation.
- **Do** alternate section grounds paper / paper-alt and separate them with PerforationDivider (tone must match the previous panel).
- **Do** keep one red per viewport and make it the conversion action.

### Don't:
- **Don't** introduce gradients, glassmorphism, dark section grounds, or rounded-2xl SaaS cards; the anti-reference is the old dark agency look.
- **Don't** use a serif display face, terracotta accents, or any red that is not the action stamp.
- **Don't** add entrance animations that hide content; content is visible by default, motion is press/tear feedback only, and `prefers-reduced-motion` renders everything static.
- **Don't** add decorative kickers/eyebrows; the world's small mono labels are functional document fields (serials, form labels, document-type markers) — a label must name a real thing on the document.
- **Don't** edit CMS copy to fit the palette; extend the Remap Rule instead.
