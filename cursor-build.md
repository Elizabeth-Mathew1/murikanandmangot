# Cursor Build Prompt — Murikan & Mangot

Build an Astro 5 static site for a law firm called "Murikan & Mangot" based on
the attached Claude Design exports and the specifications below. The site must be
production-ready, fast, SEO-optimised, and eventually deployable to Hostinger
shared hosting via GitHub.

---

## Project overview

**Firm:** Murikan & Mangot — advocates in Ernakulam, Kochi, Kerala, India,
practising before the High Court of Kerala.

**Practice areas:** Property & Land, Corporate & Commercial, Family & Succession,
Disputes & Litigation.

**Audience:** Individuals and businesses in Kerala searching for legal counsel.

**Personality:** Established, trustworthy, prestigious — but warm and human,
plain-spoken, never stuffy or aggressive. Deliberately avoids the generic
navy-and-gold corporate-law cliché.

**Brand concept:** Prestigious & classic — charcoal, antique gold, ivory, serif
headlines, generous whitespace, thin gold hairline rules, calm and editorial.

**Compliance:** Indian Bar Council rules restrict lawyer advertising. All copy
must be informational and measured: no "best", no superlatives, no client
testimonials or endorsements, no promises of outcomes. Every page footer must
include: "In keeping with Bar Council of India rules, this site is for
information only and is not an advertisement or solicitation."

---

## Critical rules

- Zero client-side JavaScript unless explicitly noted. Every component is .astro,
  not React/Vue/Svelte. The only JS allowed is a tiny inline script for the
  mobile menu toggle.
- Self-host fonts. Download EB Garamond 500 and Montserrat 400+500 as .woff2 from
  google-webfonts-helper and place in public/fonts/. Load via @font-face in
  tokens.css with font-display: swap. Do NOT link to Google Fonts CDN.
- All colours, type sizes, spacing, and radii live in src/styles/tokens.css as CSS
  custom properties. Never hard-code a hex or px value in a component — always
  reference a token.
- Use Astro content collections for practice areas, people, and insights (articles).
  Define Zod schemas in src/content/config.ts.
- Generate fully static HTML at build. No SSR, no adapter.

---

## Folder structure

