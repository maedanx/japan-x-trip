import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/japan-esim-android`;
const pageTitle = "Using an eSIM on Android in Japan";
const pageDescription =
  "A device-first guide to using an eSIM on Android for a Japan trip: manufacturer differences, unlocked-device requirements, setup, APN, and troubleshooting.";

export const metadata: Metadata = {
  title: `Japan eSIM for Android (2026): Compatibility, Setup & Travel Guide`,
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
        alt: "Using an eSIM on Android in Japan",
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
  "Confirm your exact Android manufacturer and model supports eSIM using the manufacturer's own documentation or your device settings.",
  "Confirm your Android phone is carrier-unlocked -- ask your home carrier if you are unsure.",
  "Confirm your provider's plan and current activation policy before purchasing.",
  "Confirm whether the plan supports hotspot if you plan to tether other devices.",
];

const setupSteps = [
  {
    title: "Check compatibility first",
    text: "eSIM support and menu names vary widely across Android manufacturers and models. Use the eSIM Compatibility Checker and your device's own settings to confirm support and carrier-unlock status before buying any plan.",
  },
  {
    title: "Install before departure",
    text: "Many travel eSIMs can be installed digitally before you fly, usually by scanning a QR code within your device's network or SIM settings. Exact menu names differ by manufacturer and Android version, so follow your provider's current instructions.",
  },
  {
    title: "Set up mobile data correctly",
    text: "Most Android phones with dual-SIM support can keep a home SIM and a travel eSIM active together. Set the eSIM as your mobile data line and confirm which line handles calls and messages before you travel.",
  },
  {
    title: "Confirm APN settings if needed",
    text: "If data doesn't work immediately after installing the eSIM, you may need to manually confirm or enter APN settings. APN details are carrier- and plan-specific, so check your provider's current instructions rather than reusing settings from another provider.",
  },
  {
    title: "Manage data roaming",
    text: "Keeping data roaming enabled for the eSIM line while it stays off for your home line is a common setup, but check your exact carrier and plan situation, since settings can vary by manufacturer.",
  },
];

const featureNotes = [
  {
    title: "Manufacturer variation",
    text: "eSIM menus, naming, and support differ between manufacturers such as Samsung, Google, and others. A setup guide for one brand may not apply directly to another -- follow your specific device's documentation.",
  },
  {
    title: "Hotspot",
    text: "Hotspot support depends on your specific eSIM plan and provider. Confirm whether your selected plan supports tethering before relying on it.",
  },
  {
    title: "Region and carrier differences",
    text: "The same phone model sold in different regions or through different carriers may have different eSIM support or restrictions. Always verify your exact device rather than assuming a general rule applies.",
  },
  {
    title: "Home-SIM roaming charges",
    text: "Keep your home SIM's data roaming off to help avoid unexpected charges while abroad, and confirm your home carrier's own roaming terms before you travel.",
  },
];

const troubleshooting = [
  "No signal after installing the eSIM: confirm the eSIM line is enabled and set for data, check Airplane Mode is off, and restart the device.",
  "eSIM won't install: confirm your Android phone is carrier-unlocked and has an available eSIM slot, and confirm the QR code or activation link is still valid.",
  "Data doesn't work after arrival: confirm the plan has activated and check whether manual APN settings are required for your provider.",
  "Hotspot doesn't work: confirm your plan supports tethering and that mobile hotspot is enabled for the correct line.",
];

const faqs = [
  {
    question: "Do Android phones support eSIM?",
    answer:
      "Many, but not all, Android phones support eSIM, and support varies by manufacturer, exact model, region, and carrier. Use the eSIM Compatibility Checker or your device's own settings to confirm your specific phone rather than relying on a general list.",
  },
  {
    question: "Which Android brands support eSIM?",
    answer:
      "Several major manufacturers offer eSIM support on some models, but availability differs by exact model, region, and carrier, and changes over time. Verify your specific device rather than assuming brand-wide support.",
  },
  {
    question: "Does my carrier need to unlock my phone?",
    answer:
      "Generally, yes -- your Android phone must be carrier-unlocked to use another provider's travel eSIM. Confirm your unlock status with your home carrier before purchasing a plan.",
  },
  {
    question: "Can I keep my physical SIM active while using a travel eSIM?",
    answer:
      "Many Android phones with dual-SIM support can keep a home SIM and a travel eSIM active together. Set the eSIM as your mobile data line and confirm your home line's roaming settings before traveling.",
  },
  {
    question: "Do I need APN settings?",
    answer:
      "Some Android devices may need manual APN configuration if data doesn't work automatically after installing the eSIM. APN details are carrier- and plan-specific, so follow your provider's current instructions.",
  },
  {
    question: "Should Data Roaming be enabled?",
    answer:
      "Data Roaming is often enabled for the eSIM line while disabled for the home line, but the correct setting can depend on your exact carrier, plan, and device. Check your provider's current instructions.",
  },
  {
    question: "Can I use Hotspot with a travel eSIM?",
    answer:
      "Hotspot support depends on your specific eSIM plan and provider. Confirm whether your selected plan supports tethering before purchasing if this matters for your trip.",
  },
  {
    question: "What if my phone doesn't support eSIM?",
    answer:
      "If your model, region, or carrier lock prevents eSIM use, a physical SIM or Pocket WiFi may be a more practical option. Compare both alternatives before your trip.",
  },
  {
    question: "Should I use Pocket WiFi instead?",
    answer:
      "Pocket WiFi may suit travelers with incompatible phones, families sharing one connection, or those who prefer not to manage phone settings. Compare it against eSIM based on your group size and devices.",
  },
];

export default function JapanEsimAndroidPage() {
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
        name: "Japan eSIM for Android",
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
              <span>Japan eSIM for Android</span>
            </nav>

            <p className={styles.eyebrow}>Android travel guide</p>

            <h1>{pageTitle}</h1>

            <p className={styles.heroText}>
              Many Android phones support eSIM, but there is no single
              universal compatibility list -- support varies by
              manufacturer, exact model, region, carrier, and hardware
              revision. Confirm your specific device with the eSIM
              Compatibility Checker before buying any plan, then follow
              your provider&apos;s current setup instructions.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Find My Best Option
              </Link>

              <Link className={styles.secondaryButton} href="/esim-checker">
                Check Your Android Compatibility
              </Link>
            </div>

            <p className={styles.disclosure}>
              This guide complements the eSIM Compatibility Checker rather
              than replacing it. Always confirm your exact manufacturer,
              model, region, and carrier status before purchasing a plan.
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
              <h2>How eSIM setup generally works on Android</h2>
              <p>
                Exact steps and menu names vary by manufacturer and
                Android version. Follow your provider&apos;s current
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
              <h2>Manufacturer, hotspot, and roaming differences</h2>
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
                If your Android phone or carrier situation does not
                support eSIM, a physical SIM or Pocket WiFi may be more
                practical.
              </p>
            </div>

            <div className={styles.providerActions} style={{ justifyContent: "center" }}>
              <Link className={styles.reviewLink} href="/sim-card">
                Japan SIM Card Guide
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
              <h2>Japan eSIM Android questions</h2>
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
                Check Your Android Compatibility
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
