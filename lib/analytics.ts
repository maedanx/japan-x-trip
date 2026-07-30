/**
 * Shared click-tracking helper for every affiliate outbound CTA on the site.
 * Fires a single, consistently-shaped GA4 event via the gtag.js instance
 * already installed sitewide (see @next/third-parties/google in
 * app/layout.tsx). This never creates cookies, storage, or a new analytics
 * service -- it only calls the existing window.gtag when present.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string>,
    ) => void;
  }
}

export type AffiliateCtaPlacement =
  | "hero"
  | "final"
  | "table"
  | "card"
  | "plan-picker"
  | "top-pick"
  | "compare-detail"
  | "diagnosis-result"
  | "diagnosis-transport-options"
  | "family-diagnosis-result";

export type AffiliateCtaEvent = {
  /** The page the click happened on, e.g. "/reviews/airalo" or "/diagnosis". */
  page: string;
  /** Provider display name, e.g. "Airalo", "Ubigi", "Sakura Mobile". */
  provider: string;
  /** Specific product label, or "General" for a brand-level (non-product) CTA. */
  product: string;
  /** Where on the page the CTA lives. */
  placement: AffiliateCtaPlacement;
};

/**
 * Fire-and-forget: does not delay or block the outbound navigation, and
 * never calls preventDefault(). Safe to call from a plain <a> onClick.
 */
export function trackAffiliateCtaClick(event: AffiliateCtaEvent): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "affiliate_cta_click", {
    page: event.page,
    provider: event.provider,
    product: event.product,
    placement: event.placement,
  });
}

/** Where a /diagnosis entry link was clicked. */
export type DiagnosisEntryPlacement =
  | "home-hero-diagnosis"
  | "home-mid-diagnosis"
  /** The "Take the 30-second diagnosis" prompt under the method comparison cards. */
  | "compare-method-diagnosis"
  /** Compare's bottom-of-page final CTA into /diagnosis. */
  | "compare-final-diagnosis"
  /** "Change your answers" inside an existing Diagnosis Summary -- a return
   * to an already-completed diagnosis, not a fresh start, so it is reported
   * separately from the entry placements above. */
  | "compare-change-answers"
  /** Home Header's persistent "Build My Travel Kit" CTA (desktop layout). */
  | "home-header-diagnosis"
  /** Home Header's "Build My Travel Kit" CTA inside the open mobile menu drawer. */
  | "home-mobile-menu-diagnosis"
  /** Home Hero's primary CTA into /diagnosis -- shared by the Desktop and
   * Mobile Hero variants, since only one is ever visible per viewport. */
  | "home-hero-primary"
  /** Home's Quick Diagnosis mini-form on ConnectionFinder, fired once on a
   * valid (fully answered) submit only. */
  | "home-quick-diagnosis"
  /** The "Find My Best Option" tile within ConnectionFinder's connection grid. */
  | "home-option-diagnosis"
  /** MobileTravelKit's "Get Recommendation" CTA. */
  | "home-travel-kit-diagnosis"
  /** Home's bottom-of-page Final Diagnosis CTA, after FAQ Preview. */
  | "home-final-diagnosis"
  /** The /faq page's bottom-of-page Final Diagnosis CTA. */
  | "faq-final-diagnosis";

/**
 * Tracks a click on a link into the standalone /diagnosis tool. Distinct
 * from trackAffiliateCtaClick because these links are not affiliate CTAs --
 * there is no provider or product to report. Uses the same gtag mechanism
 * and fire-and-forget contract as the rest of this file.
 */
export function trackDiagnosisEntryClick(placement: DiagnosisEntryPlacement): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "diagnosis_entry_click", { placement });
}

/** Where a plain internal-navigation link on Home was clicked. Distinct from
 * DiagnosisEntryPlacement (not a /diagnosis entry) and from
 * AffiliateCtaPlacement (not an outbound affiliate/provider link). */
export type HomeNavPlacement =
  /** Home Hero's secondary "Compare Options" / "Compare All Options" CTA --
   * shared by the Desktop and Mobile Hero variants. */
  | "home-hero-compare"
  | "home-option-esim"
  | "home-option-pocket-wifi"
  | "home-option-sim-card"
  /** CompareIntroduction's single "Compare All Options" CTA into /compare. */
  | "home-compare-all-options"
  /** WhyJapanXTrip's "How We Review Providers" link. */
  | "home-why-review-method"
  /** WhyJapanXTrip's "Affiliate Disclosure" link. */
  | "home-why-affiliate-disclosure";

/**
 * Tracks a click on a plain internal navigation link on Home. Uses the same
 * fire-and-forget gtag mechanism as the rest of this file; not an affiliate
 * click and not a /diagnosis entry, so it does not reuse those event names.
 */
export function trackHomeNavClick(placement: HomeNavPlacement): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "home_nav_click", { placement });
}

export type FamilyWifiEventName =
  | "family_wifi_page_view"
  | "family_wifi_diagnosis_start"
  | "family_wifi_diagnosis_complete"
  | "family_wifi_result_pocket_wifi"
  | "family_wifi_result_esim"
  | "family_wifi_result_hybrid"
  | "family_wifi_click_sakura_wifi"
  | "family_wifi_click_esim_compare";

/**
 * Page-specific family funnel events. Uses the existing GA4 gtag instance
 * and does not create storage, cookies, or another analytics dependency.
 */
export function trackFamilyWifiEvent(
  eventName: FamilyWifiEventName,
  parameters: Record<string, string> = {},
): void {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, parameters);
}
