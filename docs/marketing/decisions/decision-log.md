# Japan X Trip Marketing Decision Log

**Version:** 1.1  
**Status:** Active  
**Last Updated:** 2026-08-02

---

## MKT-001 — Three-Month Roadmap

**Date:** 2026-08-02

### Decision

Use a three-month marketing roadmap.

### Reason

A twelve-month plan creates false precision before meaningful traffic and conversion data exist.

### Rejected Alternative

Twelve-month roadmap.

---

## MKT-002 — No Initial 100-Article Target

**Date:** 2026-08-02

### Decision

Do not use 100 articles as the initial target.

### Reason

Japan X Trip already has substantial core content. Quality, search intent, internal links, and monetization matter more than volume.

### Rejected Alternative

Create 100 articles as quickly as possible.

---

## MKT-003 — AI Search Is Part of SEO Quality

**Date:** 2026-08-02

### Decision

Treat AI search optimization as part of normal SEO and content quality.

### Reason

Clear answers, structured information, conditions, primary sources, tables, and FAQ benefit both normal and AI-assisted search.

### Rejected Alternative

Create a separate AI-search content project.

---

## MKT-004 — Documentation System First

**Date:** 2026-08-02

### Decision

AWPS projects must begin with a minimum Documentation System.

### Reason

Important knowledge must remain accessible outside ChatGPT and must be transferable between AI tools and chats.

### Standard

Start with:

- README
- Roadmap
- Progress
- Decision Log
- Main strategy
- Essential standards

Expand only when useful.

---

## MKT-005 — Repository Is the Source of Truth

**Date:** 2026-08-02

### Decision

Store important marketing knowledge in Repository Markdown files.

### Reason

Chat history must not be the only permanent location of business knowledge.

---

## MKT-006 — Select the 20 Highest-Impact Pages

**Date:** 2026-08-02

### Decision

Select the 20 pages with the highest expected impact rather than automatically creating 20 new articles.

### Evaluation Criteria

- Search demand
- Commercial intent
- Competition difficulty
- Existing asset advantage
- Internal-link value
- Production effort

### Reason

An improved existing page may generate results faster than a new article.

---

## MKT-007 — High Quality Before Scale

**Date:** 2026-08-02

### Decision

Prepare whatever systems and research are needed to produce highly readable, accurate, high-quality SEO content.

### Constraint

Preparation must support publishing and traffic growth, not become an endless internal project.


---

## MKT-008 — Top 20 Priority Approved

**Date:** 2026-08-02

### Decision

Use the Top 20 Content Priority document as the default three-month editorial order.

### First Execution Target

`/best-esim-japan`

### Important Limitation

The initial scores are strategic estimates rather than paid keyword-volume measurements.

### Review Condition

Re-score the list after at least 28 days of meaningful Search Console data or when material affiliate, Provider, or ranking changes occur.


---

## MKT-009 — Core Page Audit Priority Updated

**Date:** 2026-08-02

### Decision

Prioritize implementation work in this order:

1. `/best-esim-japan`
2. `/compare`
3. `/esim-vs-pocket-wifi-japan` only for minor consistency improvements

### Reason

Current audit scores:

- `/best-esim-japan`: 84/100
- `/compare`: 92/100
- `/esim-vs-pocket-wifi-japan`: 95/100

The largest expected gain comes from improving the weakest high-value page first.

### Review Condition

Reassess after implementation and meaningful Search Console and conversion data.


---

## MKT-010 — Release Batch Workflow Adopted

**Date:** 2026-08-02

### Decision

Group related marketing implementation requirements into numbered Release Batch documents before handing work to the implementation workflow.

### First Batch

`docs/marketing/releases/release-batch-001.md`

### Scope

- Best eSIM improvement
- Compare improvement
- Ubigi Review
- Shared branding and QA

### Reason

This reduces fragmented instructions, avoids overlapping changes, and allows implementation and QA to be completed as one controlled unit.

### Start Condition

A Release Batch begins only after current overlapping work is finished and the user explicitly authorizes execution.


---

## MKT-011 — Release Batch 001 Expanded

**Date:** 2026-08-02

### Decision

Expand Release Batch 001 to Version 1.1.

### Added Scope

- Shared Provider Review system upgrade
- Complete Airalo Review
- Airalo product-specific Affiliate handling
- Shared FAQ, structured data, disclosure, and CTA requirements

### Reason

Ubigi and Airalo use the same dynamic Provider Review foundation. Implementing the shared foundation and both Reviews together reduces duplicate implementation and QA work.

### Important Constraint

