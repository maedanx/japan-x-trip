import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import FamilyWifiDiagnosis from "./FamilyWifiDiagnosis";
import styles from "./page.module.css";

const pageTitle =
  "Best Pocket WiFi for Families in Japan: Is One Router Enough?";
const pageDescription =
  "Traveling to Japan with your family? Compare Pocket WiFi and eSIMs by family size, device count, trip length and whether you plan to split up.";
const pageUrl = `${siteConfig.url}/pocket-wifi-for-family-japan`;

export const metadata: Metadata = {
  title: pageTitle,
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
        alt: "Pocket WiFi and eSIM options for families traveling in Japan",
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

const quickAnswers = [
  {
    situation: "Family stays together",
    answer: "One Pocket WiFi",
  },
  {
    situation: "Family may split up",
    answer: "Individual eSIMs",
  },
  {
    situation: "Some devices do not support eSIM",
    answer: "Pocket WiFi",
  },
  {
    situation: "Many phones, tablets or laptops",
    answer: "Pocket WiFi",
  },
  {
    situation: "Want to avoid pickup, return and charging",
    answer: "eSIM",
  },
  {
    situation: "Mostly together but sometimes separate",
    answer: "Pocket WiFi + backup eSIM",
  },
];

const familySizeGuides = [
  {
    title: "For Two People",
    text: [
      "Two travelers with compatible phones may find individual eSIMs simpler, especially when they expect to separate during the day.",
      "One Pocket WiFi can still make sense when both travelers stay together and also need to connect a tablet or laptop.",
    ],
  },
  {
    title: "For a Family of Three or Four",
    text: [
      "A shared Pocket WiFi is often practical when the family follows the same itinerary and several devices need internet.",
      "When parents or older children may separate, consider individual eSIMs or one backup eSIM alongside the shared router.",
    ],
  },
  {
    title: "For Five or More People",
    text: [
      "A larger family should check the router’s supported-device limit, battery expectations, data policy, and whether everyone will remain close enough to share it.",
      "More than one connection may be safer when the group regularly divides into smaller groups.",
    ],
  },
];

const pocketWifiBenefits = [
  "Multiple devices can connect",
  "Works with older or non-eSIM devices",
  "Simple shared setup",
  "Useful for tablets and laptops",
];

const pocketWifiLimitations = [
  "Family members lose access when separated from the router",
  "One more device needs charging",
  "Pickup and return may be required",
  "Loss or damage risk",
];

const esimFits = [
  "Two travelers",
  "Family members may split up",
  "All phones support eSIM",
  "Want to avoid pickup and return",
  "Prefer no additional device",
];

const faqs = [
  {
    question: "Can one Pocket WiFi serve a whole family in Japan?",
    answer:
      "It can serve a family that stays together and remains within range of the router. Suitability depends on the number of people, active devices, router limits, data conditions, battery use, and how often family members separate.",
  },
  {
    question: "How many devices can connect to Pocket WiFi?",
    answer:
      "The stated maximum differs by router and provider. Even when several devices can connect technically, simultaneous streaming, uploads, laptop work, or weak signal may affect speed and battery life. Check the exact product specifications.",
  },
  {
    question: "Is Pocket WiFi cheaper than buying eSIMs for everyone?",
    answer:
      "Sometimes, but not always. The result depends on family size, trip length, router rental fees, delivery or pickup costs, insurance, data requirements, and the price of suitable eSIM plans for each traveler.",
  },
  {
    question: "What happens if my family splits up?",
    answer:
      "Only the people near the Pocket WiFi router keep that connection. Families that separate often may prefer individual eSIMs. Families that separate occasionally can consider one shared router plus a backup eSIM.",
  },
  {
    question: "Should children have their own eSIM?",
    answer:
      "That depends on the child’s phone, age, supervision needs, eSIM compatibility, and whether the child will ever be away from the person carrying the router. A separate plan is not necessary for every child or every trip.",
  },
];

export default function FamilyPocketWifiPage() {
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
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
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
        name: "Pocket WiFi for Families in Japan",
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
              <span>Family internet in Japan</span>
            </nav>

            <p className={styles.eyebrow}>Japan family internet guide</p>

            <h1>
              Best Pocket WiFi for Families in Japan: Is One Router
              Enough?
            </h1>

            <p className={styles.heroLead}>
              One Pocket WiFi can connect the whole family, but it may not
              be the best choice if you plan to split up during your trip.
            </p>

            <p className={styles.heroText}>
              Answer a few questions below to see whether your family
              should use one Pocket WiFi, multiple eSIMs, or a combination
              of both.
            </p>

            <a
              className={styles.heroButton}
              href="#family-internet-check"
            >
              Find the Best Option for My Family
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className={styles.quickSection}>
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Quick answer</p>
              <h2>Should Your Family Use Pocket WiFi in Japan?</h2>
              <p>
                Start with how your family travels, not with one product
                type. These are practical starting points rather than
                guaranteed outcomes.
              </p>
            </header>

            <div className={styles.quickGrid}>
              {quickAnswers.map((item) => (
                <article className={styles.quickCard} key={item.situation}>
                  <p>{item.situation}</p>
                  <strong>{item.answer}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FamilyWifiDiagnosis />

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Group size</p>
              <h2>Best Internet Option by Family Size</h2>
            </header>

            <div className={styles.sizeGrid}>
              {familySizeGuides.map((guide) => (
                <article className={styles.contentCard} key={guide.title}>
                  <h3>{guide.title}</h3>
                  {guide.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.softSection}>
          <div className={styles.container}>
            <div className={styles.twoColumn}>
              <div>
                <p className={styles.eyebrow}>Shared connection</p>
                <h2>Why Pocket WiFi Works Well for Families</h2>
                <p>
                  Pocket WiFi can reduce setup work when several people
                  and devices remain together. Read the full{" "}
                  <Link href="/pocket-wifi">Japan Pocket Wi-Fi guide</Link>{" "}
                  before reserving a rental.
                </p>
              </div>

              <ul className={styles.checkList}>
                {pocketWifiBenefits.map((benefit) => (
                  <li key={benefit}>
                    <span aria-hidden="true">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.twoColumn}>
              <div>
                <p className={styles.eyebrow}>Important trade-offs</p>
                <h2>When Pocket WiFi Is Not the Best Choice</h2>
                <p>
                  A shared router is not automatically the best family
                  option. Its main weakness appears when people move away
                  from the person carrying it.
                </p>
              </div>

              <ul className={styles.warningList}>
                {pocketWifiLimitations.map((limitation) => (
                  <li key={limitation}>
                    <span aria-hidden="true">!</span>
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.esimSection}>
          <div className={styles.container}>
            <div className={styles.esimBox}>
              <div>
                <p className={styles.eyebrow}>Independent connections</p>
                <h2>Would eSIM Be Better for Your Family?</h2>
                <p>
                  Individual eSIMs may be more practical when compatible
                  phones need to remain connected in different places.
                  Learn the basics in the{" "}
                  <Link href="/esim">Japan eSIM guide</Link>.
                </p>
              </div>

              <div>
                <ul className={styles.simpleList}>
                  {esimFits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link
                  className={styles.primaryButton}
                  href="/best-esim-japan"
                >
                  Compare Japan eSIM Plans
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.internalLinks}>
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Continue comparing</p>
              <h2>Check the details before choosing</h2>
            </header>

            <div className={styles.linkGrid}>
              <Link href="/pocket-wifi">
                <strong>Pocket Wi-Fi guide</strong>
                <span>Pickup, charging, return, and rental checks →</span>
              </Link>

              <Link href="/esim">
                <strong>Japan eSIM guide</strong>
                <span>Compatibility, setup, and activation guidance →</span>
              </Link>

              <Link href="/compare">
                <strong>Compare all methods</strong>
                <span>eSIM, physical SIM, and Pocket Wi-Fi →</span>
              </Link>

              <Link href="/diagnosis">
                <strong>Full internet diagnosis</strong>
                <span>Get a broader seven-question recommendation →</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Family Pocket WiFi Questions</h2>
            </header>

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
            <p className={styles.eyebrow}>One final check</p>
            <h2>Choose for the way your family will actually travel</h2>
            <p>
              Compare sharing, separate-day plans, phone compatibility,
              device count, charging, pickup, and return before buying.
            </p>

            <div className={styles.finalActions}>
              <a
                className={styles.finalPrimary}
                href="#family-internet-check"
              >
                Retake the Family Check
              </a>

              <Link className={styles.finalSecondary} href="/compare">
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
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c",
          ),
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
