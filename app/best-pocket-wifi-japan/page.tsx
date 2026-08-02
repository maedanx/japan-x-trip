import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import { siteConfig } from "@/data/site";
import { affiliateLinks } from "@/data/affiliateLinks";
import { getConnectivityProvider } from "@/data/connectivityProviders";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/best-pocket-wifi-japan`;
const pageTitle = "Best Pocket WiFi Options for Japan Travelers";
const pageDescription =
  "Compare Pocket WiFi options for Japan by group size, sharing, pickup, return, and traveler fit. No universal ranking -- compare NINJA WiFi and Sakura Mobile by who they suit.";

export const metadata: Metadata = {
  title: `${pageTitle} (2026 Guide)`,
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
        alt: "Compare Pocket WiFi options for Japan",
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
    title: "Couple staying together",
    text: "A single Pocket WiFi router can work well when two travelers stay close together throughout the day.",
    note: "Alternative: separate eSIMs if you expect to split up.",
    href: "/esim-vs-pocket-wifi-japan",
    linkLabel: "eSIM vs Pocket WiFi",
  },
  {
    title: "Family of three or four",
    text: "One shared router is often practical when a family follows the same itinerary and several devices need internet.",
    note: "Consider a backup eSIM if you sometimes separate.",
    href: "/pocket-wifi-for-family-japan",
    linkLabel: "Family Pocket WiFi guide",
  },
  {
    title: "Large group",
    text: "A larger group should check the router's supported-device limit, likely data use, and whether more than one router makes sense.",
    note: "Verify: device limit and data needs for your group.",
    href: "/data-calculator",
    linkLabel: "Data Calculator",
  },
  {
    title: "Solo traveler",
    text: "An eSIM is often simpler for one traveler, since there is no rental equipment to collect, charge, or return.",
    note: "Alternative: compare eSIM options first.",
    href: "/best-esim-japan",
    linkLabel: "Best eSIM for Japan",
  },
  {
    title: "Locked or incompatible phone",
    text: "Pocket WiFi can be a practical starting point when a phone does not support eSIM or is carrier-locked.",
    note: "Verify: your exact phone's compatibility.",
    href: "/esim-checker",
    linkLabel: "eSIM Compatibility Checker",
  },
  {
    title: "Laptop or multi-device user",
    text: "Pocket WiFi can connect a laptop alongside phones and tablets when devices stay within range of the router.",
    note: "Alternative: a hotspot-enabled eSIM plan.",
    href: "/pocket-wifi",
    linkLabel: "Pocket WiFi guide",
  },
];

const faqs = [
  {
    question: "What is the best Pocket WiFi for Japan?",
    answer:
      "There is no single best Pocket WiFi for every traveler. NINJA WiFi and Sakura Mobile are both established options worth comparing -- the right choice depends on your group size, devices, pickup preferences, and trip length.",
  },
  {
    question: "Is NINJA WiFi or Sakura Mobile better?",
    answer:
      "Neither is universally better. NINJA WiFi may suit travelers comparing several plan and pickup options, while Sakura Mobile may suit travelers who want Japan-focused English guidance alongside a Pocket WiFi option. Compare both current reviews before deciding.",
  },
  {
    question: "Is Pocket WiFi good for families?",
    answer:
      "Pocket WiFi can work well for families who stay together, since one router can share a connection across several devices. Families who expect to split up often benefit from adding a backup eSIM.",
  },
  {
    question: "How many devices can connect to a Pocket WiFi router?",
    answer:
      "The number of devices a router can connect depends on the exact model and provider. Check the current device-limit specifications on the official website before booking.",
  },
  {
    question: "Is Pocket WiFi really unlimited?",
    answer:
      "Plans labeled unlimited may still be subject to fair-use policies, speed reductions, or other conditions that vary by plan. Review the exact terms for your selected plan before booking.",
  },
  {
    question: "Can Pocket WiFi be picked up at the airport or delivered to a hotel?",
    answer:
      "Airport pickup and hotel delivery may be available depending on the provider and location. Confirm current pickup and delivery options on the official website before booking.",
  },
  {
    question: "Does Pocket WiFi need to be returned?",
    answer:
      "Rental Pocket WiFi routers are generally expected to be returned at the end of the rental period. Confirm the exact return method, location, and deadline on the official website.",
  },
  {
    question: "What happens if the router is lost or damaged?",
    answer:
      "Rental equipment may involve additional charges for loss, damage, or late return. Review the current official terms and any available protection options before booking.",
  },
];

export default function BestPocketWifiJapanPage() {
  const ninjaWifi = getConnectivityProvider("ninja-wifi");
  const sakuraMobile = getConnectivityProvider("sakura-mobile");

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
        name: "Best Pocket WiFi for Japan",
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
              <span>Best Pocket WiFi for Japan</span>
            </nav>

            <p className={styles.eyebrow}>Japan pocket Wi-Fi comparison</p>

            <h1>{pageTitle}</h1>

            <p className={styles.heroText}>
              NINJA WiFi is a strong starting point for travelers who value
              several plan and pickup options. Sakura Mobile may suit
              travelers who prefer Japan-focused English guidance alongside
              a Pocket WiFi option. The better choice depends on total
              rental cost, pickup location, group size, and return
              logistics -- always confirm current prices and plan
              conditions on the official site.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/compare">
                Compare All Internet Options
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
              Pocket WiFi services.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>At a glance</p>
              <h2>Compare by traveler fit, not by rank</h2>
              <p>
                These providers are not numbered by quality. Each may suit
                a different kind of trip. See the{" "}
                <Link href="/airport">Airport Internet Guide</Link> for
                pickup and arrival logistics.
              </p>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Factor</th>
                    <th>NINJA WiFi</th>
                    <th>Sakura Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Best for</td>
                    <td>Families, groups, and plan choice</td>
                    <td>Japan-focused guidance and product choice</td>
                  </tr>
                  <tr>
                    <td>Product</td>
                    <td>Rental Pocket WiFi (plus SIM and eSIM)</td>
                    <td>Rental Pocket WiFi (plus eSIM and SIM)</td>
                  </tr>
                  <tr>
                    <td>Group sharing</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Return required</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Main limitation</td>
                    <td>Pickup, carrying, charging, and return logistics</td>
                    <td>Conditions differ by product -- compare before buying</td>
                  </tr>
                  <tr>
                    <td>Full review</td>
                    <td>
                      <Link href="/reviews/ninja-wifi">Read the review</Link>
                    </td>
                    <td>
                      <Link href="/sakura-mobile-review">
                        Read the review
                      </Link>
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
              {ninjaWifi ? (
                <article className={styles.providerCard}>
                  <p>Pocket WiFi</p>
                  <h3>NINJA WiFi</h3>
                  <p>{ninjaWifi.summary}</p>

                  <div className={styles.providerColumns}>
                    <div>
                      <h4>Best for</h4>
                      <ul>
                        {ninjaWifi.bestFor.slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4>Not ideal for</h4>
                      <ul>
                        {(ninjaWifi.notIdealFor ?? [])
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.providerActions}>
                    <Link
                      className={styles.reviewLink}
                      href="/reviews/ninja-wifi"
                    >
                      Read our review
                    </Link>

                    <AffiliateCtaLink
                      className={styles.planLink}
                      href={affiliateLinks.ninjaWifi.travelPocketWifi}
                      rel="sponsored nofollow noopener noreferrer"
                      page="/best-pocket-wifi-japan"
                      provider="NINJA WiFi"
                      product="NINJA WiFi Pocket WiFi"
                      placement="card"
                    >
                      Check current plans
                    </AffiliateCtaLink>
                  </div>
                </article>
              ) : null}

              {sakuraMobile ? (
                <article className={styles.providerCard}>
                  <p>Pocket WiFi · eSIM · SIM</p>
                  <h3>Sakura Mobile</h3>
                  <p>{sakuraMobile.summary}</p>

                  <div className={styles.providerColumns}>
                    <div>
                      <h4>Best for</h4>
                      <ul>
                        {sakuraMobile.bestFor.slice(0, 3).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4>Not ideal for</h4>
                      <ul>
                        {(sakuraMobile.notIdealFor ?? [])
                          .slice(0, 3)
                          .map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.providerActions}>
                    <Link
                      className={styles.reviewLink}
                      href="/sakura-mobile-review"
                    >
                      Read our review
                    </Link>

                    <AffiliateCtaLink
                      className={styles.planLink}
                      href={affiliateLinks.sakuraMobile.travelPocketWifi}
                      rel="sponsored nofollow noopener noreferrer"
                      page="/best-pocket-wifi-japan"
                      provider="Sakura Mobile"
                      product="Travel Pocket WiFi"
                      placement="card"
                    >
                      Check current plans
                    </AffiliateCtaLink>
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

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan Pocket WiFi questions</h2>
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
              Answer a few questions about your phone, group size, devices,
              and trip length.
            </p>

            <div className={styles.finalActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/compare">
                Compare All Internet Options
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
