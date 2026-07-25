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

/** Where on the homepage a /diagnosis entry link was clicked. */
export type DiagnosisEntryPlacement = "home-hero-diagnosis" | "home-mid-diagnosis";

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
