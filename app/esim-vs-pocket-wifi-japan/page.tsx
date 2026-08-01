import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/home-redesign/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import ArticleHero from "./components/ArticleHero";
import QuickAnswer from "./components/QuickAnswer";
import ComparisonSection from "./components/ComparisonSection";
import DecisionFactors from "./components/DecisionFactors";
import TravelerTypes from "./components/TravelerTypes";
import CostComparison from "./components/CostComparison";
import CoverageSection from "./components/CoverageSection";
import SetupComparison from "./components/SetupComparison";
import DecisionFlow from "./components/DecisionFlow";
import ProviderSection from "./components/ProviderSection";
import ProsCons from "./components/ProsCons";
import ArticleFaq, { articleFaqs } from "./components/ArticleFaq";
import FinalRecommendation from "./components/FinalRecommendation";
import FinderCta from "./components/FinderCta";
import styles from "./page.module.css";
import "@/styles/home-redesign.css";

const pageUrl = `${siteConfig.url}/esim-vs-pocket-wifi-japan`;
const heroImageUrl = `${siteConfig.url}/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-hero-mobile.webp`;
const pageTitle = "eSIM vs Pocket WiFi for Japan (2026): Which Is Better?";
const pageDescription =
  "Compare eSIM and Pocket WiFi for Japan by compatibility, group size, devices, setup, cost, coverage, data use, and travel style.";

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
        url: heroImageUrl,
        width: 1024,
        height: 1536,
        alt: "International travelers in Japan comparing an eSIM phone and a Pocket WiFi device",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImageUrl],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: pageUrl,
  mainEntityOfPage: pageUrl,
  image: heroImageUrl,
  datePublished: "2026-08-02",
  dateModified: "2026-08-02",
  author: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "eSIM vs Pocket WiFi for Japan",
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: articleFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function EsimVsPocketWifiJapanPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <ArticleHero />

        <article className={styles.article}>
          <section className={styles.section} aria-labelledby="introduction-heading">
            <div className={styles.narrow}>
              <header className={styles.sectionHeading}>
                <p className={styles.eyebrow}>Start with your actual trip</p>
                <h2 id="introduction-heading">
                  Neither option is automatically better for everyone.
                </h2>
              </header>

              <div className={styles.prose}>
                <p>
                  eSIM is usually lighter and more independent. Pocket WiFi is
                  often easier to share. The right starting point depends on your
                  phone, group, devices, and whether travelers will stay together.
                </p>
                <p>
                  Use the quick answer first, then check cost, coverage, setup, and
                  current plan conditions before buying.
                </p>
              </div>
            </div>
          </section>

          <QuickAnswer />
          <ComparisonSection />

          <section className={styles.section} aria-labelledby="esim-explained-heading">
            <div className={styles.narrow}>
              <header className={styles.sectionHeading}>
                <p className={styles.eyebrow}>The digital option</p>
                <h2 id="esim-explained-heading">What is an eSIM?</h2>
              </header>

              <div className={styles.prose}>
                <p>
                  An eSIM is a digital SIM profile installed on an unlocked,
                  compatible phone. It removes the need for pickup, return, or a
                  physical SIM swap. Installation, activation timing, data limits,
                  and hotspot support still depend on the selected plan.
                </p>
              </div>

              <div className={styles.relatedLinks}>
                <Link href="/esim">Read the Japan eSIM guide</Link>
                <Link href="/esim-checker">Check eSIM compatibility</Link>
              </div>
            </div>
          </section>

          <section className={styles.sectionAlt} aria-labelledby="wifi-explained-heading">
            <div className={styles.narrow}>
              <header className={styles.sectionHeading}>
                <p className={styles.eyebrow}>The shared-router option</p>
                <h2 id="wifi-explained-heading">What is Pocket WiFi?</h2>
              </header>

              <div className={styles.prose}>
                <p>
                  Pocket WiFi is a portable rental router that shares one internet
                  connection with nearby phones, tablets, and laptops. It works
                  without eSIM support, but the router must be collected or
                  delivered, carried, charged, and usually returned.
                </p>
              </div>

              <div className={styles.relatedLinks}>
                <Link href="/pocket-wifi">Read the Pocket WiFi guide</Link>
                <Link href="/airport">Compare airport pickup options</Link>
              </div>
            </div>
          </section>

          <DecisionFactors />
          <TravelerTypes />
          <CostComparison />
          <CoverageSection />
          <SetupComparison />
          <DecisionFlow />
          <ProviderSection />
          <ProsCons />
          <ArticleFaq />
          <FinalRecommendation />
          <FinderCta />
        </article>
      </main>

      <Footer />
    </>
  );
}
