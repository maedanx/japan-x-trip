import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/home-redesign/Header";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import "@/styles/home-redesign.css";
import { siteConfig } from "@/data/site";
import {
  connectivityProviders,
  getConnectivityProvider,
  getProviderCtaLabel,
  getProviderDestination,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";

type ProviderReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return connectivityProviders.map((provider) => ({
    slug: provider.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProviderReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getConnectivityProvider(slug);

  if (!provider) {
    return {
      title: "Provider Review Not Found",
    };
  }

  const title = `${provider.name} Review for Japan Travelers`;
  const description =
    `${provider.name} review covering suitability, setup, ` +
    `connection types, strengths, limitations, and what to ` +
    `check before buying for a trip to Japan.`;
  const canonicalPath = `/reviews/${provider.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title,
      description,
      siteName: "Japan X Trip",
      images: [
        {
          url: "/images/brand/og-image-web.png",
          width: 1200,
          height: 630,
          alt: `${provider.name} review by Japan X Trip`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/og-image-web.png"],
    },
  };
}

export default async function ProviderReviewPage({
  params,
}: ProviderReviewPageProps) {
  const { slug } = await params;
  const provider = getConnectivityProvider(slug);

  if (!provider) {
    notFound();
  }

  const affiliate = isAffiliateProviderLink(provider);
  const destination = getProviderDestination(provider);
  const ctaLabel = getProviderCtaLabel(provider, "Check current plans");
  const pageUrl = `${siteConfig.url}/reviews/${provider.slug}`;
  const showReviewInfographics = new Set([
    "sakura-mobile",
    "airalo",
    "ubigi",
    "japan-wireless",
    "ninja-wifi",
  ]).has(provider.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${provider.name} Review for Japan Travelers`,
    description: provider.summary,
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
        name: "Reviews",
        item: `${siteConfig.url}/#provider-list`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${provider.name} review`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema =
    provider.faqs && provider.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: provider.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Header />

      <main className="review-page">
        <section className="review-hero">
          <div className="container review-hero-inner">
            <Link className="review-back-link" href="/#provider-list">
              <span aria-hidden="true">←</span>
              Back to provider comparison
            </Link>

            <p className="eyebrow">{provider.tagline}</p>

            <h1>{provider.name} review</h1>

            <p className="review-hero-summary">
              {provider.summary}
            </p>

            <div className="review-type-list">
              {provider.connectionTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>

            <div className="review-hero-actions">
              {destination ? (
                <AffiliateCtaLink
                  className="button"
                  href={destination}
                  rel={
                    affiliate
                      ? "sponsored nofollow noopener noreferrer"
                      : "noopener noreferrer"
                  }
                  page={`/reviews/${provider.slug}`}
                  provider={provider.name}
                  product="General"
                  placement="hero"
                >
                  {ctaLabel}
                  <span aria-hidden="true">→</span>
                </AffiliateCtaLink>
              ) : null}

              <Link
                className="review-secondary-link"
                href="/how-we-review-providers"
              >
                See our review method
              </Link>

              <Link className="review-secondary-link" href="/diagnosis">
                Not sure yet? Take the 30-sec check
              </Link>
            </div>
          </div>
        </section>

        <section className="review-content">
          <div className="container review-layout">
            <aside className="review-summary-card">
              <p className="eyebrow">Quick assessment</p>
              <h2>Who may consider it?</h2>

              <ul>
                {provider.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {provider.notIdealFor && provider.notIdealFor.length > 0 ? (
                <>
                  <h2>Not ideal for</h2>
                  <ul className="review-not-ideal-list">
                    {provider.notIdealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <p className="review-summary-note">
                This assessment is based primarily on provider
                information and practical traveler needs. It is
                not presented as a guarantee of performance.
              </p>
            </aside>

            <article className="review-article">
              {provider.quickVerdict ? (
                <section className="review-quick-verdict">
                  <p className="eyebrow">Quick verdict</p>
                  <p>{provider.quickVerdict}</p>
                </section>
              ) : null}

              {showReviewInfographics ? (
                <figure className="review-infographic">
                  <Image
                    src="/assets/infographics/reviews/review-guide-01-who-should-choose-this.webp"
                    alt="Who should choose an eSIM or Pocket WiFi for travel in Japan"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 760px) 100vw, 760px"
                  />
                </figure>
              ) : null}

              {provider.atAGlance && provider.atAGlance.length > 0 ? (
                <section className="review-section review-at-a-glance">
                  <p className="eyebrow">At a glance</p>
                  <h2>{provider.name} at a glance</h2>

                  <dl className="review-at-a-glance-grid">
                    {provider.atAGlance.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {provider.products && provider.products.length > 0 ? (
                <section className="review-section">
                  <p className="eyebrow">Choose a plan</p>
                  <h2>{provider.name} plan options</h2>

                  <p>
                    Select the plan you want to check, then confirm the
                    exact price and data allowance on the checkout page.
                  </p>

                  <div className="review-hero-actions">
                    {provider.products.map((product) =>
                      product.image ? (
                        <div className="review-product-card" key={product.label}>
                          <div className="review-product-card__image">
                            <Image
                              src={product.image.src}
                              alt={product.image.alt}
                              fill
                              sizes="(max-width: 620px) 40vw, 168px"
                              style={{ objectFit: "contain" }}
                            />
                          </div>

                          <AffiliateCtaLink
                            className="button button--small review-product-card__cta"
                            href={product.affiliateUrl}
                            rel="sponsored nofollow noopener noreferrer"
                            ariaLabel={`View ${provider.name} ${product.label} plan`}
                            page={`/reviews/${provider.slug}`}
                            provider={provider.name}
                            product={product.label}
                            placement="plan-picker"
                          >
                            {product.label}
                            <span aria-hidden="true">→</span>
                          </AffiliateCtaLink>
                        </div>
                      ) : (
                        <AffiliateCtaLink
                          key={product.label}
                          className="button button--small"
                          href={product.affiliateUrl}
                          rel="sponsored nofollow noopener noreferrer"
                          ariaLabel={`View ${provider.name} ${product.label} plan`}
                          page={`/reviews/${provider.slug}`}
                          provider={provider.name}
                          product={product.label}
                          placement="plan-picker"
                        >
                          {product.label}
                          <span aria-hidden="true">→</span>
                        </AffiliateCtaLink>
                      ),
                    )}
                  </div>
                </section>
              ) : null}

              <section className="review-section">
                <p className="eyebrow">Overview</p>
                <h2>What to know about {provider.name}</h2>

                <p>
                  {provider.summary} The most suitable choice
                  depends on device compatibility, trip length,
                  data use, the number of travelers and devices,
                  and the preferred setup method.
                </p>

                <p>
                  Prices, plan names, included data, validity,
                  network arrangements, and support conditions
                  may change. Confirm the latest information on
                  the provider&apos;s official website before
                  purchasing.
                </p>
              </section>

              <section className="review-section">
                <p className="eyebrow">Potential advantages</p>
                <h2>Strengths</h2>

                <div className="review-check-grid">
                  {provider.reviewStrengths.map((item) => (
                    <div key={item}>
                      <span aria-hidden="true">✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="review-section">
                <p className="eyebrow">Important limitations</p>
                <h2>Things to consider</h2>

                <div className="review-consideration-list">
                  {provider.considerations.map((item, index) => (
                    <div key={item}>
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {showReviewInfographics ? (
                <figure className="review-infographic">
                  <Image
                    src="/assets/infographics/reviews/review-guide-02-pros-and-cons.webp"
                    alt="Pros and cons of travel connectivity options in Japan"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 760px) 100vw, 760px"
                  />
                </figure>
              ) : null}

              <section className="review-section">
                <p className="eyebrow">Before checkout</p>
                <h2>What to verify before buying</h2>

                <ul className="review-buying-list">
                  {provider.checkBeforeBuying.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              {showReviewInfographics ? (
                <figure className="review-infographic">
                  <Image
                    src="/assets/infographics/reviews/review-guide-03-how-it-works.webp"
                    alt="How to get connected in Japan in five simple steps"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 760px) 100vw, 760px"
                  />
                </figure>
              ) : null}

              <section className="review-method-note">
                <div>
                  <p className="eyebrow">Transparency</p>
                  <h2>How this review was prepared</h2>
                </div>

                <div>
                  <p>
                    Japan X Trip checks information primarily
                    against official provider websites. We do not
                    claim that every provider has been personally
                    tested in every location, device, or network
                    condition.
                  </p>

                  {provider.independentlyTested ? (
                    <p className="review-independent-test-note">
                      Japan X Trip independently tested {provider.name}
                      &apos;s service as part of this review.
                    </p>
                  ) : null}

                  <p>
                    Affiliate relationships do not determine
                    rankings or recommendations. This site may
                    receive a commission when a visitor purchases
                    through an affiliate link, at no additional
                    cost to the visitor.
                  </p>

                  <Link href="/how-we-review-providers">
                    Read the full review methodology
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>

              {showReviewInfographics ? (
                <figure className="review-infographic">
                  <Image
                    src="/assets/infographics/reviews/review-guide-04-esim-vs-pocket-wifi.webp"
                    alt="eSIM versus Pocket WiFi comparison for Japan travel"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 760px) 100vw, 760px"
                  />
                </figure>
              ) : null}

              {provider.faqs && provider.faqs.length > 0 ? (
                <section className="review-section review-faq">
                  <p className="eyebrow">Common questions</p>
                  <h2>{provider.name} FAQ</h2>

                  {provider.faqs.map((faq) => (
                    <details key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </section>
              ) : null}

              <section className="review-final-cta">
                <div>
                  <p className="eyebrow">Compare before buying</p>
                  <h2>
                    Check whether {provider.name} fits your trip.
                  </h2>

                  <p>
                    Compare it with alternative eSIM, physical SIM,
                    and pocket Wi-Fi options before making a final
                    decision.
                  </p>
                </div>

                <div className="review-final-actions">
                  {destination ? (
                    <AffiliateCtaLink
                      className="button"
                      href={destination}
                      rel={
                        affiliate
                          ? "sponsored nofollow noopener noreferrer"
                          : "noopener noreferrer"
                      }
                      page={`/reviews/${provider.slug}`}
                      provider={provider.name}
                      product="General"
                      placement="final"
                    >
                      {ctaLabel}
                      <span aria-hidden="true">→</span>
                    </AffiliateCtaLink>
                  ) : null}

                  <Link href="/#provider-list">
                    Compare all providers
                  </Link>
                </div>
              </section>
            </article>
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
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}
