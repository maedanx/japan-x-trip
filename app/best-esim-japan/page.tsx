import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/home-redesign/Header";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import { siteConfig } from "@/data/site";
import type { AffiliateCtaPlacement } from "@/lib/analytics";
import "@/styles/home-redesign.css";
import {
  connectivityProviders,
  getProviderDestination,
  isAffiliateProviderLink,
  type ConnectivityProvider,
} from "@/data/connectivityProviders";

const pageUrl = `${siteConfig.url}/best-esim-japan`;
const imageDir = "/images/article/best-esim-japan";

export const metadata: Metadata = {
  title: "Best eSIM for Japan (2026 Guide)",
  description:
    "Compare eSIM options for Japan by setup, data, validity, device compatibility, support, and travel style.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Best eSIM for Japan (2026 Guide)",
    description:
      "Compare eSIM options for Japan and find a practical match for your trip, device, and data needs.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best eSIM for Japan (2026 Guide)",
    description:
      "Compare eSIM options for Japan by setup, data, validity, support, and travel style.",
  },
};

const displayOrder = [
  "sakura-mobile",
  "airalo",
  "ubigi",
  "nomad-esim",
  "japan-wireless",
  "ninja-wifi",
];

const providerNotes: Record<
  string,
  {
    label: string;
    fit: string;
    notIdealFor: string;
    setup: string;
    pickup: string;
    support: string;
  }
> = {
  "sakura-mobile": {
    label: "Japan-focused starting point",
    fit: "Travelers who want several connection types and Japan-focused guidance.",
    notIdealFor:
      "Travelers who want a single simple digital-only plan rather than comparing several product types.",
    setup: "Digital or physical, depending on product",
    pickup: "Available for some physical products",
    support: "English-language guidance available",
  },
  airalo: {
    label: "Simple digital eSIM",
    fit: "Solo travelers with an unlocked eSIM-compatible phone.",
    notIdealFor:
      "Travelers who need a local phone number, calls, or SMS, or whose phone does not support eSIM.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support and setup resources",
  },
  ubigi: {
    label: "Alternative digital eSIM",
    fit: "Travelers comparing multiple prepaid eSIM options.",
    notIdealFor:
      "Travelers with a locked or non-eSIM-compatible phone, or who prefer a single provider rather than comparing options.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support resources",
  },
  "nomad-esim": {
    label: "Additional eSIM option",
    fit: "Travelers comparing current data allowances and validity periods.",
    notIdealFor:
      "Travelers who prefer a fully guided setup rather than managing plan details themselves.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support resources",
  },
  "japan-wireless": {
    label: "Japan travel alternative",
    fit: "Travelers comparing eSIM and physical connectivity options.",
    notIdealFor:
      "Travelers who want to avoid physical pickup, delivery, or return logistics entirely.",
    setup: "Depends on selected product",
    pickup: "Available for some products",
    support: "Japan-focused traveler information",
  },
  "ninja-wifi": {
    label: "Family and group alternative",
    fit: "Families and groups connecting several phones, tablets, or laptops.",
    notIdealFor:
      "Solo travelers with one eSIM-compatible phone who prefer a fully digital setup without carrying or returning a device.",
    setup: "Physical rental or selected digital product",
    pickup: "Airport or delivery options may be available",
    support: "English-language traveler guidance",
  },
};

const faqs = [
  {
    question: "What is the best eSIM for Japan?",
    answer:
      "There is no single best eSIM for every traveler. The right option depends on phone compatibility, trip length, data use, tethering needs, support preferences, and whether you want a fully digital setup.",
  },
  {
    question: "Can I install an eSIM before arriving in Japan?",
    answer:
      "Many travel eSIMs can be installed before departure. However, the moment when validity begins differs by provider and plan. Confirm whether the plan starts at installation, activation, first network connection, or another specified time.",
  },
  {
    question: "Does an eSIM work outside Tokyo?",
    answer:
      "An eSIM may work outside Tokyo when the selected plan includes network coverage in those areas. Actual performance varies by location, terrain, buildings, congestion, device compatibility, and the provider’s network arrangements.",
  },
  {
    question: "Is unlimited data really unlimited?",
    answer:
      "The word unlimited may still be subject to fair-use policies, speed reductions, daily limits, network management, or tethering restrictions. Read the conditions for the exact plan before purchasing.",
  },
  {
    question: "Should I choose pocket Wi-Fi instead?",
    answer:
      "Pocket Wi-Fi may be a better match for families, groups, laptops, or travelers with phones that do not support eSIM. It must be carried, charged, and usually returned after the rental.",
  },
];

