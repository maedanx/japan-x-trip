import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import CompareMobile from "@/components/mobile/CompareMobile";
import { siteConfig } from "@/data/site";
import {
  connectivityProviders,
  getProviderCtaLabel,
  getProviderDestination,
  hasProviderOutboundUrl,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/compare`;

export const metadata: Metadata = {
  title: "Compare Japan eSIM, SIM Card & Pocket Wi-Fi",
  description:
    "Compare eSIMs, physical SIM cards, and pocket Wi-Fi for Japan by setup, compatibility, sharing, pickup, and travel style.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Compare Internet Options for Japan",
    description:
      "Compare eSIM, SIM card, and pocket Wi-Fi options for your Japan trip.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip internet comparison guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Internet Options for Japan",
    description:
      "Find the right eSIM, SIM card, or pocket Wi-Fi option for your Japan trip.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const connectionTypes = [
  {
    name: "eSIM",
    label: "Best for simple digital setup",
    description:
      "Install a data plan digitally without collecting or inserting a physical card.",
    bestFor: "Solo travelers with an unlocked eSIM-compatible phone",
    setup: "Digital installation, usually by QR code or provider app",
    sharing: "Usually one main phone, with hotspot when permitted",
    arrival: "Can often be prepared before departure",
    limitations:
      "Requires an unlocked compatible device and careful activation timing",
    href: "/best-esim-japan",
    secondaryLinks: [
      { label: "eSIM Compatibility Checker", href: "/esim-checker" },
      { label: "Japan eSIM Guide", href: "/esim" },
    ],
  },
  {
    name: "Physical SIM",
    label: "Best for phones without eSIM",
    description:
      "Insert a physical SIM card into an unlocked compatible phone after delivery or collection.",
    bestFor: "Travelers whose phone does not support eSIM",
    setup: "Insert the SIM and configure APN settings when required",
    sharing: "Usually one phone, with hotspot when permitted",
    arrival: "May require airport pickup, hotel delivery, or shipping",
    limitations:
      "You may need to remove and safely store your home SIM",
    href: "/sim-card-vs-esim",
    secondaryLinks: [{ label: "Japan SIM Card Guide", href: "/sim-card" }],
  },
  {
    name: "Pocket Wi-Fi",
    label: "Best for groups and several devices",
    description:
      "Carry a rechargeable Wi-Fi router that connects multiple phones, tablets, or laptops.",
    bestFor: "Families, groups, and travelers carrying several devices",
    setup: "Turn on the router and connect using the Wi-Fi password",
    sharing: "Designed for multiple connected devices",
    arrival: "Usually collected or delivered as rental equipment",
    limitations:
      "Must be charged, carried, protected, and returned after the trip",
    href: "/pocket-wifi",
    secondaryLinks: [
      { label: "Airport Internet Guide", href: "/airport" },
      { label: "Family Pocket Wi-Fi Guide", href: "/pocket-wifi-for-family-japan" },
    ],
  },
];

const providers = connectivityProviders.filter(
  (provider) => provider.slug !== "nomad-esim",
);

/**
 * Page-local "Not ideal for" editorial notes, grounded in each provider's
 * existing considerations/bestFor data already published on their review and
 * best-esim-japan pages. Not stored on ConnectivityProvider itself so the
 * shared provider data stays untouched; shared with CompareMobile as a prop
 * so desktop and mobile can never drift apart.
 */
const notIdealForByProvider: Record<string, string> = {
  "sakura-mobile":
    "Travelers who want a single simple digital-only plan rather than comparing several product types.",
  airalo:
    "Travelers who need a local phone number, calls, or SMS, or whose phone does not support eSIM.",
  ubigi:
    "Travelers with a locked or non-eSIM-compatible phone, or who prefer a single provider rather than comparing options.",
  "japan-wireless":
    "Travelers who want to avoid physical pickup, delivery, or return logistics entirely.",
  "ninja-wifi":
    "Solo travelers with one eSIM-compatible phone who prefer a fully digital setup without carrying or returning a device.",
};

/**
 * Single source of truth for Compare's FAQ content -- used both for the
 * FAQPage structured data below and for the visible FAQ list rendered by
 * CompareMobile, so the two can never drift apart. Built from the site's
 * existing eSIM/SIM/pocket-Wi-Fi guidance and disclosure language; no new
 * claims are introduced.
 */
const faqs = [
  {
    question: "How do I choose between eSIM, a physical SIM, and pocket Wi-Fi?",
    answer:
      "For many solo travelers with an unlocked, compatible phone, eSIM is the simplest option because it does not require physical pickup. Travelers whose phone is not compatible often prefer a physical SIM, while groups usually benefit from pocket Wi-Fi.",
  },
  {
    question: "How do I know if my phone supports eSIM or is carrier-unlocked?",
    answer:
      "Check your phone settings or manufacturer specifications for eSIM support, and confirm with your home carrier whether the phone is unlocked. Both eSIM and physical SIM depend on this, so it is worth checking before you buy.",
  },
  {
    question: "Can several travelers share one connection?",
    answer:
      "An eSIM or physical SIM is normally used on one phone. Pocket Wi-Fi is designed to connect several devices at once, which is why it is often a good fit for families or groups traveling together.",
  },
  {
    question: "Should I trust the prices and plans shown here?",
    answer:
      "Prices, data allowances, and plan conditions can change. Always confirm the current details on the provider's official website before booking.",
  },
];

export default function ComparePage() {
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
        name: "Compare",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Header />

      <main>
        <CompareMobile faqs={faqs} notIdealForByProvider={notIdealForByProvider} />

        <div className={styles.desktopContent}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Japan internet comparison</p>

            <h1>Compare eSIM, SIM cards, and pocket Wi-Fi for Japan</h1>

            <p className={styles.heroText}>
              The best option depends on your phone, travel group, number of
              devices, setup preference, and trip length. Start with the
              connection type, then compare providers.
            </p>

            <p className={styles.quickAnswer}>
              For most solo travelers with an unlocked, compatible phone,
              eSIM is the simplest starting point. A physical SIM may suit
              phones without eSIM support, while pocket Wi-Fi is often more
              practical when several nearby devices will share one
              connection. Start with the connection type, then compare
              providers.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="#providers">
                Compare providers
              </Link>
            </div>

            <p className={styles.notice}>
              Some links on this page are affiliate links. Recommendations
              are based on traveler suitability, not commission
              availability.
            </p>

            <p className={styles.notice}>
              Editorial review updated: July 2026. Prices, promotions, and
              plan conditions may change — confirm current details on the
              provider&apos;s official website.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Step 1</p>
              <h2>Choose the right connection type</h2>
              <p>
                Start by deciding whether you need the simplicity of eSIM, the
                compatibility of a physical SIM, or the sharing ability of
                pocket Wi-Fi.
              </p>
            </div>

            <figure className={styles.comparisonVisual}>
              <Image
                className={styles.comparisonImage}
                src="/images/comparisons/esim-sim-pocket-wifi-comparison.png"
                alt="Visual comparison of eSIM, physical SIM card, and pocket Wi-Fi options for travelers in Japan"
                width={1672}
                height={941}
                sizes="(max-width: 768px) calc(100vw - 32px), 1120px"
              />
            </figure>

            <div className={styles.typeGrid}>
              {connectionTypes.map((type) => (
                <article className={styles.typeCard} key={type.name}>
                  <div>
                    <span className={styles.typeLabel}>{type.label}</span>
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                  </div>

                  <dl className={styles.details}>
                    <div>
                      <dt>Best for</dt>
                      <dd>{type.bestFor}</dd>
                    </div>

                    <div>
                      <dt>Setup</dt>
                      <dd>{type.setup}</dd>
                    </div>

                    <div>
                      <dt>Sharing</dt>
                      <dd>{type.sharing}</dd>
                    </div>

                    <div>
                      <dt>Arrival</dt>
                      <dd>{type.arrival}</dd>
                    </div>

                    <div>
                      <dt>Main limitation</dt>
                      <dd>{type.limitations}</dd>
                    </div>
                  </dl>

                  <Link className={styles.textLink} href={type.href}>
                    Read the detailed guide →
                  </Link>

                  {type.secondaryLinks.length > 0 ? (
                    <div className={styles.secondaryLinks}>
                      {type.secondaryLinks.map((link) => (
                        <Link
                          className={styles.secondaryLink}
                          href={link.href}
                          key={link.href}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.altSection} id="providers">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Step 2</p>
              <h2>Compare providers</h2>
              <p>
                These providers serve different traveler needs. Always confirm
                the current price, data allowance, validity, compatibility,
                pickup, refund, and support terms before purchasing.
              </p>
            </div>

            <div className={styles.providerGrid}>
              {providers.map((provider) => (
                <article className={styles.providerCard} key={provider.name}>
                  <div className={styles.providerTop}>
                    <div>
                      <p className={styles.category}>{provider.category}</p>
                      <h3>{provider.name}</h3>
                    </div>
                  </div>

                  <p className={styles.fit}>{provider.fit}</p>

                  <div className={styles.strengthBlock}>
                    <h4>Good points to compare</h4>
                    <ul>
                      {provider.strengths.map((strength) => (
                        <li key={strength}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.caution}>
                    <strong>Check before buying:</strong>
                    <span>{provider.caution}</span>
                  </div>

                  {notIdealForByProvider[provider.slug] ? (
                    <div className={styles.caution}>
                      <strong>Not ideal for:</strong>
                      <span>{notIdealForByProvider[provider.slug]}</span>
                    </div>
                  ) : null}

                  <div className={styles.cardActions}>
                    <Link
                      className={styles.reviewButton}
                      href={provider.reviewHref}
                    >
                      Read our review
                    </Link>

                    {hasProviderOutboundUrl(provider) ? (
                      <AffiliateCtaLink
                        className={styles.pendingButton}
                        href={getProviderDestination(provider)!}
                        rel={isAffiliateProviderLink(provider) ? "sponsored nofollow noopener" : "noopener"}
                        page="/compare"
                        provider={provider.name}
                        product="General"
                        placement="card"
                      >
                        {getProviderCtaLabel(provider, "Visit provider website")}
                      </AffiliateCtaLink>
                    ) : (
                      <span
                        className={styles.pendingButton}
                        aria-label="Official provider link is being prepared"
                      >
                        Official link coming soon
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Quick decision guide</p>
              <h2>Which option should you start with?</h2>
            </div>

            <div className={styles.decisionGrid}>
              <article>
                <h3>Solo traveler</h3>
                <strong>Start with eSIM</strong>
                <p>
                  Best when your phone is unlocked, eSIM-compatible, and you
                  want to prepare before arrival.
                </p>
              </article>

              <article>
                <h3>Family or group</h3>
                <strong>Compare pocket Wi-Fi</strong>
                <p>
                  Useful when several people and devices stay together during
                  the trip. See{" "}
                  <Link
                    className={styles.textLink}
                    href="/esim-vs-pocket-wifi-japan"
                  >
                    eSIM vs pocket Wi-Fi
                  </Link>{" "}
                  for a full comparison.
                </p>
              </article>

              <article>
                <h3>Older phone</h3>
                <strong>Check physical SIM</strong>
                <p>
                  Confirm that the phone is unlocked and supports the required
                  network bands.
                </p>
              </article>

              <article>
                <h3>Business traveler</h3>
                <strong>Consider eSIM</strong>
                <p>
                  Keeping the home SIM installed can make dual-SIM use and
                  message access easier. Use the{" "}
                  <Link className={styles.textLink} href="/data-calculator">
                    Data Calculator
                  </Link>{" "}
                  to estimate your daily use.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan internet comparison questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaInner}>
            <p className={styles.eyebrow}>Still unsure?</p>
            <h2>Get a starting recommendation in 30 seconds</h2>
            <p>
              Answer a few simple questions about your phone, devices, travel
              group, and setup preference.
            </p>

            <Link className={styles.primaryButton} href="/diagnosis">
              Find My Best Option
            </Link>
          </div>
        </section>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
