import { connectivityProviders } from "./connectivityProviders";

/**
 * Signals already produced by the /diagnosis quiz (app/diagnosis/DiagnosisClient.tsx).
 * No new questions are added -- this only reads existing analysis output.
 */
export type ProductRecommendationContext = {
  primary: "esim" | "sim" | "wifi" | "check";
  flags: Set<string>;
  /** Index into the "duration" question's options (0 = shortest stay). Undefined until answered. */
  durationIndex: number | undefined;
};

/**
 * Small, controlled vocabulary for "why this matched your answers" tags.
 * Each value must correspond to a signal a rule's own `when` clause actually
 * checks -- never add a signal to a rule unless its condition tests it.
 */
export type MatchSignal = "tripLength" | "dataNeeds" | "arrivalTiming";

const matchSignalLabels: Record<MatchSignal, string> = {
  tripLength: "Matches your trip length",
  dataNeeds: "Suitable for your data needs",
  arrivalTiming: "Ready right after you land",
};

type ProductRecommendationRule = {
  bucket: Exclude<ProductRecommendationContext["primary"], "check">;
  providerSlug: string;
  productLabel: string;
  reason: string;
  /** Omit for a bucket's default/fallback rule -- it always matches. */
  when?: (context: ProductRecommendationContext) => boolean;
  /**
   * Which signals this rule's `when` clause actually checked. Omit entirely
   * for fallback rules (no `when`) rather than guessing a reason.
   */
  matchSignals?: MatchSignal[];
};

/**
 * Evaluated top-to-bottom per bucket; the first matching rule wins.
 *
 * Pocket Wi-Fi recommendations use only providers with a confirmed
 * product-specific Pocket Wi-Fi affiliate URL. Japan Wireless can be added
 * after its Pocket Wi-Fi destination is confirmed; its current approved URL
 * is for eSIM and must not be used for a Pocket Wi-Fi recommendation.
 */
const productRecommendationRules: ProductRecommendationRule[] = [
  // eSIM bucket -- Airalo and Ubigi only (both are eSIM-only providers)
  {
    bucket: "esim",
    providerSlug: "ubigi",
    productLabel: "Unlimited 30 Days",
    reason: "Renewable long-stay data for a trip of 15 days or longer, without buying a new plan partway through.",
    when: (ctx) => ctx.flags.has("longTrip"),
    matchSignals: ["tripLength"],
  },
  {
    bucket: "esim",
    providerSlug: "ubigi",
    productLabel: "Unlimited 15 Days",
    reason: "Best for heavy data use or remote work, so you are not tracking a data cap during your trip.",
    when: (ctx) => ctx.flags.has("heavyUse") || ctx.flags.has("remoteWork"),
    matchSignals: ["dataNeeds"],
  },
  {
    bucket: "esim",
    providerSlug: "airalo",
    productLabel: "20GB",
    reason: "A larger data allowance matched to roughly two weeks of regular maps, messaging, and browsing use.",
    when: (ctx) => ctx.durationIndex === 2,
    matchSignals: ["tripLength"],
  },
  {
    bucket: "esim",
    providerSlug: "airalo",
    productLabel: "Unlimited 10 Days",
    reason: "A worry-free allowance for a short, packed trip where you want data available immediately after landing.",
    when: (ctx) => ctx.durationIndex === 0 && ctx.flags.has("arrivalPriority"),
    matchSignals: ["tripLength", "arrivalTiming"],
  },
  {
    bucket: "esim",
    providerSlug: "airalo",
    productLabel: "10GB",
    reason: "Matched to about a week of maps, messaging, and regular browsing.",
    when: (ctx) => ctx.durationIndex === 1,
    matchSignals: ["tripLength"],
  },
  {
    bucket: "esim",
    providerSlug: "airalo",
    productLabel: "5GB",
    reason: "A low-cost starting point for a shorter trip with light to regular data use.",
    // No `when` -- default fallback for the esim bucket.
  },

  // Physical SIM bucket -- Sakura Mobile is currently the only registered
  // per-product physical SIM affiliate link.
  {
    bucket: "sim",
    providerSlug: "sakura-mobile",
    productLabel: "Travel SIM",
    reason: "A physical SIM option with English setup guidance for unlocked phones.",
  },

  // Pocket Wi-Fi bucket.
  {
    bucket: "wifi",
    providerSlug: "ninja-wifi",
    productLabel: "NINJA WiFi Pocket WiFi",
    reason:
      "A shareable Pocket WiFi option matched to a larger group or several connected devices.",
    when: (ctx) =>
      ctx.flags.has("sharedGroup") || ctx.flags.has("largeGroup"),
    matchSignals: ["dataNeeds"],
  },
  {
    bucket: "wifi",
    providerSlug: "ninja-wifi",
    productLabel: "NINJA WiFi Pocket WiFi",
    reason:
      "A Pocket WiFi router matched to heavy data use, tethering, or laptop-based remote work.",
    when: (ctx) =>
      ctx.flags.has("heavyUse") || ctx.flags.has("remoteWork"),
    matchSignals: ["dataNeeds"],
  },
  {
    bucket: "wifi",
    providerSlug: "sakura-mobile",
    productLabel: "Travel Pocket WiFi",
    reason:
      "A shareable Pocket WiFi option with Japan-focused English guidance.",
  },
];

export type ProductRecommendation = {
  providerName: string;
  productLabel: string;
  reason: string;
  affiliateUrl: string;
  /** Up to 3 short, factual tags tied to the answers that led here. May be empty. */
  matchReasons: string[];
};

/**
 * Resolves the diagnosis result to a single recommended product, or null when
 * no confirmed affiliate product applies (including the "check" bucket,
 * where a product should not be pushed before compatibility is confirmed).
 */
export function getProductRecommendation(
  context: ProductRecommendationContext,
): ProductRecommendation | null {
  if (context.primary === "check") return null;

  const rule = productRecommendationRules.find(
    (candidate) =>
      candidate.bucket === context.primary &&
      (!candidate.when || candidate.when(context)),
  );
  if (!rule) return null;

  const provider = connectivityProviders.find(
    (item) => item.slug === rule.providerSlug,
  );
  const product = provider?.products?.find(
    (item) => item.label === rule.productLabel,
  );
  if (!provider || !product || !product.affiliateUrl) return null;

  return {
    providerName: provider.name,
    productLabel: product.label,
    reason: rule.reason,
    affiliateUrl: product.affiliateUrl,
    matchReasons: (rule.matchSignals ?? []).map((signal) => matchSignalLabels[signal]),
  };
}