```
murikan-mangot/
├── public/
│   ├── fonts/
│   │   ├── eb-garamond-v27-latin-500.woff2
│   │   ├── montserrat-v26-latin-regular.woff2
│   │   └── montserrat-v26-latin-500.woff2
│   ├── images/
│   │   ├── hero/              ← hero photos (2–3 max)
│   │   ├── people/            ← attorney portraits
│   │   ├── office/            ← office and Kochi photos
│   │   └── og-image.jpg       ← social sharing fallback
│   ├── favicon.svg
│   ├── robots.txt
│   └── .htaccess
│
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CredibilityStrip.astro
│   │   ├── SectionHeading.astro
│   │   ├── PracticeAreaCard.astro
│   │   ├── PersonCard.astro
│   │   ├── ArticleCard.astro
│   │   ├── CtaBand.astro
│   │   ├── ContactForm.astro
│   │   └── SEO.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── practice-areas/
│   │   │   └── [slug].astro
│   │   ├── people/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── insights/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   │
│   ├── content/
│   │   ├── config.ts
│   │   ├── practice-areas/
│   │   │   ├── property-and-land.md
│   │   │   ├── corporate-and-commercial.md
│   │   │   ├── family-and-succession.md
│   │   │   └── disputes-and-litigation.md
│   │   ├── people/
│   │   │   ├── partner-one.md
│   │   │   └── partner-two.md
│   │   └── insights/
│   │       └── (article markdown files)
│   │
│   └── styles/
│       ├── tokens.css
│       └── global.css
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Design system tokens (src/styles/tokens.css)

```css
:root {
  /* Colour */
  --color-ink: #1E1B19;
  --color-hero-overlay: #2A2622;
  --color-gold: #B0894B;
  --color-gold-light: #C9A35C;
  --color-gold-deep: #8A6A2E;
  --color-ivory: #F4EFE4;
  --color-body: #3A3531;
  --color-muted: #6E665E;
  --color-card-bg: #FFFFFF;
  --color-card-border: #E6DECC;
  --color-gold-hairline: #D9C9A0;
  --color-text-on-dark: #E8E0D2;
  --color-muted-on-dark: #B5AB99;

  /* Typography */
  --font-heading: 'EB Garamond', Georgia, serif;
  --font-body: 'Montserrat', system-ui, sans-serif;
  --text-hero: clamp(2.5rem, 5vw, 3.75rem);
  --text-h2: clamp(1.75rem, 3vw, 2.25rem);
  --text-h3: clamp(1.15rem, 2vw, 1.3rem);
  --text-body: 1rem;
  --text-caption: 0.8125rem;
  --text-eyebrow: 0.75rem;
  --leading-tight: 1.2;
  --leading-body: 1.6;

  /* Spacing (8px scale) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --section-padding: clamp(4rem, 8vw, 6rem);

  /* Misc */
  --radius-card: 10px;
  --radius-button: 6px;
  --max-width: 1200px;
}
```

---

## Layouts

### BaseLayout.astro
The `<html>` shell. Includes:
- `<head>` with charset, viewport, preload hints for the two .woff2 files,
  the SEO component slot, and tokens.css + global.css imports.
- `<body>` with a `<slot/>` for page content.
- Inline @font-face declarations or import from tokens.css.

### PageLayout.astro
Wraps BaseLayout. Adds Nav and Footer around a `<main>` slot. Accepts a prop
`transparentNav` (boolean, default false) — true only on the homepage so the
nav overlays the hero.

### ArticleLayout.astro
Wraps PageLayout. Adds a max-width prose container (`max-width: 720px`,
centered), article-specific typography refinements (larger body text, styled
blockquotes), and Article schema markup.

---

## Components

### Nav.astro
Sticky top navigation. When `transparentNav` is true, the nav is transparent
and overlays the hero with white text; it transitions to solid ivory on scroll
(use a tiny inline `IntersectionObserver` script — this is allowed). On other
pages, it's solid ivory from the start. Contains: wordmark "Murikan & Mangot"
in EB Garamond on the left; links — About, Practice Areas, People, Insights,
Contact; a gold-outline "Talk to us" button on the right. On mobile (below
768px): collapse links into a hamburger icon → slide-in drawer. This is the
one allowed inline JS.

### Footer.astro
Charcoal background. Four-column grid on desktop, stacked on mobile:
1. Firm name + "Advocates · Ernakulam, Kochi, Kerala"
2. Phone + email (gold icon accents)
3. Quick nav links (About, Practice Areas, People, Insights, Contact)
4. (Optional) Google Maps mini embed or office photo

Bottom row: BCI disclaimer line + "© {currentYear} Murikan & Mangot. All rights
reserved."

### Hero.astro
Full-bleed section. Uses a `<picture>` element with srcset (800w, 1200w, 1920w)
and .webp source with .jpg fallback. CSS gradient overlay using
var(--color-hero-overlay) at 65% opacity. Overlaid content: gold uppercase
eyebrow, EB Garamond h1, Montserrat subtext, two buttons (primary gold-fill
+ secondary white-outline). Props: `image`, `eyebrow`, `headline`, `subtext`,
`cta1Label`, `cta1Href`, `cta2Label`, `cta2Href`.

### CredibilityStrip.astro
Slim charcoal band below the hero. Three items with gold icons: "Practising
before the High Court of Kerala", "Established [year]", "Kochi · Ernakulam".
Flex row on desktop, stacked on mobile.

### SectionHeading.astro
Reusable section header. Gold uppercase eyebrow (Montserrat, 12px, 0.08em
letter-spacing) + EB Garamond h2 + a 34px-wide, 2px gold underline bar below.
Props: `eyebrow`, `heading`. Optionally accepts `align` (left | center).

### PracticeAreaCard.astro
White card with var(--color-card-border) border and var(--radius-card) radius.
Contains: a line icon (use a simple inline SVG or an icon from a lightweight
set like Tabler Icons — do NOT install a heavy icon library), serif title, one
plain-language sentence, and a "Learn more →" text link in gold. Props derived
from content collection frontmatter: `title`, `slug`, `icon`, `summary`.

### PersonCard.astro
Portrait image (loading="lazy", border-radius 8px), name in EB Garamond, role
in gold, one-line focus area, link to full profile. Props from people collection.

### ArticleCard.astro
Category tag (gold text), title in EB Garamond, date, short excerpt, link.
Props from insights collection.

### CtaBand.astro
Full-width charcoal section. One serif line ("Ready to discuss your matter?")
centered, with a gold "Book a consultation" button below.

### ContactForm.astro
Static HTML form. Wire the `action` attribute to Formspree (use a placeholder
endpoint URL that I'll replace with my real one). Fields: name (text), email
(email), phone (tel), matter type (select dropdown with options: Property &
Land, Corporate & Commercial, Family & Succession, Disputes & Litigation,
Other), message (textarea), submit button (gold). Style labels in Montserrat,
inputs with var(--color-card-border) borders.

### SEO.astro
Receives props: `title`, `description`, `canonicalUrl`, `ogImage`, `schema`.
Outputs in `<head>`:
- `<title>{title} | Murikan & Mangot</title>`
- `<meta name="description" content={description} />`
- `<link rel="canonical" href={canonicalUrl} />`
- Open Graph: og:title, og:description, og:image, og:url, og:type
- Twitter card: summary_large_image
- `<script type="application/ld+json">` with the passed schema object.

Default schema (used on most pages):
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Murikan & Mangot",
  "description": "Law firm in Ernakulam, Kochi, Kerala",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ernakulam",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "9.9816",
    "longitude": "76.2999"
  },
  "areaServed": "Kerala, India",
  "telephone": "+91-XXXXX-XXXXX",
  "url": "https://murikanmangot.in"
}
```