Airalo has no stored General Affiliate URL. Only approved product-specific links may be used for Affiliate CTAs.


---

## MKT-012 — Release Batch 002 Finalized

**Date:** 2026-08-02

### Decision

Release Batch 002 was finalized as the second implementation package.

### Scope

- NINJA WiFi Review
- Sakura Mobile Enhancement
- Pocket WiFi Guide Enhancement
- Family Pocket WiFi Guide Enhancement

### Reason

Bundle related Pocket WiFi improvements into one implementation cycle to reduce duplicated QA and implementation effort.


---

## MKT-013 — Release Batch 003 Started

**Date:** 2026-08-02

### Decision

Begin Release Batch 003 planning while another implementation workflow remains active.

### Planned Scope

- Best Pocket WiFi for Japan
- Airalo vs Ubigi for Japan
- Japan eSIM for iPhone
- Japan eSIM for Android

### Reason

Use implementation waiting time to prepare the next group of high-intent organic-search assets without modifying active implementation files.

### Constraint

Release Batch 003 remains documentation-only until overlapping implementation work is complete and the user authorizes execution.


---

## MKT-014 — Release Batch 003 Routes Approved

**Date:** 2026-08-02

### Decision

Approve four new Release Batch 003 pages after confirming that no exact routes currently exist.

### Approved Routes

- `/best-pocket-wifi-japan`
- `/airalo-vs-ubigi-japan`
- `/japan-esim-iphone`
- `/japan-esim-android`

### URL Correction

Use the shorter iPhone and Android routes already defined in the Top 20 priority document.

### Additional Fix Recorded

Correct the existing `/best-esim` internal link to `/best-esim-japan` during implementation.

<!-- DECISION-RELEASE-BATCHES-001-003-2026-08-02 -->

---

## Decision — Release Batches 001–003 Implementation Gate

**Date:** 2026-08-02  
**Status:** Active

Confirmed:

- Batch 002: Version 1.0 / Ready for Implementation
- Batch 003: Version 1.0 / Ready for Implementation
- Image planning: 12 pages / 44 images
- Volatile Facts Register: 18 CRITICAL items
- Implementation follows Step 0–15
- Sakura canonical: `/sakura-mobile-review`
- `/reviews/sakura-mobile` requires redirect and sitemap exclusion
- `/best-esim` must become `/best-esim-japan`
- Approved routes: `/japan-esim-iphone`, `/japan-esim-android`
- Airalo must not use an invented General Affiliate URL
- Commit / Push / Deploy require explicit approval

```text
Implementation Start: BLOCKED UNTIL A001 CONFLICT CLEARANCE
Publication Readiness: BLOCKED UNTIL FACT VERIFICATION
```

<!-- DECISION-IMPLEMENTATION-PACKAGE-001-COMPLETE-2026-08-02 -->

---

## Decision — Implementation Package 001 — Completed

**Date:** 2026-08-02  
**Status:** Active

### Decision

Record Combined Implementation Package 001 (Steps 0–14) as implemented and QA-audited, with the Step 15 Full QA P1 findings resolved in a dedicated cleanup pass.

### Confirmed

- Steps 0–14 implemented, committed to `feature/recommendation-cards-v3`, and passing TypeScript, lint, and production build
- Step 15 Full QA executed: 16 routes × 5 viewports, 0 overflow, 0 console/page/hydration errors, 0 broken images or internal links, FAQ visible/schema counts matched everywhere
- No published content asserts an unverified volatile fact (Prices, Fair Use, Activation, Network, Device compatibility all conditionally worded or safely omitted, per the Volatile Facts Register)
- Sakura route conflict resolved: `/sakura-mobile-review` is canonical; `/reviews/sakura-mobile` now redirects there; the sitemap and all internal links were unified to the canonical route in one atomic change
- Compare's outdated "affiliate links currently being prepared" notice corrected to match the live approved affiliate state
- Airalo vs Ubigi FAQ Smartstart wording aligned with the page's own hero copy ("on supported plans")

### Not Yet Done

- Volatile Facts Register fact verification (prices, Fair Use thresholds, network listings, activation policies, pickup/return details, device compatibility) — required before any further plan-specific or device-specific content is added, not required for what is currently published
- Step 14 image integration (44 planned images) — deliberately deferred; all pages confirmed structurally ready to receive images later
- Clean production deploy — not yet authorized in this session

### Reason

Separating "implemented and internally consistent" from "commercially fact-verified" keeps the publication gate honest: nothing currently live makes an unverified claim, but volatile facts still need official-source verification before the site can be considered fully release-ready for commercial claims.
