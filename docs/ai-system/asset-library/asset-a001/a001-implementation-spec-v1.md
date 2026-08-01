# A001 Implementation Specification v1

## Document information

- Asset: A001 — eSIM vs Pocket WiFi for Japan
- Route: `/esim-vs-pocket-wifi-japan`
- Target: Japan X Trip Version 1
- Priority: Mobile-first production implementation
- Status: APPROVED FOR IMPLEMENTATION
- Source of truth:
  - `a001-production-brief.md`
  - `a001-article-architecture.md`
  - `a001-comparison-matrix.md`
  - `a001-evidence-register.md`
  - `a001-image-implementation-manifest.md`

## Implementation outcome

Create a production article page that helps international travelers decide between an eSIM and Pocket WiFi for Japan without presenting a universal winner.

The page must:

- explain the decision in a fast, visual, mobile-first flow;
- preserve the approved article architecture and conditional recommendations;
- use all 11 selected Version 1 images;
- reuse the current Japan X Trip header, footer, provider data, affiliate tracking, diagnosis route, and visual language;
- remain readable and useful even when images fail to load;
- avoid unsupported fixed prices, coverage winners, or unlimited-data claims;
- pass TypeScript, mobile QA, SEO QA, accessibility checks, and production build before release.

## Files

### Required page files

```text
app/esim-vs-pocket-wifi-japan/page.tsx
app/esim-vs-pocket-wifi-japan/page.module.css
```

### Optional A001-specific components

Create only when they materially improve readability or prevent an oversized page file.

```text
app/esim-vs-pocket-wifi-japan/components/ArticleImage.tsx
app/esim-vs-pocket-wifi-japan/components/ArticleFaq.tsx
app/esim-vs-pocket-wifi-japan/components/ProviderComparison.tsx
```

Do not modify global components merely to serve A001 unless a reusable, site-wide defect is confirmed.

## Reuse decisions

| Area | Decision | Source |
|---|---|---|
| Header | REUSE | `components/home-redesign/Header.tsx` |
| Footer | REUSE | `components/layout/Footer.tsx` |
| Site metadata base | REUSE | `data/site.ts` |
| Provider source | REUSE | `data/connectivityProviders.ts` |
| Affiliate link tracking | REUSE | `components/ui/AffiliateCtaLink.tsx` |
| Diagnosis route | REUSE | `/diagnosis` |
| Compare route | REUSE | `/compare` |
| Hero design | NEW / ADAPT | Home mobile hero visual principles |
| Quick Answer | ADAPT | CompareMobile diagnosis-summary pattern |
| Comparison cards | ADAPT | CompareMobile method-card pattern |
| Decision factors | ADAPT | CompareMobile decision-guide pattern |
| Provider cards | ADAPT | CompareMobile provider-card pattern |
| FAQ display | NEW A001 data + ADAPT accordion behavior | Do not use global `faqItems` |
| Final CTA | ADAPT | Existing final diagnosis CTA pattern |

## Important component constraints

### FAQ

`components/faq/FaqAccordionList.tsx` currently imports global `faqItems` and therefore must not be inserted directly into A001.

A001 must use the nine approved A001 FAQ questions and generate both:

- visible FAQ accordion content;
- `FAQPage` JSON-LD;

from the same A001-local data array.

### FinalDiagnosisCta

The existing component contains home-specific analytics placement text. Either:

1. create an A001-local CTA using the same visual pattern and an article-specific placement value; or
2. generalize the component only if the change is safe for all existing callers.

Do not report an A001 click as `home-final-diagnosis`.

## Page metadata

### Canonical route

```text
https://japanxtrip.com/esim-vs-pocket-wifi-japan
```

### Metadata requirements

- Title: `eSIM vs Pocket WiFi for Japan (2026): Which Is Better?`
- Description: neutral, practical, and based on compatibility, group behavior, devices, setup, cost, coverage, and travel style.
- Canonical URL.
- Open Graph article metadata.
- Twitter summary-large-image metadata.
- OG/Twitter image: IMG-001 Hero.

### Structured data

Generate:

- `Article`
- `BreadcrumbList`
- `FAQPage`

The schema and visible page must use matching title, description, FAQ questions, FAQ answers, canonical URL, and hero image.

## Page structure

### 01 — Header

- Reuse existing site header.
- No A001-specific duplicate navigation.

### 02 — Article Hero

Order on mobile:

```text
Breadcrumb
Eyebrow
H1
Short lead
IMG-001 Hero
Updated date / reading-time line
Primary CTA
Secondary in-page link
```

Requirements:

