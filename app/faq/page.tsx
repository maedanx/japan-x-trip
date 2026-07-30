import type { Metadata } from "next";
import Header from "@/components/home-redesign/Header";
import Container from "@/components/home-redesign/Container";
import Footer from "@/components/layout/Footer";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import FaqFinalCta from "@/components/faq/FaqFinalCta";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/site";
import "@/styles/home-redesign.css";
import "@/styles/faq-page.css";

const pageUrl = `${siteConfig.url}/faq`;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Quick answers about eSIMs, SIM cards, pocket Wi-Fi, device compatibility, setup, and staying connected in Japan.",
  alternates: {
    canonical: pageUrl,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main>
        <section className="jxfaq-hero" aria-labelledby="jxfaq-hero-title">
          <Container>
            <p className="jxfaq-hero__eyebrow">Travel Connectivity Help</p>
            <h1 id="jxfaq-hero-title" className="jxfaq-hero__title">
              Frequently Asked Questions
            </h1>
            <p className="jxfaq-hero__subtitle">
              Quick answers about eSIMs, SIM cards, pocket Wi-Fi, device
              compatibility, setup, and staying connected in Japan.
            </p>
          </Container>
        </section>

        <FaqAccordionList />
        <FaqFinalCta />
      </main>

      <Footer />
    </>
  );
}