function getOrderedProviders(): ConnectivityProvider[] {
  return displayOrder
    .map((slug) =>
      connectivityProviders.find((provider) => provider.slug === slug),
    )
    .filter(
      (provider): provider is ConnectivityProvider =>
        provider !== undefined,
    );
}

function ProviderExternalLink({
  provider,
  className,
  placement,
  children,
}: {
  provider: ConnectivityProvider;
  className: string;
  placement: AffiliateCtaPlacement;
  children: React.ReactNode;
}) {
  const affiliate = isAffiliateProviderLink(provider);
  const destination = getProviderDestination(provider);

  if (!destination) return null;

  return (
    <AffiliateCtaLink
      className={className}
      href={destination}
      rel={
        affiliate
          ? "sponsored nofollow noopener noreferrer"
          : "noopener noreferrer"
      }
      page="/best-esim-japan"
      provider={provider.name}
      product="General"
      placement={placement}
    >
      {children}
    </AffiliateCtaLink>
  );
}

export default function BestEsimJapanPage() {
  const providers = getOrderedProviders();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best eSIM for Japan (2026 Guide)",
    description:
      "A practical comparison of eSIM and internet options for travelers visiting Japan.",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    publisher: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    dateModified: "2026-07-21",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Japan X Trip",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best eSIM for Japan",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Header />

      <main className="best-esim-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />

        <section className="best-esim-hero">
          <div className="container best-esim-hero-inner">
            <nav
              className="best-esim-breadcrumb"
              aria-label="Breadcrumb"
            >
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Best eSIM for Japan</span>
            </nav>

            <p className="eyebrow">Japan internet comparison</p>

            <h1>Best eSIM for Japan (2026 Guide)</h1>

            <div className="best-esim-hero-image">
              <Image
                src={`${imageDir}/best-esim-japan-hero-mobile.webp`}
                alt="Traveler using an eSIM while exploring Japan"
                width={1024}
                height={1536}
                priority
                sizes="(max-width: 780px) 82vw, 400px"
              />
            </div>

            <p className="best-esim-intro">
              Choosing an eSIM for Japan can be confusing. This
              guide compares practical options by setup, device
              compatibility, trip style, support, and the details
              travelers should check before purchasing.
            </p>

            <div className="best-esim-hero-actions">
              <Link className="button" href="/diagnosis">
                Find My Best Option
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/compare">
                Compare All Options
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="best-esim-update">
              Last reviewed: July 2026. Prices and plan details
              may change.
            </p>
          </div>
        </section>

        <section className="best-esim-content">
          <div className="container">
            <section className="best-esim-quick-answer">
              <p className="eyebrow">Quick answer</p>
              <p>
                For most solo travelers with an unlocked,
                eSIM-compatible phone, an eSIM is the most
                convenient way to get mobile data in Japan. The
                right provider depends on trip length, data use,
                hotspot needs, support preferences, and current
                plan terms. Families sharing several devices are
                often better served by{" "}
                <Link href="/pocket-wifi">pocket Wi-Fi</Link>.
              </p>
            </section>

            <section className="best-esim-picks">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Quick starting points</p>
                  <h2>Choose according to your trip.</h2>
                </div>

                <p>
                  These are use-case starting points, not a ranked
                  list. The order shown is not a claim that one
                  provider is best overall — the most suitable
                  option depends on your own trip.
                </p>
              </header>

              <figure className="best-esim-article-image">
                <Image
                  src={`${imageDir}/best-esim-japan-is-esim-right-for-your-trip.webp`}
                  alt="Guide showing who should choose an eSIM for a trip to Japan"
                  width={1535}
                  height={1024}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                />
              </figure>

              <div className="best-esim-pick-grid">
                {providers.slice(0, 4).map((provider, index) => (
                  <Link
                    className="best-esim-pick-card"
                    href={provider.reviewHref}
                    key={provider.slug}
                  >
                    <span className="best-esim-pick-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <small>
                      {providerNotes[provider.slug]?.label}
                    </small>

                    <h3>{provider.name}</h3>

                    <p>
                      {providerNotes[provider.slug]?.fit ??
                        provider.summary}
                    </p>

                    <strong>
                      Read full review
                      <span aria-hidden="true">→</span>
                    </strong>
                  </Link>
                ))}
              </div>
            </section>

            <section
              id="comparison"
              className="best-esim-comparison"
            >
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Provider comparison</p>
                  <h2>Compare before you buy.</h2>
                </div>

                <p>
                  Exact prices, allowances, validity periods, and
                  promotional offers should be confirmed on the
                  provider’s official website. Deciding specifically
                  between Airalo and Ubigi? See the{" "}
                  <Link href="/airalo-vs-ubigi-japan">
                    Airalo vs Ubigi comparison
                  </Link>{" "}
                  for a closer look.
                </p>
              </header>

              <figure className="best-esim-article-image">
                <Image
                  src={`${imageDir}/best-esim-japan-which-esim-fits-your-trip.webp`}
                  alt="Quick guide comparing Sakura Mobile, Ubigi, and Airalo for Japan"
                  width={1448}
                  height={1086}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                />
              </figure>

              <div className="best-esim-table-wrap">
                <table className="best-esim-table">
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Connection type</th>
                      <th>Setup</th>
                      <th>Pickup</th>
                      <th>Support</th>
                      <th>Best for</th>
                      <th>Current plans</th>
                    </tr>
                  </thead>

                  <tbody>
                    {providers.map((provider) => {
                      const note = providerNotes[provider.slug];

                      return (
                        <tr key={provider.slug}>
                          <td>
                            <strong>{provider.name}</strong>
                            <Link href={provider.reviewHref}>
                              Read review
                            </Link>
                          </td>

                          <td>
                            {provider.connectionTypes.join(", ")}
                          </td>

                          <td>{note?.setup}</td>
                          <td>{note?.pickup}</td>
                          <td>{note?.support}</td>
                          <td>{note?.fit}</td>

                          <td>
                            <ProviderExternalLink
                              provider={provider}
                              className="best-esim-table-link"
                              placement="table"
                            >
                              See latest price
                              <span aria-hidden="true">→</span>
                            </ProviderExternalLink>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="best-esim-provider-sections">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Provider overview</p>
                  <h2>What each option may suit.</h2>
                </div>

                <p>
                  These summaries describe practical starting
                  points. Read the full review and current provider
                  terms before deciding.
                </p>
              </header>

              <figure className="best-esim-article-image">
                <Image
                  src={`${imageDir}/best-esim-japan-pros-and-cons.webp`}
                  alt="Summary of eSIM benefits and things to know before traveling to Japan"
                  width={1535}
                  height={1024}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                />
              </figure>

              <div className="best-esim-provider-list">
                {providers.map((provider, index) => (
                  <article
                    className="best-esim-provider-card"
                    key={provider.slug}
                  >
                    <div className="best-esim-provider-title">
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <p>{provider.tagline}</p>
                        <h3>{provider.name}</h3>
                      </div>
                    </div>

                    <p className="best-esim-provider-summary">
                      {provider.summary}
                    </p>

                    <p className="best-esim-fit-line">
                      <strong>Best for:</strong>{" "}
                      {providerNotes[provider.slug]?.fit}
                      <br />
                      <strong>Not ideal for:</strong>{" "}
                      {providerNotes[provider.slug]?.notIdealFor}
                    </p>

                    <div className="best-esim-provider-columns">
                      <div>
                        <h4>Potential advantages</h4>
                        <ul>
                          {provider.reviewStrengths
                            .slice(0, 3)
                            .map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4>Things to check</h4>
                        <ul>
                          {provider.considerations
                            .slice(0, 3)
                            .map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="best-esim-provider-actions">
                      <Link href={provider.reviewHref}>
                        Read full review
                        <span aria-hidden="true">→</span>
                      </Link>

                      <ProviderExternalLink
                        provider={provider}
                        className="best-esim-provider-external"
                        placement="compare-detail"
                      >
                        See current plans
                      </ProviderExternalLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="best-esim-choose">
              <header>
                <p className="eyebrow">How to choose</p>
                <h2>Match the connection to your trip.</h2>
              </header>

              <figure className="best-esim-article-image best-esim-article-image--on-dark">
                <Image
                  src={`${imageDir}/best-esim-japan-how-to-set-up-esim.webp`}
                  alt="Four-step guide to setting up an eSIM for Japan"
                  width={1535}
                  height={1024}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                />
              </figure>

              <div className="best-esim-choice-grid">
                <article>
                  <span>01</span>
                  <h3>Check eSIM compatibility</h3>
                  <p>
                    Confirm that the exact phone model supports
                    eSIM and that the device is carrier-unlocked.
                  </p>
                </article>

                <article>
                  <span>02</span>
                  <h3>Compare trip length</h3>
                  <p>
                    Check validity carefully and confirm when the
                    validity period begins.
                  </p>
                </article>

                <article>
                  <span>03</span>
                  <h3>Estimate data use</h3>
                  <p>
                    Navigation, video, tethering, remote work, and
                    social media can require very different amounts
                    of data.
                  </p>
                </article>

                <article>
                  <span>04</span>
                  <h3>Count travelers and devices</h3>
                  <p>
                    A family sharing phones and laptops may prefer
                    pocket Wi-Fi or a plan with clear tethering
                    support.
                  </p>
                </article>

                <article>
                  <span>05</span>
                  <h3>Review support options</h3>
                  <p>
                    Check English instructions, support channels,
                    operating hours, and troubleshooting resources.
                  </p>
                </article>

                <article>
                  <span>06</span>
                  <h3>Read cancellation terms</h3>
                  <p>
                    Refund rules may differ for installed eSIMs,
                    incompatible phones, unused plans, and rental
                    products.
                  </p>
                </article>
              </div>
            </section>

            <section className="best-esim-scenarios">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Match your trip</p>
                  <h2>Common traveler scenarios.</h2>
                </div>

                <p>
                  These are general starting points, not a
                  guarantee of the best option for every situation.
                  Confirm details for the exact plan before buying.
                </p>
              </header>

              <div className="best-esim-scenario-grid">
                <article>
                  <h3>Solo traveler, unlocked phone</h3>
                  <p>
                    A digital eSIM installed before departure is
                    usually the simplest option.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: exact model support and carrier-unlock
                    status.
                  </p>
                  <Link href="/esim">
                    Japan eSIM Guide
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>

                <article>
                  <h3>Family or group sharing devices</h3>
                  <p>
                    Sharing data across several phones, tablets, or
                    laptops may be easier with one shared connection
                    than several individual eSIMs.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: device count, tethering limits, and
                    rental logistics.
                  </p>
                  <Link href="/esim-vs-pocket-wifi-japan">
                    eSIM vs Pocket Wi-Fi
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>

                <article>
                  <h3>Heavy data use or hotspot needs</h3>
                  <p>
                    Navigation, video, remote work, and tethering
                    can use far more data than expected.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: estimated daily data use for your trip.
                  </p>
                  <Link href="/data-calculator">
                    Data Calculator
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>

                <article>
                  <h3>Locked or non-eSIM phone</h3>
                  <p>
                    A physical SIM or pocket Wi-Fi may be the more
                    practical choice.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: whether your phone is carrier-unlocked.
                  </p>
                  <Link href="/sim-card-vs-esim">
                    eSIM vs physical SIM
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>

                <article>
                  <h3>First-time eSIM user</h3>
                  <p>
                    Confirm your device supports eSIM before
                    choosing a provider.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: your exact phone model on the checker.
                  </p>
                  <Link href="/esim-checker">
                    eSIM Compatibility Checker
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>

                <article>
                  <h3>Arriving and setting up on the go</h3>
                  <p>
                    Some travelers prefer to activate or pick up
                    connectivity after landing.
                  </p>
                  <p className="best-esim-scenario-check">
                    Verify: available setup and pickup options at
                    the airport.
                  </p>
                  <Link href="/airport">
                    Airport Internet Guide
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </div>
            </section>

            <section className="best-esim-method">
              <div>
                <p className="eyebrow">Editorial transparency</p>
                <h2>How we compare providers.</h2>
              </div>

              <div>
                <p>
                  Information is checked primarily from official
                  provider websites. Prices and plan details may
                  change after publication.
                </p>

                <p>
                  Affiliate relationships do not determine rankings
                  or recommendations. Recommendations are based on
                  traveler needs and the comparison criteria
                  described in our review methodology.
                </p>

                <div>
                  <Link href="/how-we-review-providers">
                    How We Review Providers
                  </Link>
                  <Link href="/affiliate-disclosure">
                    Affiliate Disclosure
                  </Link>
                </div>
              </div>
            </section>

            <section className="best-esim-faq">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Frequently asked questions</p>
                  <h2>Japan eSIM FAQ</h2>
                </div>
              </header>

              <figure className="best-esim-article-image">
                <Image
                  src={`${imageDir}/best-esim-japan-coverage-across-japan.webp`}
                  alt="Map showing eSIM coverage across Japan"
                  width={1535}
                  height={1024}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                />
              </figure>

              <div className="best-esim-faq-list">
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="best-esim-final">
              <div className="best-esim-final-row">
                <div>
                  <p className="eyebrow">Still deciding?</p>
                  <h2>
                    Get a recommendation based on your own trip.
                  </h2>

                  <p>
                    Answer a few questions about your phone, trip
                    length, devices, and priorities.
                  </p>

                  <figure className="best-esim-article-image best-esim-article-image--on-dark">
                    <Image
                      src={`${imageDir}/best-esim-japan-ready-for-japan.webp`}
                      alt="Traveler ready to explore Japan with an active eSIM connection"
                      width={1535}
                      height={1024}
                      sizes="(max-width: 640px) 94vw, (max-width: 1024px) 86vw, 880px"
                    />
                  </figure>
                </div>

                <div className="best-esim-final-actions">
                  <Link className="button" href="/diagnosis">
                    Find My Best Option
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link href="/compare">
                    Compare All Options
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
