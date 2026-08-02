import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./ui/PrimaryButton";
import { affiliateLinks } from "@/data/affiliateLinks";
import styles from "./PocketWifiMobile.module.css";
import Breadcrumb from "./navigation/Breadcrumb";

import SecondaryButton from "./ui/SecondaryButton";
import SectionHeading from "./ui/SectionHeading";
const FEATURES = [
  {
    title: "Connect Devices",
    detail: "Up to router limit",
    icon: <DevicesIcon />,
  },
  {
    title: "High Speed",
    detail: "Check network",
    icon: <WifiIcon />,
  },
  {
    title: "Battery Life",
    detail: "Charge daily",
    icon: <BatteryIcon />,
  },
  {
    title: "Delivery & Return",
    detail: "Check rules",
    icon: <DeliveryIcon />,
  },
] as const;

type PocketWifiProvider = {
  name: string;
  provider: string;
  subtitle: string;
  strengths: readonly string[];
  reviewHref: string;
  affiliateHref?: string;
};

const PROVIDERS: readonly PocketWifiProvider[] = [
  {
    name: "Sakura Mobile Pocket WiFi",
    provider: "Sakura Mobile",
    subtitle: "Japan-focused rental",
    strengths: [
      "Share one connection",
      "English-language support",
      "Delivery or pickup",
      "Return after use",
    ],
    reviewHref: "/sakura-mobile-review",
    affiliateHref: affiliateLinks.sakuraMobile.travelPocketWifi,
  },
  {
    name: "Japan Wireless Pocket WiFi",
    provider: "Japan Wireless",
    subtitle: "Group travel option",
    strengths: [
      "Useful for several devices",
      "Designed for Japan travel",
      "Check delivery or pickup",
      "Check current return rules",
    ],
    reviewHref: "/reviews/japan-wireless",
  },
] as const;

type PocketWifiFaq = {
  question: string;
  answer: string;
};

type PocketWifiMobileProps = {
  /**
   * Shared with app/pocket-wifi/page.tsx's FAQPage structured data so the
   * visible FAQ and the schema never drift apart.
   */
  faqs: PocketWifiFaq[];
};

export default function PocketWifiMobile({ faqs }: PocketWifiMobileProps) {
  return (
    <div className={styles.mobilePage}>
      <section className={styles.hero}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Pocket WiFi" },
          ]}
        />

        <h1>Pocket WiFi for Japan</h1>

        <p className={styles.intro}>
          Share internet with family and friends.
          <br />
          Connect phones, tablets, and laptops.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.routerVisual}>
            <div className={styles.routerGlow} aria-hidden="true" />

            <Image
              src="/images/comparisons/esim-sim-pocket-wifi-comparison.png"
              alt="A portable Pocket WiFi router connecting a phone and laptop"
              fill
              priority
              sizes="52vw"
              className={styles.routerImage}
            />
          </div>

          <div className={styles.featureList}>
            {FEATURES.map((feature, index) => (
              <div className={styles.feature} key={feature.title}>
                <span
                  className={`${styles.featureIcon} ${
                    styles[`featureIcon${index + 1}`]
                  }`}
                  aria-hidden="true"
                >
                  {feature.icon}
                </span>

                <span>
                  <strong>{feature.title}</strong>
                  <small>{feature.detail}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.devices}
        aria-labelledby="mobile-pocket-wifi-title"
      >
        <h2 id="mobile-pocket-wifi-title" className={styles.srOnly}>
          Pocket WiFi options for Japan
        </h2>

        <div className={styles.tabs} aria-label="Pocket WiFi categories">
          <span className={styles.activeTab}>Best Seller</span>
          <span>Unlimited</span>
          <span>Long Battery</span>
        </div>

        <div className={styles.providerList}>
          {PROVIDERS.map((provider, index) => (
            <article className={styles.providerCard} key={provider.name}>
              <div className={styles.providerMedia}>
                <Image
                  src="/images/comparisons/esim-sim-pocket-wifi-comparison.png"
                  alt=""
                  fill
                  sizes="105px"
                  className={styles.providerImage}
                />
              </div>

              <div className={styles.providerContent}>
                <div className={styles.providerTop}>
                  <h3>{provider.name}</h3>

                  {index === 0 ? (
                    <span className={styles.bestSellerBadge}>
                      BEST SELLER
                    </span>
                  ) : null}
                </div>

                <p className={styles.providerSubtitle}>
                  {provider.subtitle}
                </p>

                <ul>
                  {provider.strengths.map((strength) => (
                    <li key={strength}>
                      <CheckIcon />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.providerBottom}>
                  {provider.affiliateHref ? (
                    <PrimaryButton
                      href={provider.affiliateHref}
                      className={styles.primaryButton}
                      variant="provider"
                      rel="sponsored nofollow noopener noreferrer"
                      page="/pocket-wifi"
                      provider={provider.provider}
                      product="Travel Pocket WiFi"
                      placement="card"
                    >
                      Check Price
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton
                      href={provider.reviewHref}
                      variant="provider"
                    >
                      View Details
                    </SecondaryButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <SecondaryButton href="/compare" variant="more">
          View More Options
        </SecondaryButton>
      </section>

      <section className={styles.familyCard}>
        <div className={styles.familyContent}>
          <small>Traveling as a family?</small>

          <h2>Is one router enough?</h2>

          <p>
            A shared router works best when everyone stays together.
          </p>

          <Link href="/pocket-wifi-for-family-japan">
            Check My Family
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className={styles.notice}>
        <span className={styles.noticeIcon}>
          <ReturnIcon />
        </span>

        <div>
          <small>Before booking</small>
          <SectionHeading variant="check">
            Check pickup and return details
          </SectionHeading>
          <p>
            Confirm the terminal, opening hours, delivery deadline, and
            return method.
          </p>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="mobile-pocket-wifi-faq-title">
        <small>FAQ</small>
        <h2 id="mobile-pocket-wifi-faq-title">Japan pocket Wi-Fi questions</h2>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronIcon />
              </summary>

              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <small>Not sure what your group needs?</small>

        <SectionHeading variant="diagnosis">
            Find your best internet option
          </SectionHeading>

        <p>
          Answer a few questions about travelers, devices, and trip style.
        </p>

        <Link href="/diagnosis">
          Find My Best Option
          <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function DevicesIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="5" width="12" height="9" rx="2" />
      <rect x="16" y="8" width="5" height="10" rx="1" />
      <path d="M7 18h5M9.5 14v4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 9a14 14 0 0 1 18 0" />
      <path d="M6.5 12.5a9 9 0 0 1 11 0" />
      <path d="M10 16a4 4 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="7" width="15" height="10" rx="2" />
      <path d="M21 10v4M8 10v4M12 10v4" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7H5v3" />
      <path d="M5 10a7 7 0 1 1 1 6" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