- Hero image appears before a large block of buttons or metadata.
- H1 remains visible text, not embedded in the image.
- Primary CTA: `/diagnosis`.
- Secondary link: `#quick-answer`.
- IMG-001 uses `priority`.
- Avoid oversized empty space above the image.

### 03 — Introduction

- Two or three short paragraphs.
- Explain that neither format is automatically better.
- State the article outcome: choose based on device, group, trip, data, and operational needs.
- Do not insert a commercial provider CTA here.

### 04 — Quick Answer

Anchor:

```text
#quick-answer
```

Content:

- Choose eSIM if the traveler has an unlocked compatible phone, wants independent connectivity, and prefers no additional device.
- Choose Pocket WiFi if several devices need one shared connection, the group stays together, or eSIM compatibility is unavailable.
- Important exception: groups that split up should not automatically choose one shared router.

Visual sequence:

```text
Quick Answer heading
Two recommendation cards
Important-exception card
IMG-002
Diagnosis CTA
```

### 05 — At-a-Glance Comparison

Include:

- two high-level method cards;
- a detailed accessible comparison table;
- IMG-004 after the comparison content.

Required rows:

- physical device;
- setup;
- compatibility;
- multiple devices;
- group separation;
- pickup and return;
- charging;
- loss or damage;
- data limits;
- coverage;
- best starting fit.

Do not label either method as a universal winner.

### 06 — What Is an eSIM?

Explain:

- digital SIM profile;
- no physical SIM swap;
- compatible hardware and unlocked status required;
- installation may need internet;
- hotspot rules vary.

Internal links:

- `/esim`
- `/esim-checker`

### 07 — What Is Pocket WiFi?

Explain:

- portable router creating a private WiFi network;
- several WiFi-capable devices can connect;
- pickup/delivery and return may be required;
- router must be carried and charged;
- rental loss/damage rules may apply.

Internal links:

- `/pocket-wifi`
- `/airport`

### 08 — Nine Decision Factors

Use compact expandable rows or cards. Each factor must remain understandable without opening every item.

Factors:

1. phone unlocked and eSIM-compatible;
2. solo or group travel;
3. whether the group stays together;
4. number of devices;
5. desired setup effort;
6. expected data use;
7. trip duration;
8. willingness to carry and charge another device;
9. support and failure recovery.

Place IMG-013 after the factors as the visual summary of avoidable mistakes.

### 09 — Best Choice by Traveler Type

Required traveler types:

- solo traveler;
- couple staying together;
- family with several devices;
- group that may split up;
- traveler with locked or incompatible phone;
- remote worker or laptop-heavy traveler;
- traveler wanting the simplest arrival setup.

Each item must show:

- starting recommendation;
- why;
- what must still be checked.

Do not convert conditional recommendations into definitive winners.

### 10 — Cost Comparison

Explain total-trip cost rather than headline price.

Formula:

```text
Total cost =
plan or rental price
+ delivery or pickup fees
+ optional insurance
+ extension fees
+ possible extra-device costs
+ currency or payment effects
```

Additional eSIM checks:

- data amount;
- validity;
- top-up rules;
- hotspot permission.

Additional Pocket WiFi checks:

- rental duration;
- return method;
- insurance;
- loss/damage terms;
- fair-use limits.

Place IMG-007 after the explanation.

No fixed provider price may be added without release-time verification.

### 11 — Coverage in Japan

Required conclusion:

```text
eSIM and Pocket WiFi are delivery formats.
The underlying network and plan determine coverage more directly than the format alone.
```

Discuss:

- major cities and tourist areas;
- rural and mountain areas;
- remote islands;
- tunnels and high-speed travel;
- buildings, congestion, terrain, and device radio support.

Place IMG-010 after the main coverage explanation.

Do not claim that one format automatically has better rural coverage.

### 12 — Setup Comparison

Show two vertical mobile-first flows.

#### eSIM flow

1. confirm compatibility;
2. confirm unlocked status;
3. purchase correct plan;
4. install before travel when appropriate;
5. label the line;
6. configure data switching and roaming;
7. activate/test at the correct time.

#### Pocket WiFi flow

1. reserve rental;
2. confirm delivery or pickup;
3. collect router;
4. power it on;
5. connect devices;
6. monitor battery and data policy;
7. return by deadline and required method.

Place IMG-009 after the flows.

### 13 — Decision Flow

Approved logic:

```text
Is the phone unlocked and eSIM-compatible?
├── No → Start with Pocket WiFi
└── Yes
    ↓
Will multiple travelers need independent connections?
├── Yes → Separate eSIMs are usually the better starting point
└── No
    ↓
Will several devices share one connection while staying together?
├── Yes → Compare Pocket WiFi with hotspot-enabled eSIM
└── No → eSIM is usually the simpler starting point
```

