import Link from "next/link";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import {
  connectivityProviders,
  getProviderCtaLabel,
  getProviderDestination,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const PROVIDER_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-provider-guide-mobile.webp";

const approvedProviders = connectivityProviders.filter(
  (provider) =>
    provider.affiliateStatus === "approved" &&
    provider.connectionTypes.some(
      (type) => type === "eSIM" || type === "Pocket Wi-Fi",
    ),
);

function getRelevantConnectionTypes(connectionTypes: string[]) {
  return connectionTypes.filter(
    (type) => type === "eSIM" || type === "Pocket Wi-Fi",
  );
}

function ProviderCard({
  provider,
}: {
  provider: (typeof approvedProviders)[number];
}) {
  const destination = getProviderDestination(provider);
  const affiliate = isAffiliateProviderLink(provider);
  const ctaLabel = getProviderCtaLabel(provider, "Visit official site");
  const relevantTypes = getRelevantConnectionTypes(provider.connectionTypes);

  return (
    <article className={styles.providerCard}>
      <div className={styles.providerCardHeader}>
        <div>
          <p className={styles.cardLabel}>{relevantTypes.join(" + ")}</p>
          <h3>{provider.name}</h3>
        </div>
      </div>

      <p className={styles.providerFit}>{provider.fit}</p>

      <ul className={styles.checkList}>
        {provider.strengths.slice(0, 2).map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </ul>

      <p className={styles.providerCaution}>
        <strong>Verify:</strong> {provider.caution}
      </p>

      <div className={styles.providerActions}>
        <Link className={styles.secondaryButton} href={provider.reviewHref}>
          Read review
        </Link>

        {destination ? (
          <AffiliateCtaLink
            className={styles.primaryButton}
            href={destination}
            rel={
              affiliate
                ? "sponsored nofollow noopener noreferrer"
                : "noopener noreferrer"
            }
            ariaLabel={`${ctaLabel} on the ${provider.name} website`}
            page="/esim-vs-pocket-wifi-japan"
            provider={provider.name}
            product="General"
            placement="card"
          >
            {ctaLabel}
          </AffiliateCtaLink>
        ) : null}
      </div>

      {destination ? (
        <p className={styles.providerLinkNote}>
          {affiliate ? "Affiliate link" : "Official provider site"}
        </p>
      ) : null}
    </article>
  );
}

export default function ProviderSection() {
  return (
    <section className={styles.sectionAlt} aria-labelledby="providers-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Provider starting points</p>
          <h2 id="providers-heading">Choose the format first, then compare providers.</h2>
          <p>
            Review current plans only after deciding whether your trip fits an
            eSIM, Pocket WiFi, or both.
          </p>
        </header>

        <ArticleImage
          src={PROVIDER_IMAGE}
          alt="Provider guide for comparing eSIM and Pocket WiFi options for a Japan trip"
          width={864}
          height={1821}
          caption="Use the guide to narrow the field, then verify current price, data, pickup, return, and support terms."
        />

        <div className={styles.providerGroup}>
          <div className={styles.providerGroupHeading}>
            <p className={styles.cardLabel}>Approved starting points</p>
            <h3>Compare only the providers that match your chosen format.</h3>
          </div>

          <div className={styles.providerGrid}>
            {approvedProviders.map((provider) => (
              <ProviderCard key={provider.slug} provider={provider} />
            ))}
          </div>
        </div>

        <aside className={styles.disclosureBox}>
          <p>
            Japan X Trip may earn a commission at no extra cost to you.
            Recommendations are based on traveler fit, not commission rate.
          </p>

          <div className={styles.relatedLinks}>
            <Link href="/how-we-review-providers">How we review providers</Link>
            <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
