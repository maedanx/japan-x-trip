import { affiliateLinks, getGeneralAffiliateLink } from "./affiliateLinks";

/** A single compact fact shown in the review page's optional "At a glance" block. */
export type ProviderAtAGlanceItem = {
  label: string;
  value: string;
};

/** A single FAQ entry. Shared source for both the visible FAQ section and FAQPage structured data. */
export type ProviderFaq = {
  question: string;
  answer: string;
};

export type ConnectivityProvider = {
  slug: string;
  name: string;
  /** Short connection-type label used for compare/diagnosis filtering, e.g. "eSIM · SIM · Pocket Wi-Fi". */
  category: string;
  /** Individual connection types for the review-page badges, e.g. ["eSIM", "Physical SIM"]. */
  connectionTypes: string[];
  /** One-line descriptive tagline shown on the review page eyebrow. */
  tagline: string;
  /** Short compare-card summary. */
  fit: string;
  /** Long-form summary shown on the review page. */
  summary: string;
  /** Who may consider this provider (review page). */
  bestFor: string[];
  /** Optional one-sentence synthesized verdict shown prominently on the review page. Omit until a verdict has been reviewed and approved. */
  quickVerdict?: string;
  /** Optional compact key-fact list for a scannable "At a glance" block. Omit to skip the block entirely. */
  atAGlance?: ProviderAtAGlanceItem[];
  /** Who this provider is a weaker fit for, shown alongside bestFor. Optional and safe to omit. */
  notIdealFor?: string[];
  /**
   * Whether Japan X Trip independently tested this provider's service.
   * Must only be set to true when independent testing has actually occurred;
   * omit or set to false otherwise. Defaults to not shown.
   */
  independentlyTested?: boolean;
  /**
   * Optional FAQ list for this provider's review page. Shared source for both
   * the visible FAQ section and FAQPage structured data, so the two can never
   * drift apart. Omit to skip the FAQ section and schema entirely.
   */
  faqs?: ProviderFaq[];
  /** Short strengths list for the compare-page card. */
  strengths: string[];
  /** Longer strengths list for the review page. */
  reviewStrengths: string[];
  /** Single caution line for the compare-page card. */
  caution: string;
  /** Numbered considerations list for the review page. */
  considerations: string[];
  /** Checklist shown on the review page before buying. */
  checkBeforeBuying: string[];
  reviewHref: string;
  officialUrl?: string;
  affiliateUrl?: string;
  affiliateStatus: "approved" | "pending" | "unavailable";
  /** Optional per-product affiliate CTAs shown when a provider has more than one confirmed plan link. */
  products?: {
    label: string;
    affiliateUrl: string;
    /** Optional official product photo shown on the review page's plan picker. */
    image?: {
      src: string;
      alt: string;
    };
  }[];
  /** Affiliate network/program name, for internal bookkeeping only. */
  affiliateNetwork?: string;
  /** Optional per-provider disclosure line to show next to an active affiliate CTA. */
  affiliateDisclosure?: string;
  /** Optional CTA copy override; falls back to each page's default label when unset. */
  ctaLabel?: string;
};

