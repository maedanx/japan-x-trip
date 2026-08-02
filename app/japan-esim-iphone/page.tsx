import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/japan-esim-iphone`;
const pageTitle = "Using an eSIM on iPhone in Japan";
const pageDescription =
  "A compatibility-first guide to using an eSIM on iPhone for a Japan trip: checking support, unlocked-device requirements, setup, and troubleshooting.";

export const metadata: Metadata = {
  title: `Japan eSIM for iPhone (2026): Compatibility, Setup & Travel Guide`,
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
        alt: "Using an eSIM on iPhone in Japan",
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

const beforeChecks = [
  "Confirm your exact iPhone model and region support eSIM using Apple's own documentation or your device settings.",
  "Confirm your iPhone is carrier-unlocked -- ask your home carrier if you are unsure.",
  "Confirm your provider's plan and current activation policy before purchasing.",
  "Confirm whether the plan supports Personal Hotspot if you plan to tether other devices.",
];

const setupSteps = [
  {
    title: "Check compatibility first",
    text: "Use the eSIM Compatibility Checker and your iPhone's own settings to confirm eSIM support and carrier-unlock status before buying any plan.",
  },
  {
    title: "Install before departure",
    text: "Many travel eSIMs can be installed digitally before you fly, usually by scanning a QR code within your iPhone's cellular or mobile data settings. Menu names and steps can vary by iOS version, so follow your provider's current instructions and Apple's own support documentation.",
  },
  {
    title: "Set up Dual SIM correctly",
    text: "iPhone can typically keep your home SIM and a travel eSIM active at once. Set the eSIM as your data line and confirm which line is used for calls, messages, and data before you travel.",
  },
  {
    title: "Manage Data Roaming",
    text: "Keeping Data Roaming enabled for the eSIM data line while it stays off for your home line is a common setup, but check your exact carrier and plan situation, since settings can vary.",
  },
  {
    title: "Activate after arrival",
    text: "Many travel eSIMs activate once the phone connects to a supported network after arrival, but exact timing is package-specific. Confirm the activation policy for your selected plan with your provider.",
  },
];

const featureNotes = [
  {
    title: "iMessage and FaceTime",
    text: "These may continue working over Wi-Fi or your eSIM data, subject to your Apple ID and network settings. Confirm behavior with your specific carrier setup if this matters for your trip.",
  },
  {
    title: "Personal Hotspot",
    text: "Hotspot support depends on your specific eSIM plan and provider. Confirm whether your selected plan supports tethering before relying on it.",
  },
  {
    title: "Home-SIM roaming charges",
    text: "Keep your home SIM's data roaming off to help avoid unexpected charges while abroad, and confirm your home carrier's own roaming terms before you travel.",
  },
  {
    title: "Regional model differences",
    text: "Some iPhones sold in certain regions may have different eSIM support or restrictions. Always verify your exact model and region rather than assuming a general rule applies.",
  },
];

const troubleshooting = [
  "No signal after installing the eSIM: confirm the eSIM line is enabled and set for data, check Airplane Mode is off, and restart the device.",
  "eSIM won't install: confirm your iPhone is carrier-unlocked and has an available eSIM slot, and confirm the QR code or activation link is still valid.",
  "Hotspot doesn't work: confirm your plan supports tethering and that Personal Hotspot is enabled for the correct line.",
  "Data doesn't work after arrival: confirm the plan has activated and check the carrier or APN settings your provider specifies.",
];

const faqs = [
  {
    question: "Which iPhones support eSIM?",
    answer:
      "eSIM support varies by exact model, region, and hardware revision, and Apple's own documentation is the authoritative source. Use the eSIM Compatibility Checker or your iPhone's settings to confirm your specific device rather than relying on a general list.",
  },
  {
    question: "Does my carrier need to unlock my iPhone?",
    answer:
      "Generally, yes -- your iPhone must be carrier-unlocked to use another provider's travel eSIM. Confirm your unlock status with your home carrier before purchasing a plan.",
  },
  {
    question: "Can I keep my home SIM active while using a travel eSIM?",
    answer:
      "Many iPhones support Dual SIM, allowing your home SIM and a travel eSIM to remain active at once. Set the eSIM as your data line and confirm your home line's roaming settings before traveling.",
  },
  {
    question: "Will iMessage still work?",
    answer:
      "iMessage may continue working over Wi-Fi or your eSIM data, depending on your Apple ID and network settings. Confirm behavior for your exact setup if this is important for your trip.",
  },
  {
    question: "Can I use FaceTime?",
    answer:
      "FaceTime generally works over an active data or Wi-Fi connection. Confirm your eSIM plan supports enough data for video calling if you plan to use it regularly.",
  },
  {
    question: "Should Data Roaming be enabled?",
    answer:
      "Data Roaming is often enabled for the eSIM line while disabled for the home line, but the correct setting can depend on your exact carrier and plan. Check your provider's current instructions.",
  },
  {
    question: "Can I use Personal Hotspot with a travel eSIM?",
    answer:
      "Hotspot support depends on your specific eSIM plan and provider. Confirm whether your selected plan supports tethering before purchasing if this matters for your trip.",
  },
  {
    question: "What if my iPhone has no eSIM option?",
    answer:
      "If your model, region, or carrier lock prevents eSIM use, a physical SIM or Pocket WiFi may be a more practical option. Compare both alternatives before your trip.",
  },
  {
    question: "Should I choose Pocket WiFi instead?",
    answer:
      "Pocket WiFi may suit travelers with incompatible phones, families sharing one connection, or those who prefer not to manage phone settings. Compare it against eSIM based on your group size and devices.",
  },
];

export default function JapanEsimIphonePage() {
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
        name: "Japan eSIM for iPhone",
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
              <span>Japan eSIM for iPhone</span>
            </nav>

            <p className={styles.eyebrow}>iPhone travel guide</p>

            <h1>{pageTitle}</h1>

            <p className={styles.heroText}>
              Most eSIM-compatible, carrier-unlocked iPhones can use a
              travel eSIM in Japan, but exact eSIM support varies by
              model, region, carrier, and hardware revision -- there is
              no single universal list. Confirm your specific device with
              the eSIM Compatibility Checker before buying any plan, then
              follow your provider&apos;s current setup instructions.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/esim-checker">
                Check Your iPhone Compatibility
              </Link>
            </div>

            <p className={styles.disclosure}>
              This guide complements the eSIM Compatibility Checker rather
              than replacing it. Always confirm your exact model, region,
              and carrier status before purchasing a plan.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before you buy</p>
              <h2>Check these first</h2>
              <p>
                Confirm compatibility before comparing plans -- an
                incompatible or locked phone cannot use a travel eSIM
                regardless of the provider.
              </p>
            </div>

            <div className={styles.checkGrid}>
              {beforeChecks.map((item) => (
                <div key={item}>
                  <span aria-hidden="true">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Setup flow</p>
              <h2>How eSIM setup generally works on iPhone</h2>
              <p>
                Exact steps and menu names vary by iOS version and
                provider. Follow your provider&apos;s current
                instructions alongside this general flow.
              </p>
            </div>

            <div className={styles.scenarioGrid}>
              {setupSteps.map((step) => (
                <article key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Good to know</p>
              <h2>iMessage, FaceTime, Hotspot, and roaming</h2>
            </div>

            <div className={styles.scenarioGrid}>
              {featureNotes.map((note) => (
                <article key={note.title}>
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Troubleshooting</p>
              <h2>Common setup problems</h2>
            </div>

            <div className={styles.warnGrid}>
              {troubleshooting.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Not eSIM-compatible?</p>
              <h2>Alternative connection options</h2>
              <p>
                If your iPhone or carrier situation does not support
                eSIM, a physical SIM or Pocket WiFi may be more
                practical.
              </p>
            </div>

            <div className={styles.providerActions} style={{ justifyContent: "center" }}>
              <Link className={styles.reviewLink} href="/sim-card-vs-esim">
                Compare physical SIM and eSIM
              </Link>
              <Link className={styles.reviewLink} href="/pocket-wifi">
                Read the Pocket WiFi guide
              </Link>
              <Link className={styles.reviewLink} href="/esim-vs-pocket-wifi-japan">
                eSIM vs Pocket WiFi
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Helpful tools</p>
              <h2>Plan the rest of your trip</h2>
            </div>

            <div className={styles.providerActions} style={{ justifyContent: "center" }}>
              <Link className={styles.reviewLink} href="/esim">
                Japan eSIM guide
              </Link>
              <Link className={styles.reviewLink} href="/best-esim-japan">
                Best eSIM for Japan
              </Link>
              <Link className={styles.reviewLink} href="/data-calculator">
                Data Calculator
              </Link>
              <Link className={styles.reviewLink} href="/compare">
                Compare all options
              </Link>
              <Link className={styles.reviewLink} href="/airport">
                Airport Internet Guide
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan eSIM iPhone questions</h2>
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

              <Link className={styles.secondaryButton} href="/esim-checker">
                Check Your iPhone Compatibility
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