Attorney pages add:
```json
{
  "@type": "Attorney",
  "name": "...",
  "jobTitle": "...",
  "worksFor": { "@type": "LegalService", "name": "Murikan & Mangot" },
  "alumniOf": "...",
  "knowsLanguage": ["English", "Malayalam"]
}
```

Article pages add:
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "...",
  "publisher": { "@type": "LegalService", "name": "Murikan & Mangot" }
}
```

---

## Content collections (src/content/config.ts)

Define three collections with Zod:

### practiceAreas
- `title`: string
- `slug`: string
- `icon`: string (icon identifier, e.g. "home", "briefcase", "users", "scale")
- `summary`: string (one sentence, plain language)
- `order`: number
- Body: Markdown

### people
- `name`: string
- `slug`: string
- `role`: string
- `photo`: string (path relative to public/images/people/)
- `focusAreas`: string[]
- `education`: string[]
- `barYear`: number
- `languages`: string[]
- `order`: number
- Body: Markdown (full bio)

### insights
- `title`: string
- `slug`: string
- `category`: enum — "Property", "Corporate", "Family", "Disputes", "General"
- `excerpt`: string
- `publishDate`: date
- `author`: string (name matching a people entry)
- `ogImage`: string (optional)
- Body: Markdown

---

## Pages

### index.astro — /
Home page. Uses PageLayout with `transparentNav={true}`. Sections in order:
1. Hero (full-bleed image, overlaid headline + CTAs)
2. CredibilityStrip
3. Short positioning intro (2–3 sentences, SectionHeading + prose)
4. Practice areas grid (4 PracticeAreaCards from collection, sorted by order)
5. Approach / "why us" section (credentials, experience, courts — NOT boasts)
6. Featured people (top 2–3 PersonCards from collection)
7. Latest insights (3 most recent ArticleCards from collection)
8. CtaBand

### about.astro — /about
Firm story and values. SectionHeading + prose narrative. A simple timeline of
milestones (plain HTML — alternating left/right items on desktop, vertical on
mobile, gold accent dots). Team-at-a-glance grid (PersonCards). CtaBand.

### practice-areas/[slug].astro
Dynamic route using `getStaticPaths()` from the practiceAreas collection.
SectionHeading with the practice area title. Rendered Markdown body. A "People
in this area" section showing relevant PersonCards. Related insights filtered
by matching category. CtaBand.

### people/index.astro — /people
SectionHeading. Grid of PersonCards from collection, sorted by order.

### people/[slug].astro
Dynamic route from people collection. Large portrait, full rendered bio,
practice areas as tags, education list, bar enrolment year, languages,
"Get in touch" link to contact page. Related insights by this author.

### insights/index.astro — /insights
SectionHeading. Grid or list of ArticleCards from collection, sorted by date
descending. Optionally, category filter tabs (Property, Corporate, Family,
Disputes, General, All) — these can be CSS-only using anchor targets, or a
small inline script if needed.

### insights/[...slug].astro
Dynamic route from insights collection. Uses ArticleLayout. Title, gold
category tag, byline (author name + date), rendered Markdown body with styled
subheads and pull quotes. Author card at bottom (PersonCard style). 2–3 related
articles by same category.

### contact.astro — /contact
SectionHeading. Two-column on desktop: ContactForm on left; address, phone,
email, office hours, and a Google Maps iframe (loading="lazy") on right.
Stacked on mobile.

### 404.astro
Uses PageLayout. Styled "Page not found" message in brand style with a gold
"Back to home" button. Astro outputs this as dist/404.html.

---

## Images & performance

- Hero images: use `<picture>` with .webp source and .jpg fallback, srcset at
  800w, 1200w, 1920w. Preload the hero image in BaseLayout when on the homepage.
- All below-fold images: `loading="lazy"` and `decoding="async"`.
- No build-time image optimisation library needed — I will supply pre-optimised
  images in public/images/.
- Inline critical CSS where Astro's `build.inlineStylesheets: 'auto'` applies.

---

## Sitemap & SEO files

- Install `@astrojs/sitemap` and add to astro.config.mjs integrations.
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://murikanmangot.in/sitemap-index.xml
  ```