Place IMG-012 after the text explanation.

CTA block:

- Primary: `Start My Japan Internet Diagnosis` → `/diagnosis`
- Secondary: `Compare Japan Internet Options` → `/compare`

### 14 — Recommended Providers

Place IMG-015 at the beginning of this section.

Provider groups:

- eSIM options;
- Pocket WiFi options.

Use `connectivityProviders` as the source of truth.

Requirements:

- show only currently active and approved destinations;
- use `getProviderDestination` and `isAffiliateProviderLink`;
- use `AffiliateCtaLink` for tracked external CTAs;
- preserve `sponsored nofollow noopener noreferrer` for affiliate destinations;
- do not sort by commission;
- explain best fit and cautions;
- include `/how-we-review-providers` and `/affiliate-disclosure` links.

Provider facts and destinations must be reverified before release.

### 15 — Pros and Cons Summary

Four compact cards:

- eSIM pros;
- eSIM cons;
- Pocket WiFi pros;
- Pocket WiFi cons.

Limit each to four or five concise items.

### 16 — FAQ

Use these approved questions:

1. Is eSIM or Pocket WiFi better for Japan?
2. Do I need Pocket WiFi in Japan?
3. Is eSIM enough for Japan travel?
4. Is Pocket WiFi better for a family?
5. Can I use an eSIM with a locked phone?
6. Can I connect a laptop through an eSIM?
7. Does Pocket WiFi work in rural Japan?
8. Is unlimited Pocket WiFi really unlimited?
9. Do I need to return Pocket WiFi?

Requirements:

- A001-local FAQ data array;
- visible accordion and schema generated from the same data;
- accessible button state and panel associations;
- answers remain conditional and provider-specific where required.

### 17 — Final Recommendation

Approved conclusion:

- Choose an eSIM when an independent connection, compatible unlocked phone, and no extra device matter most.
- Choose Pocket WiFi when several devices need one shared connection, the group remains together, or the phone cannot use eSIM.
- Use diagnosis when the answer remains unclear.

Place IMG-016 with the conclusion.

### 18 — Finder CTA

Sequence:

```text
IMG-018
CTA eyebrow
CTA heading
Short explanation
Primary diagnosis button
Secondary compare link
```

Primary route: `/diagnosis`.
Secondary route: `/compare`.

Use an article-specific analytics placement.

### 19 — Footer

Reuse existing footer.

## Image specification

Base path:

```text
/images/article/esim-vs-pocket-wifi-japan
```

| ID | File | Placement | Loading |
|---|---|---|---|
| IMG-001 | `esim-vs-pocket-wifi-japan-hero-mobile.webp` | Hero | priority |
| IMG-002 | `esim-vs-pocket-wifi-japan-3-second-answer-mobile.webp` | Quick Answer | lazy |
| IMG-004 | `esim-vs-pocket-wifi-japan-quick-comparison-mobile.webp` | At-a-Glance | lazy |
| IMG-013 | `esim-vs-pocket-wifi-japan-common-mistakes-mobile.webp` | Decision Factors | lazy |
| IMG-007 | `esim-vs-pocket-wifi-japan-price-comparison-mobile.webp` | Cost | lazy |
| IMG-010 | `esim-vs-pocket-wifi-japan-coverage-guide-mobile.webp` | Coverage | lazy |
| IMG-009 | `esim-vs-pocket-wifi-japan-setup-guide-mobile.webp` | Setup | lazy |
| IMG-012 | `esim-vs-pocket-wifi-japan-decision-tree-mobile.webp` | Decision Flow | lazy |
| IMG-015 | `esim-vs-pocket-wifi-japan-provider-guide-mobile.webp` | Providers | lazy |
| IMG-016 | `esim-vs-pocket-wifi-japan-final-recommendation-mobile.webp` | Final Recommendation | lazy |
| IMG-018 | `esim-vs-pocket-wifi-japan-finder-cta-mobile.webp` | Finder CTA | lazy |

Image requirements:

- use `next/image`;
- use intrinsic dimensions matching actual files;
- use descriptive alt text without keyword stuffing;
- decorative images must not repeat nearby text verbatim in alt text;
- preserve full mobile artwork; do not crop important text or devices;
- use `sizes` suitable for full-width mobile and a constrained desktop article column;
- keep information available in HTML, not only in images.

## Internal links

Approved existing routes:

