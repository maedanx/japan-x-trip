/**
 * Single source of truth for confirmed affiliate URLs.
 * URLs are stored verbatim as supplied by each affiliate network — do not
 * shorten, decode, re-encode, reorder query parameters, or otherwise modify
 * these strings. Named per-product keys (not string labels) so a typo fails
 * at compile time instead of silently returning the wrong link.
 */
export const affiliateLinks = {
  airalo: {
    // No general/brand-level link has been supplied for Airalo.
    fiveGb: "https://airalo.pxf.io/2RYaqM",
    tenGb: "https://airalo.pxf.io/B5AnJ0",
    twentyGb: "https://airalo.pxf.io/k4bOXx",
    unlimitedTenDays: "https://airalo.pxf.io/WOKyaO",
  },
  ubigi: {
    general: "https://go.ubigi.com/OY5emr",
    fiveGb: "https://go.ubigi.com/QYej39",
    // Impact-issued URL — keep byte-for-byte exact. Do not shorten, decode,
    // re-encode, or reorder its query parameters.
    tenGb:
      "https://go.ubigi.com/c/7503024/2167445/27303?prodsku=WW_901O_STACK_ONEOFF_JPN_10GB_30D&u=https%3A%2F%2Fcellulardata.ubigi.com%2Fja%2Frates-and-coverage%2Fjapan-data-plan%2F%3F%3F-10gb-30%3F%2F%3Fwmc-currency%3DJPY&intsrc=APIG_19557",
    twentyFiveGb: "https://go.ubigi.com/yZLqkv",
    unlimitedFifteenDays: "https://go.ubigi.com/B5AnPx",
    unlimitedThirtyDays: "https://go.ubigi.com/qWNz6O",
  },
  sakuraMobile: {
    general: "https://p.sakuramobile.jp/idevaffiliate.php?id=568",
    travelEsim: "https://p.sakuramobile.jp/idevaffiliate.php?id=568&url=77",
    travelSim: "https://p.sakuramobile.jp/idevaffiliate.php?id=568&url=78",
    travelPocketWifi: "https://p.sakuramobile.jp/idevaffiliate.php?id=568&url=79",
  },
  // Product-specific URLs transcribed verbatim from the official NINJA WiFi
  // affiliate email (cross-checked against public/images/providers/README.txt).
  // Do not shorten, decode, re-encode, or reorder their query parameters.
  ninjaWifi: {
    general: "https://ninjawifi.com?pr_vmaf=bzowEyT7Ik",
    travelPocketWifi: "https://ninjawifi.com/en/application/order?pr_vmaf=lDtsR8PxB8",
    travelSim: "https://ninjawifi.com/en/simapplication/order?pr_vmaf=eWlyjatZ38",
    travelEsim: "https://ninjawifi.com/en/esimapplication/order?pr_vmaf=bHtGSzbNoj",
  },
  japanBulletTrain: {
    general: "https://www.japan-bullettrain.com/?via=koichi",
  },
  airportTaxi: {
    general: "https://www.airport-taxi.tokyo/en?via=koichi",
  },
  japanBusTickets: {
    general: "https://www.japan-bus-tickets.com/?via=koichi",
  },
} as const;

export type AffiliateProvider = keyof typeof affiliateLinks;
export type AiraloProduct = keyof typeof affiliateLinks.airalo;
export type UbigiProduct = keyof typeof affiliateLinks.ubigi;
export type SakuraMobileProduct = keyof typeof affiliateLinks.sakuraMobile;
export type NinjaWifiProduct = keyof typeof affiliateLinks.ninjaWifi;

/** Providers that currently have a brand-level General link. */
type ProviderWithGeneralLink =
  | "ubigi"
  | "sakuraMobile"
  | "ninjaWifi"
  | "japanBulletTrain"
  | "airportTaxi"
  | "japanBusTickets";

/**
 * The brand-level link for generic, non-product-specific CTAs (service intro
 * pages, unselected-product CTAs). Only callable for providers that actually
 * have one — Airalo has none, so this will not compile for "airalo".
 */
export function getGeneralAffiliateLink(provider: ProviderWithGeneralLink): string {
  return affiliateLinks[provider].general;
}
