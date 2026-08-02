import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import { siteConfig } from "@/data/site";
import {
  getConnectivityProvider,
  getProviderCtaLabel,
  getProviderDestination,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/airalo-vs-ubigi-japan`;
const pageTitle = "Airalo vs Ubigi for Japan: Which eSIM Should You Choose?";
const pageDescription =
  "Compare Airalo and Ubigi for a Japan trip by traveler fit, setup, and what to verify before buying. No universal winner -- compare by who each provider suits.";

export const metadata: Metadata = {
  title: `${pageTitle} (2026)`,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Compare Airalo and Ubigi eSIM for Japan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/brand/og-image-web.png"],
  },
};

const scenarios = [
  {
    title: "Solo traveler",
    text: "Compare each provider's package size, activation process, and app experience before choosing.",
    note: "Verify: exact activation policy for your selected package.",
    href: "/esim-checker",
    linkLabel: "eSIM Compatibility Checker",
  },
  {
    title: "Short trip (about a week)",
    text: "Compare current package validity and pricing for shorter trips on each provider's official site.",
    note: "Verify: current plan validity -- do not assume one package stays available.",
    href: "/reviews/airalo",
    linkLabel: "Airalo review",
  },
  {
    title: "Longer trip (two weeks or more)",
    text: "Compare larger data allowances, top-up options, and renewal terms for longer stays.",
    note: "Verify: renewal and top-up rules for your selected plan.",
    href: "/data-calculator",
    linkLabel: "Data Calculator",
  },
  {
    title: "Heavy data or laptop use",
    text: "Compare hotspot support and full-speed data allowances before relying on either eSIM for tethering.",
    note: "Verify: hotspot conditions and Fair Use terms.",
    href: "/esim-vs-pocket-wifi-japan",
    linkLabel: "eSIM vs Pocket WiFi",
  },
  {
    title: "Multi-country traveler",
    text: "Compare each provider's local, regional, and global package options if you're visiting more than Japan.",
    note: "Verify: package coverage for your full itinerary.",
    href: "/best-esim-japan",
    linkLabel: "Best eSIM for Japan",
  },
  {
    title: "Locked or incompatible phone",
    text: "Neither eSIM works on a locked or non-eSIM phone -- compare a physical SIM or Pocket Wi-Fi instead.",
    note: "Verify: your phone's unlock and eSIM status.",
    href: "/reviews/ubigi",
    linkLabel: "Ubigi review",
  },
];

const considerOptions = [
  {
    text: "Your phone is locked or doesn't support eSIM",
    href: "/esim-checker",
    linkLabel: "Check compatibility",
  },
  {
    text: "Your family needs one shared connection",
    href: "/pocket-wifi",
    linkLabel: "Pocket Wi-Fi guide",
  },
  {
    text: "You want Japan-focused physical support",
    href: "/sakura-mobile-review",
    linkLabel: "Sakura Mobile review",
  },
  {
    text: "You're new to eSIM and want the basics first",
    href: "/esim",
    linkLabel: "Japan eSIM guide",
  },
];

const faqs = [
  {
    question: "Is Airalo or Ubigi better for Japan?",
    answer:
      "Neither is universally better. Airalo may suit travelers who already use its app or want several fixed-data options, while Ubigi may suit travelers who prefer a reusable eSIM and Smartstart activation on supported plans. Compare both current reviews and package details before deciding.",
  },
  {
    question: "Which is cheaper, Airalo or Ubigi?",
    answer:
      "Pricing depends on the exact package, data allowance, and validity period, which can change. Compare the current prices for equivalent packages on each provider's official site before purchasing.",
  },
  {
    question: "Which has better unlimited plans?",
    answer:
      "Both providers offer unlimited-labelled packages, but Fair Use conditions such as full-speed allowance and reduced-speed thresholds can differ by exact plan. Review the current Fair Use terms for the specific package you're considering.",
  },
  {
    question: "Which activates more easily?",
    answer:
      "Activation timing and process are package-specific for both providers. Confirm the exact activation policy for your selected package on the official website before purchasing.",
  },
  {
    question: "Can I use hotspot with Airalo or Ubigi?",
    answer:
      "Hotspot support can depend on your device and the selected package for either provider. Check the current plan conditions before purchasing if hotspot use is important for your trip.",
  },
  {
    question: "Do Airalo or Ubigi include calls or SMS?",
    answer:
      "Many packages from both providers are positioned as data-only. Confirm the exact Plan Type for your selected package on the official website before purchasing.",
  },
  {
    question: "What if my phone is locked?",
    answer:
      "A carrier-locked phone generally cannot use either provider's eSIM. Confirm your phone's unlock status with your home carrier, or check compatibility using Japan X Trip's eSIM Compatibility Checker.",
  },
  {
    question: "Has Japan X Trip tested both services?",
    answer:
      "This comparison is based on current provider information, official support documentation, and Japan X Trip's editorial comparison criteria. Japan X Trip has not yet completed independent real-world network tests of these services.",
  },
];

export default function AiraloVsUbigiJapanPage() {
  const airalo = getConnectivityProvider("airalo");
  const ubigi = getConnectivityProvider("ubigi");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: pageDescription,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Airalo vs Ubigi for Japan",
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

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Airalo vs Ubigi</span>
            </nav>

            <p className={styles.eyebrow}>Japan eSIM comparison</p>

            <h1>{pageTitle}</h1>

            <p className={styles.heroText}>
              Airalo may suit travelers who already use its app, want
              several fixed-data and short-duration unlimited-labelled
              packages, or want to compare regional and global options.
              Ubigi may suit travelers who prefer a reusable eSIM profile
              and Smartstart activation on supported plans. The better
              choice depends on the exact package, activation policy,
              Fair Use terms, hotspot needs, and current price -- always
              verify the latest details on each provider&apos;s official
              site.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/compare">
                Compare All Options
              </Link>
            </div>

            <p className={styles.disclosure}>
              Some links on this page are affiliate links. Recommendations
              are based on traveler suitability, not commission
              availability.
            </p>

            <p className={styles.disclosure}>
              This comparison is based on current provider information,
              official support documentation, and Japan X Trip&apos;s
              editorial comparison criteria. Japan X Trip has not yet
              completed independent real-world network tests of these
              services.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>At a glance</p>
              <h2>Compare by fit, not by rank</h2>
              <p>
                These providers are not numbered by quality. Compare the
                exact package rather than the brand name.
              </p>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Factor</th>
                    <th>Airalo</th>
                    <th>Ubigi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product</td>
                    <td>Travel eSIM</td>
                    <td>Travel eSIM</td>
                  </tr>
                  <tr>
                    <td>Best starting point for</td>
                    <td>Existing Airalo users and broad package comparison</td>
                    <td>Reusable eSIM and current Japan plan comparison</td>
                  </tr>
                  <tr>
                    <td>Device requirement</td>
                    <td>Unlocked eSIM-compatible device</td>
                    <td>Unlocked eSIM-compatible device</td>
                  </tr>
                  <tr>
                    <td>Physical pickup</td>
                    <td>Not required</td>
                    <td>Not required</td>
                  </tr>
                  <tr>
                    <td>Main limitation</td>
                    <td>Package terms vary by product</td>
                    <td>Compatibility and plan-specific terms</td>
                  </tr>
                  <tr>
                    <td>Full review</td>
                    <td>
                      <Link href="/reviews/airalo">Read the review</Link>
                    </td>
                    <td>
                      <Link href="/reviews/ubigi">Read the review</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Provider comparison</p>
              <h2>Who each option may suit</h2>
            </div>

            <div className={styles.providerGrid}>
              {airalo ? (
                <article className={styles.providerCard}>
                  <p>Travel eSIM</p>
                  <h3>Airalo</h3>
                  <p>{airalo.summary}</p>

                  <div className={styles.providerColumns}>
                    <div>
                      <h4>Best for</h4>
                      <ul>
                        {airalo.bestFor.slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4>Not ideal for</h4>
                      <ul>
                        {(airalo.notIdealFor ?? []).slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.providerActions}>
                    <Link className={styles.reviewLink} href="/reviews/airalo">
                      Read our review
                    </Link>

                    {getProviderDestination(airalo) ? (
                      <AffiliateCtaLink
                        className={styles.planLink}
                        href={getProviderDestination(airalo)!}
                        rel={
                          isAffiliateProviderLink(airalo)
                            ? "sponsored nofollow noopener noreferrer"
                            : "noopener noreferrer"
                        }
                        page="/airalo-vs-ubigi-japan"
                        provider="Airalo"
                        product="General"
                        placement="card"
                      >
                        {getProviderCtaLabel(airalo, "Visit Airalo")}
                      </AffiliateCtaLink>
                    ) : null}
                  </div>
                </article>
              ) : null}

              {ubigi ? (
                <article className={styles.providerCard}>
                  <p>Travel eSIM</p>
                  <h3>Ubigi</h3>
                  <p>{ubigi.summary}</p>

                  <div className={styles.providerColumns}>
                    <div>
                      <h4>Best for</h4>
                      <ul>
                        {ubigi.bestFor.slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4>Not ideal for</h4>
                      <ul>
                        {(ubigi.notIdealFor ?? []).slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.providerActions}>
                    <Link className={styles.reviewLink} href="/reviews/ubigi">
                      Read our review
                    </Link>

                    {getProviderDestination(ubigi) ? (
                      <AffiliateCtaLink
                        className={styles.planLink}
                        href={getProviderDestination(ubigi)!}
                        rel={
                          isAffiliateProviderLink(ubigi)
                            ? "sponsored nofollow noopener noreferrer"
                            : "noopener noreferrer"
                        }
                        page="/airalo-vs-ubigi-japan"
                        provider="Ubigi"
                        product="General"
                        placement="card"
                      >
                        {getProviderCtaLabel(ubigi, "Visit Ubigi")}
                      </AffiliateCtaLink>
                    ) : null}
                  </div>
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Match your trip</p>
              <h2>Common traveler scenarios</h2>
              <p>
                These are general starting points, not a guarantee of the
                best option for every situation.
              </p>
            </div>

            <div className={styles.scenarioGrid}>
              {scenarios.map((scenario) => (
                <article key={scenario.title}>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.text}</p>
                  <p className={styles.scenarioNote}>{scenario.note}</p>
                  <Link href={scenario.href}>
                    {scenario.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Consider another option</p>
              <h2>When neither Airalo nor Ubigi may fit</h2>
            </div>

            <div className={styles.scenarioGrid}>
              {considerOptions.map((option) => (
                <article key={option.text}>
                  <p>{option.text}</p>
                  <Link href={option.href}>
                    {option.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Airalo vs Ubigi questions</h2>
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
            <p className={styles.eyebrow}>Still deciding?</p>
            <h2>Get a recommendation for your own trip</h2>
            <p>
              Answer a few questions about your phone, trip length, and
              data needs.
            </p>

            <div className={styles.finalActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/compare">
                Compare All Options
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
    </>
  );
}