```text
/
/esim
/esim-checker
/pocket-wifi
/sim-card
/airport
/compare
/diagnosis
/best-esim-japan
/reviews
/how-we-review-providers
/affiliate-disclosure
```

Do not add `/setup` or `/troubleshooting` until those routes exist or an approved equivalent is selected.

## Responsive design

### Mobile: 360–430 px

- primary implementation target;
- one-column layout;
- minimum 16 px body text;
- comfortable 1.6–1.8 body line-height;
- tap targets at least 44 px;
- no page-level horizontal overflow;
- comparison table may use a contained horizontal scroller with a visible cue;
- full-width images with consistent corner radius;
- avoid placing two large CTAs before the hero image;
- alternate text, cards, images, and tables to create reading rhythm.

### Tablet: 768–1024 px

- constrained centered article width;
- selected two-column cards permitted;
- images remain proportionally sized and uncropped.

### Desktop: 1025 px+

- desktop polish is secondary to mobile Version 1;
- main reading column remains constrained;
- cards may use two columns where scanning improves;
- do not redesign the mobile-first content hierarchy.

## CSS requirements

- CSS Module for A001-specific styles.
- Reuse global header/footer styles only through their existing components.
- No generic global selectors.
- No `!important` unless a documented unavoidable conflict exists.
- Shared visual tokens should use existing CSS variables when available.
- Respect reduced motion.
- Add clear `:focus-visible` styles.
- Do not hide meaningful content on mobile.

## Accessibility requirements

- one visible H1;
- logical H2/H3 order;
- breadcrumb navigation label;
- accessible FAQ controls;
- comparison table with caption or accessible heading context;
- links and buttons have distinct descriptive labels;
- no color-only communication;
- sufficient text/background contrast;
- images include suitable alt text;
- all content usable at 200% zoom;
- keyboard navigation works for FAQ and CTAs.

## Evidence and factual safeguards

- provider prices, plan details, fair-use terms, device limits, pickup options, and affiliate destinations require re-verification before release;
- use conditional wording for provider-dependent claims;
- no universal coverage winner;
- no universal price winner;
- no statement that unlimited always means unrestricted high-speed data;
- no assumption that all eSIM plans allow hotspot use;
- no assumption that all Pocket WiFi services use the same return or insurance process.

## Analytics requirements

Track:

- Hero diagnosis CTA;
- Quick Answer diagnosis CTA;
- Decision Flow diagnosis CTA;
- provider external CTAs;
- final Finder diagnosis CTA.

Use A001-specific placement identifiers. Do not reuse identifiers describing another page or the homepage.

## Implementation sequence

1. Preserve rejected implementation backup.
2. Create A001-local constants and data arrays.
3. Implement metadata and JSON-LD.
4. Implement Hero and first-screen mobile layout.
5. Implement Quick Answer and comparison.
6. Implement explanatory and decision sections.
7. Implement cost, coverage, setup, and decision flow.
8. Implement provider section with live provider data.
9. Implement FAQ from one shared local data source.
10. Implement final recommendation and CTA.
11. Complete A001 CSS Module.
12. Run TypeScript check.
13. Run local mobile visual QA.
14. Run link/image/schema/accessibility checks.
15. Run production build only after approval.
16. Commit and push only after explicit approval.

## Definition of done

### Code

- route renders without 404/500;
- TypeScript exits 0;
- no console runtime error;
- no missing import;
- no missing selected image;
- no duplicate visible H1;
- no invalid internal route.

### Content

- approved article architecture represented;
- all nine decision factors included;
- all seven traveler types included;
- cost, coverage, setup, providers, pros/cons, FAQ, and final recommendation included;
- conditional recommendations preserved;
- no unsupported provider-specific claim.

### Images

- all 11 selected images displayed once in the intended article location;
- Hero additionally used for metadata/schema as needed;
- no archived Version 1 images inserted;
- mobile artwork remains readable and uncropped.

### UX

- Hero is visible in or immediately after the first viewport content;
- no excessive whitespace before Hero;
- page does not feel like a plain text blog template;
- reading rhythm alternates visual and textual content;
- CTA density remains controlled;
- mobile width 360–430 px has no horizontal page overflow.

### SEO and accessibility

- metadata and canonical correct;
- Article, Breadcrumb, and FAQ schema valid and consistent;
- semantic heading hierarchy correct;
- FAQ and CTAs keyboard accessible;
- descriptive alt text present;
- links disclose affiliate context appropriately.

### Release control

- Mobile QA PASS;
- SEO QA PASS;
- provider facts reverified;
- production build PASS;
- explicit user approval received before commit, push, or deploy.