---

## Astro config (astro.config.mjs)

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://murikanmangot.in',
  integrations: [sitemap()],
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  vite: { build: { cssMinify: true } }
});
```

---

## Deployment (handle later — just set up the scaffolding)

The final site will be pushed to GitHub and deployed to Hostinger shared hosting
(Apache) via GitHub Actions FTP. For now, just create the scaffolding:

### .github/workflows/deploy.yml

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Deploy to Hostinger
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

FTP credentials will be added as GitHub repository secrets later:
`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

### public/.htaccess

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml application/xml
  AddOutputFilterByType DEFLATE application/x-font-woff2 font/woff2
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Custom 404
ErrorDocument 404 /404.html
```

---

## How to use the Claude Design exports

The attached HTML/CSS files are DESIGN REFERENCE only. Do NOT copy them as flat
pages. Instead:
1. Match the visual design — spacing, colours, typography, layout — exactly.
2. Decompose every repeated element into the Astro components listed above.
3. Wire all dynamic content through content collections.
4. Replace any inline styles with token references.
The goal is a maintainable, component-based codebase that looks identical to the
designs but is built properly for performance and content management.

---

## Build order

Work through these in sequence. Complete each step before moving to the next:
1. Project scaffold — package.json, astro.config, tsconfig, folder structure.
2. tokens.css and global.css — the full design system as CSS custom properties.
3. BaseLayout → PageLayout → ArticleLayout.
4. Components — Nav, Footer, Hero, CredibilityStrip, SectionHeading, all cards,
   CtaBand, ContactForm, SEO.
5. Content collections — config.ts + placeholder .md files for all three.
6. Pages — index.astro first, then the rest.
7. 404, robots.txt, .htaccess, deploy workflow, sitemap integration.
8. Final pass — responsive check (mobile, tablet, desktop), accessibility
   (semantic HTML, alt text, focus states, colour contrast), performance
   (Lighthouse audit targeting 95+ on all four metrics).