export const connectivityProviders: ConnectivityProvider[] = [
  {
    slug: "sakura-mobile",
    name: "Sakura Mobile",
    category: "eSIM · SIM · Pocket Wi-Fi",
    connectionTypes: ["eSIM", "Physical SIM", "Pocket Wi-Fi"],
    tagline: "Japan-focused connectivity provider",
    fit: "Travelers who value Japan-focused information and English-language guidance.",
    summary:
      "Sakura Mobile is a useful starting point for travelers who want Japan-focused service and several connection options in one place.",
    bestFor: [
      "Travelers who want English-language guidance",
      "Visitors comparing eSIM, physical SIM, and pocket Wi-Fi",
      "Travelers staying for either a short trip or a longer period",
      "People who prefer a provider focused specifically on Japan",
    ],
    quickVerdict:
      "Sakura Mobile is a strong starting point for travelers who want to compare eSIM, physical SIM, and Pocket Wi-Fi from one Japan-focused provider. It may be especially useful for travelers who value English-language guidance or need a physical connectivity option. The best product depends on phone compatibility, group size, pickup needs, and trip length — always confirm current product details, activation, and pickup or delivery conditions on the official website before purchasing.",
    atAGlance: [
      { label: "Product formats", value: "Travel eSIM, Travel SIM, and Travel Pocket Wi-Fi" },
      {
        label: "Best for",
        value: "Travelers who want Japan-focused guidance and product choice",
      },
      { label: "Setup", value: "Digital or physical, depending on the selected product" },
      { label: "Support", value: "English-language guidance available" },
      {
        label: "Main limitation",
        value: "Conditions differ by product — compare the exact plan before buying",
      },
      {
        label: "Review basis",
        value: "Official Sakura Mobile information and editorial comparison criteria",
      },
    ],
    notIdealFor: [
      "Travelers who have already chosen a single connection type and just want the simplest checkout",
      "Solo travelers who only need a basic digital eSIM with no other product comparison",
      "Travelers prioritizing the lowest possible price over Japan-focused guidance and support",
    ],
    faqs: [
      {
        question: "Is Sakura Mobile legitimate?",
        answer:
          "Sakura Mobile is an established Japan-focused connectivity provider offering eSIM, physical SIM, and Pocket Wi-Fi products. As with any purchase, confirm current terms and reviews on the official website before booking.",
      },
      {
        question: "Does Sakura Mobile offer eSIM?",
        answer:
          "Yes, Sakura Mobile offers a Travel eSIM product alongside its physical SIM and Pocket Wi-Fi options. Confirm current device compatibility and activation details on the official website before purchasing.",
      },
      {
        question: "Can Sakura Mobile products be collected at the airport?",
        answer:
          "Airport pickup and delivery options may be available for some Sakura Mobile products, depending on the exact item and location. Confirm current pickup options on the official website before booking.",
      },
      {
        question: "Does Sakura Mobile provide English support?",
        answer:
          "Sakura Mobile is generally positioned as offering English-language guidance for travelers. Confirm current support channels and availability on the official website.",
      },
      {
        question: "Is Sakura Mobile the best option for every traveler?",
        answer:
          "No single provider is the best option for every traveler. Sakura Mobile may suit travelers who want Japan-focused guidance and a choice between eSIM, SIM, and Pocket Wi-Fi, while other travelers may prefer a different provider or connection type.",
      },
      {
        question: "Which Sakura Mobile product is best for families?",
        answer:
          "Families and groups often benefit from Sakura Mobile's Pocket Wi-Fi option, since it can share one connection across several devices. Compare this against the eSIM and physical SIM products before deciding.",
      },
      {
        question: "Does Sakura Mobile Pocket Wi-Fi need to be returned?",
        answer:
          "Rental Pocket Wi-Fi products generally need to be returned at the end of the rental period. Confirm the exact return method, location, and deadline on the official website before booking.",
      },
    ],
    strengths: [
      "Several connection types",
      "Japan-focused support",
      "Options for short and longer stays",
    ],
    reviewStrengths: [
      "Several connection types are available to compare",
      "Japan-focused setup and support information",
      "Options may suit both short visits and longer stays",
      "Useful when eSIM compatibility is uncertain",
    ],
    caution:
      "Compare the exact product because setup, pickup, validity, and pricing differ.",
    considerations: [
      "The available data, validity, and delivery conditions depend on the selected product",
      "Physical products may require delivery or collection",
      "Tethering and activation rules should be checked for the exact plan",
      "The lowest-cost option may differ according to trip length",
    ],
    checkBeforeBuying: [
      "Whether the phone is unlocked and eSIM-compatible",
      "When the plan validity period begins",
      "Delivery or pickup deadlines",
      "Tethering and fair-use conditions",
      "Cancellation and refund terms",
    ],
    // Canonical Sakura Mobile review; /reviews/sakura-mobile (the shared-
    // template duplicate) now redirects here (see next.config.ts).
    reviewHref: "/sakura-mobile-review",
    officialUrl: "https://www.sakuramobile.jp/",
    affiliateUrl: getGeneralAffiliateLink("sakuraMobile"),
    affiliateStatus: "approved",
    ctaLabel: "Check Sakura Mobile Plans",
    products: [
      { label: "Travel eSIM", affiliateUrl: affiliateLinks.sakuraMobile.travelEsim },
      { label: "Travel SIM", affiliateUrl: affiliateLinks.sakuraMobile.travelSim },
      { label: "Travel Pocket WiFi", affiliateUrl: affiliateLinks.sakuraMobile.travelPocketWifi },
    ],
  },
  {
    slug: "airalo",
    name: "Airalo",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Solo travelers who want a fully digital purchase and installation process.",
    summary:
      "Airalo may suit travelers who want to purchase and install a digital Japan data plan before departure without collecting a physical product.",
    bestFor: [
      "Solo travelers using one unlocked eSIM-compatible phone",
      "Visitors who want digital delivery",
      "Travelers who prefer installation before flying",
      "People visiting multiple countries",
    ],
    quickVerdict:
      "Airalo is a practical option for travelers with an unlocked, eSIM-compatible phone who want to buy and install a Japan data plan digitally before departure. It offers both fixed-data and unlimited-labelled packages, and hotspot use may be available depending on the device and plan. It may be less suitable for travelers who need a physical product, guaranteed calls and SMS, in-person Japan-specific support, or one shared connection for several travelers — always confirm current plan details, activation, and network conditions on the official website before purchasing.",
    atAGlance: [
      { label: "Product type", value: "Travel eSIM (fixed-data and unlimited-labelled plans)" },
      { label: "Setup", value: "Fully digital — no physical pickup required" },
      { label: "Device requirement", value: "Unlocked, eSIM-compatible phone" },
      { label: "Hotspot", value: "Supported when the device and plan permit it" },
      { label: "Main limitation", value: "Package terms and activation rules vary by plan" },
      {
        label: "Review basis",
        value: "Official Airalo information and editorial comparison criteria",
      },
    ],
    notIdealFor: [
      "Families or groups who want to share one connection across several devices",
      "Travelers with a locked or non-eSIM-compatible phone",
      "Travelers who need guaranteed calls or SMS",
      "Travelers who prefer in-person, Japan-focused support",
    ],
    faqs: [
      {
        question: "Is Airalo good for Japan?",
        answer:
          "Airalo can be a good option for travelers with an unlocked, eSIM-compatible phone who want a fully digital setup with no physical pickup. Whether it is the right choice for you depends on your device, trip length, data needs, and whether you need a phone number or physical connectivity option.",
      },
      {
        question: "Does Airalo include a phone number, calls, or SMS?",
        answer:
          "Many Airalo packages are positioned as data-only. Confirm the exact Plan Type for your selected package on the official Airalo website before purchasing, especially if you need calls or SMS.",
      },
      {
        question: "Can I install Airalo before arriving in Japan?",
        answer:
          "Many Airalo eSIM packages can be installed digitally before departure. Confirm the exact activation timing for your selected package on the official website, since this can vary by product.",
      },
      {
        question: "Can I use hotspot with Airalo?",
        answer:
          "Hotspot or tethering support can depend on your device and the selected package. Check the current package conditions on the official Airalo website before purchasing if hotspot use is important for your trip.",
      },
      {
        question: "Is Airalo Unlimited really unlimited?",
        answer:
          "Packages labeled unlimited may still be subject to fair-use policies, speed reductions, or other conditions. Review the exact Fair Use terms for your selected package on the official website before purchasing.",
      },
      {
        question: "What happens if my phone is locked?",
        answer:
          "A carrier-locked phone generally cannot use another provider's eSIM, including Airalo. Confirm your phone's unlock status with your home carrier before purchasing, or check compatibility using Japan X Trip's eSIM Compatibility Checker.",
      },
      {
        question: "Can I get a refund from Airalo?",
        answer:
          "Refund eligibility can depend on the package status, usage, reason for the request, and Airalo's current policy. Review the official refund policy before purchasing if this is a concern.",
      },
    ],
    strengths: [
      "No physical collection",
      "Pre-trip installation",
      "Simple digital plan selection",
    ],
    reviewStrengths: [
      "No physical pickup or return",
      "Installation can usually be prepared digitally",
      "A broad international travel focus",
      "Convenient for travelers already familiar with eSIM setup",
    ],
    caution:
      "Confirm phone compatibility, activation timing, data allowance, and hotspot rules.",
    considerations: [
      "The phone must support eSIM and be carrier-unlocked",
      "Activation timing differs between plans",
      "Some plans may provide data only rather than a local phone number",
      "Tethering and network conditions should be checked before purchase",
    ],
    checkBeforeBuying: [
      "Exact phone model compatibility",
      "When the validity period starts",
      "Included data and speed-reduction conditions",
      "Tethering availability",
      "Refund rules for installation or compatibility problems",
    ],
    reviewHref: "/reviews/airalo",
    officialUrl: "https://www.airalo.com/",
    affiliateUrl: "",
    affiliateStatus: "unavailable",
    ctaLabel: "Visit Airalo Official Site",
    products: [
      { label: "20GB", affiliateUrl: affiliateLinks.airalo.twentyGb },
      { label: "10GB", affiliateUrl: affiliateLinks.airalo.tenGb },
      { label: "Unlimited 10 Days", affiliateUrl: affiliateLinks.airalo.unlimitedTenDays },
      { label: "5GB", affiliateUrl: affiliateLinks.airalo.fiveGb },
    ],
  },
  {
    slug: "ubigi",
    name: "Ubigi",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Travelers comparing alternative prepaid eSIM plans for Japan.",
    summary:
      "Ubigi is another digital eSIM option for travelers comparing prepaid mobile-data plans for Japan.",
    bestFor: [
      "Travelers comparing several eSIM providers",
      "Visitors who want digital setup",
      "People using an unlocked eSIM-compatible device",
      "Travelers who may need connectivity in other destinations",
    ],
    quickVerdict:
      "Ubigi is worth considering for travelers with an unlocked, eSIM-compatible phone who want to arrange mobile data digitally before a Japan trip, with no physical pickup required. It works as one option among several prepaid eSIM providers for Japan. It may be less suitable for travelers who need a phone number, physical SIM, pocket Wi-Fi, or in-person Japan-specific support — always confirm current plan details, activation, and network conditions on the official website before purchasing.",
    atAGlance: [
      { label: "Product type", value: "Data-only eSIM" },
      { label: "Setup", value: "Fully digital — no physical pickup required" },
      { label: "Device requirement", value: "Unlocked, eSIM-compatible phone" },
      { label: "Best for", value: "Comparing prepaid eSIM options for Japan" },
      { label: "Main limitation", value: "Requires a compatible unlocked device" },
      {
        label: "Review basis",
        value: "Official Ubigi information and editorial comparison criteria",
      },
    ],
    notIdealFor: [
      "Families or groups who want to share one connection across several devices",
      "Travelers with a locked or non-eSIM-compatible phone",
      "Travelers who need a phone number or standard calls and SMS",
      "Travelers who prefer in-person, Japan-focused support",
    ],
    faqs: [
      {
        question: "Is Ubigi good for Japan?",
        answer:
          "Ubigi can be a good option for travelers with an unlocked, eSIM-compatible phone who want a fully digital setup with no physical pickup. Whether it is the right choice for you depends on your device, trip length, data needs, and whether you need a phone number or physical connectivity option.",
      },
      {
        question: "Does Ubigi include a phone number, calls, or SMS?",
        answer:
          "Ubigi is generally positioned as a data-focused eSIM service. Confirm the exact features included with your selected plan on the official Ubigi website before purchasing, especially if you need calls or SMS.",
      },
      {
        question: "Can I install Ubigi before arriving in Japan?",
        answer:
          "Many Ubigi eSIM plans can be installed digitally before departure. Confirm the exact activation process and timing for your selected plan on the official website, since this can vary by product.",
      },
      {
        question: "Can I use hotspot with Ubigi?",
        answer:
          "Hotspot or tethering support can depend on your device and the selected plan. Check the current plan conditions on the official Ubigi website before purchasing if hotspot use is important for your trip.",
      },
      {
        question: "Is Ubigi Unlimited really unlimited?",
        answer:
          "Plans labeled unlimited may still be subject to fair-use policies, speed reductions, or other conditions. Review the exact Fair Use terms for your selected plan on the official website before purchasing.",
      },
      {
        question: "What happens if my phone is locked?",
        answer:
          "A carrier-locked phone generally cannot use another provider's eSIM, including Ubigi. Confirm your phone's unlock status with your home carrier before purchasing, or check compatibility using Japan X Trip's eSIM Compatibility Checker.",
      },
      {
        question: "Can I get a refund from Ubigi?",
        answer:
          "Refund eligibility can depend on whether the plan was used, the reason for the request, and Ubigi's current terms. Review the official refund policy before purchasing if this is a concern.",
      },
    ],
    strengths: [
      "Digital setup",
      "No rental device",
      "Useful alternative for compatible phones",
    ],
    reviewStrengths: [
      "Digital purchase and installation",
      "No rental device to collect or return",
      "Provides an alternative when comparing Japan eSIM plans",
      "International destination coverage may be useful for wider trips",
    ],
    caution:
      "Check current plan validity, supported networks, and installation instructions.",
    considerations: [
      "Device compatibility must be confirmed before purchase",
      "Plan conditions vary by destination and product",
      "Coverage and speed are not identical in every location",
      "Hotspot and validity rules should be checked for the selected plan",
    ],
    checkBeforeBuying: [
      "Supported device and operating-system version",
      "Data allowance and validity",
      "Activation instructions",
      "Hotspot conditions",
      "Cancellation and refund rules",
    ],
    reviewHref: "/reviews/ubigi",
    officialUrl: "https://cellulardata.ubigi.com/",
    affiliateUrl: getGeneralAffiliateLink("ubigi"),
    affiliateStatus: "approved",
    ctaLabel: "Check Ubigi Plans",
    products: [
      { label: "General", affiliateUrl: affiliateLinks.ubigi.general },
      { label: "Unlimited 15 Days", affiliateUrl: affiliateLinks.ubigi.unlimitedFifteenDays },
      { label: "Unlimited 30 Days", affiliateUrl: affiliateLinks.ubigi.unlimitedThirtyDays },
      { label: "25GB", affiliateUrl: affiliateLinks.ubigi.twentyFiveGb },
      { label: "10GB", affiliateUrl: affiliateLinks.ubigi.tenGb },
      { label: "5GB", affiliateUrl: affiliateLinks.ubigi.fiveGb },
    ],
  },
  {
    slug: "nomad-esim",
    name: "Nomad eSIM",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Travelers who want to compare several digital data packages.",
    summary:
      "Nomad eSIM may be worth comparing when a traveler wants a fully digital data option for Japan and is checking several eSIM plan structures.",
    bestFor: [
      "Travelers comparing eSIM prices and validity periods",
      "Visitors who want digital delivery",
      "People with an unlocked eSIM-compatible phone",
      "Travelers comfortable managing mobile-data settings",
    ],
    strengths: [
      "Remote purchase",
      "No airport pickup",
      "Multiple plan sizes may be available",
    ],
    reviewStrengths: [
      "No physical collection or return",
      "Can be considered alongside other travel eSIM providers",
      "Digital setup may be completed before or during travel",
      "Useful for travelers prioritizing convenience",
    ],
    caution:
      "Plan conditions can change, so confirm activation and refund rules before purchase.",
    considerations: [
      "Exact plans and availability may change",
      "The start of validity must be confirmed",
      "Device and carrier-lock compatibility remain essential",
      "Support, tethering, and refund terms vary by product",
    ],
    checkBeforeBuying: [
      "Current Japan plan availability",
      "Supported networks and coverage information",
      "Activation timing",
      "Tethering support",
      "Refund and cancellation policy",
    ],
    reviewHref: "/reviews/nomad-esim",
    officialUrl: "https://www.getnomad.app/",
    affiliateUrl: "",
    affiliateStatus: "unavailable",
  },
  {
    slug: "japan-wireless",
    name: "Japan Wireless",
    category: "Pocket Wi-Fi · eSIM",
    connectionTypes: ["Pocket Wi-Fi", "eSIM"],
    tagline: "Japan travel connectivity provider",
    fit: "Groups who want a shareable Pocket WiFi router, and solo travelers who prefer a fully digital eSIM setup.",
    summary:
      "Japan Wireless offers both a Pocket WiFi rental and an eSIM data plan for travelers in Japan. Pocket WiFi suits groups sharing one connection, while the eSIM option suits solo travelers who prefer a fully digital setup with no physical pickup or return.",
    bestFor: [
      "Families and groups who want a shared Pocket WiFi router",
      "Solo travelers using an unlocked eSIM-compatible phone",
      "Visitors comparing pocket Wi-Fi and eSIM options from one provider",
      "People who want a Japan-focused travel service",
    ],
    strengths: [
      "Pocket Wi-Fi and eSIM options from one provider",
      "Useful for device sharing or a fully digital setup",
      "Physical delivery or pickup may be available for Pocket Wi-Fi",
    ],
    reviewStrengths: [
      "Offers both Pocket Wi-Fi rental and an eSIM data plan",
      "Pocket Wi-Fi can avoid changing the phone SIM",
      "The eSIM option avoids physical pickup or return",
      "May provide a useful alternative to other rental or digital providers",
    ],
    caution:
      "Confirm current pricing, data conditions, and pickup or activation details for the selected product on the official site.",
    considerations: [
      "Physical Pocket Wi-Fi rentals need charging and return; the eSIM option does not",
      "Delivery and collection conditions apply only to the Pocket Wi-Fi rental",
      "Rental fees may depend on dates and trip length",
      "eSIM device and carrier-lock compatibility should be confirmed before purchase",
    ],
    checkBeforeBuying: [
      "Which product, Pocket Wi-Fi or eSIM, fits your trip",
      "Delivery or airport collection options for Pocket Wi-Fi",
      "Return procedure for Pocket Wi-Fi",
      "Phone eSIM compatibility if choosing the eSIM option",
      "Current plan availability and cancellation policy",
    ],
    reviewHref: "/reviews/japan-wireless",
    officialUrl: "https://www.japan-wireless.com/",
    affiliateUrl: "https://www.japan-wireless.com/esim?via=koichi",
    affiliateStatus: "approved",
  },
  {
    slug: "ninja-wifi",
    name: "NINJA WiFi",
    category: "Pocket Wi-Fi",
    connectionTypes: ["Pocket Wi-Fi", "eSIM", "Physical SIM"],
    tagline: "Japan pocket Wi-Fi and travel connectivity",
    fit: "Travelers who prefer a rental router and airport-oriented collection.",
    summary:
      "NINJA WiFi is especially relevant for families, groups, and travelers who need to connect several devices during a trip to Japan.",
    bestFor: [
      "Families and groups",
      "Travelers carrying phones, tablets, and laptops",
      "Visitors who prefer airport pickup or physical delivery",
      "People who do not want to change the SIM in their phone",
    ],
    quickVerdict:
      "NINJA WiFi is worth considering for families, groups, and travelers who want to connect several devices in Japan using a rental Pocket Wi-Fi router, or who prefer a physical SIM or eSIM as separate product options. Each product has its own setup, compatibility, and logistics, so the right choice depends on the exact product selected. It may be less suitable for solo travelers who prefer not to carry, charge, or return a device — always confirm current pickup, return, and plan details on the official website before booking.",
    atAGlance: [
      {
        label: "Product formats",
        value: "Pocket Wi-Fi rental, physical SIM (SHOGUN SIM), and eSIM",
      },
      { label: "Best for", value: "Families, groups, and multiple connected devices" },
      { label: "Pocket Wi-Fi setup", value: "Collected or delivered as rental equipment" },
      { label: "Pocket Wi-Fi return", value: "Required at the end of the rental" },
      {
        label: "Main limitation",
        value: "Pickup, carrying, charging, and return logistics for Pocket Wi-Fi",
      },
      {
        label: "Review basis",
        value: "Official NINJA WiFi information and editorial comparison criteria",
      },
    ],
    notIdealFor: [
      "Solo travelers who prefer not to carry, charge, or return a rental device",
      "Travelers who will split up and need independent connections",
      "Minimalist travelers who prefer a fully digital eSIM instead",
      "Travelers concerned about forgetting to return rental equipment",
    ],
    faqs: [
      {
        question: "Is NINJA WiFi good for Japan?",
        answer:
          "NINJA WiFi can be a good option for families, groups, and travelers who want to connect several devices, or who want a choice between a rental Pocket Wi-Fi router, a physical SIM, or an eSIM. Whether it's the right choice depends on your group size, devices, and how comfortable you are carrying and returning rental equipment.",
      },
      {
        question: "How many devices can connect to a NINJA WiFi router?",
        answer:
          "The number of devices a Pocket Wi-Fi router can connect depends on the exact router model and plan. Check the current device-limit specifications on the official NINJA WiFi website before booking.",
      },
      {
        question: "Does the Pocket Wi-Fi router need to be returned?",
        answer:
          "Rental Pocket Wi-Fi routers are generally expected to be returned at the end of the rental period. Confirm the exact return method, location, and deadline for your booking on the official website.",
      },
      {
        question: "Is NINJA WiFi Unlimited really unlimited?",
        answer:
          "Plans labeled unlimited may still be subject to fair-use policies, speed reductions, or other conditions that vary by plan. Review the exact terms for your selected plan on the official website before booking.",
      },
      {
        question: "What happens if I lose or damage the router?",
        answer:
          "Rental equipment may involve additional charges for loss, damage, or late return. Review the current official terms and any available protection options before booking.",
      },
      {
        question: "Does NINJA WiFi offer a physical SIM or eSIM instead of Pocket Wi-Fi?",
        answer:
          "Yes, NINJA WiFi offers SHOGUN SIM as a physical SIM option and a separate NINJA WiFi eSIM product, in addition to Pocket Wi-Fi rental. Each product has its own compatibility, setup, and terms, so check the specific product page before choosing.",
      },
      {
        question: "Can I get a refund from NINJA WiFi?",
        answer:
          "Refund eligibility can depend on the product, booking status, and NINJA WiFi's current policy. Review the official refund terms before booking if this is a concern.",
      },
    ],
    strengths: [
      "Multiple-device connection",
      "No phone SIM replacement",
      "Useful for families and groups",
    ],
    reviewStrengths: [
      "Pocket Wi-Fi can connect several devices",
      "Suitable for phones and larger devices such as laptops",
      "Physical pickup and delivery options may be available",
      "Useful when travelers want to share one connection",
    ],
    caution:
      "Confirm pickup location, opening hours, return rules, and additional rental charges.",
    considerations: [
      "A pocket Wi-Fi device must be carried and charged",
      "Rental equipment normally needs to be returned",
      "Loss, damage, late return, or extension fees may apply",
      "Actual performance varies by location and network conditions",
    ],
    checkBeforeBuying: [
      "Pickup location and opening hours",
      "Return location and deadline",
      "Battery expectations",
      "Number of supported connected devices",
      "Rental extension, cancellation, and damage policies",
    ],
    reviewHref: "/reviews/ninja-wifi",
    officialUrl: "https://ninjawifi.com/en/",
    affiliateUrl: getGeneralAffiliateLink("ninjaWifi"),
    affiliateStatus: "approved",
    ctaLabel: "Check NINJA WiFi Options",
    products: [
      {
        label: "NINJA WiFi Pocket WiFi",
        affiliateUrl: affiliateLinks.ninjaWifi.travelPocketWifi,
        image: {
          src: "/images/providers/ninja-wifi-pocket-wifi-k4.png",
          alt: "NINJA WiFi pocket WiFi device",
        },
      },
      {
        label: "SHOGUN SIM",
        affiliateUrl: affiliateLinks.ninjaWifi.travelSim,
        image: {
          src: "/images/providers/ninja-wifi-shogun-sim.png",
          alt: "SHOGUN SIM card",
        },
      },
      {
        label: "NINJA WiFi eSIM",
        affiliateUrl: affiliateLinks.ninjaWifi.travelEsim,
        image: {
          src: "/images/providers/ninja-wifi-esim.png",
          alt: "NINJA WiFi eSIM",
        },
      },
    ],
  },
];

export function getConnectivityProvider(slug: string) {
  return connectivityProviders.find((provider) => provider.slug === slug);
}

export function isAffiliateProviderLink(provider: ConnectivityProvider) {
  return provider.affiliateStatus === "approved" && Boolean(provider.affiliateUrl);
}

/**
 * The outbound URL to use for an "apply" / "check plans" CTA.
 *
 * Revenue CTAs must never silently fall back to a provider's direct official
 * URL. Only an approved affiliate URL is returned. Callers should hide the CTA
 * when this returns undefined, while internal review links remain available.
 *
 * Official URLs may still be used explicitly for source attribution,
 * policies, pickup instructions, or other non-commercial reference links.
 */
export function getProviderDestination(
  provider: ConnectivityProvider,
): string | undefined {
  if (isAffiliateProviderLink(provider)) {
    return provider.affiliateUrl;
  }

  return undefined;
}

export function hasProviderOutboundUrl(provider: ConnectivityProvider) {
  return Boolean(getProviderDestination(provider));
}

export function getProviderCtaLabel(
  provider: ConnectivityProvider,
  fallbackLabel: string,
) {
  return provider.ctaLabel || fallbackLabel;
}
