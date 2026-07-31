import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./ui/PrimaryButton";
import { affiliateLinks } from "@/data/affiliateLinks";
import styles from "./SimCardMobile.module.css";
import Breadcrumb from "./navigation/Breadcrumb";

import SecondaryButton from "./ui/SecondaryButton";
import SectionHeading from "./ui/SectionHeading";
const FEATURES = [
  {
    title: "Works Without eSIM",
    detail: "For compatible unlocked phones",
    icon: <SimIcon />,
  },
  {
    title: "Direct Phone Data",
    detail: "No separate router",
    icon: <PhoneDataIcon />,
  },
  {
    title: "Keep It Simple",
    detail: "Familiar physical setup",
    icon: <SimpleIcon />,
  },
  {
    title: "Pickup or Delivery",
    detail: "Check provider conditions",
    icon: <DeliveryIcon />,
  },
] as const;

const PRODUCT = {
  provider: "Sakura Mobile",
  name: "Sakura Mobile Travel SIM",
  badge: "AVAILABLE",
  description:
    "A Japan-focused physical SIM option with English-language setup guidance.",
  strengths: [
    "Physical SIM for compatible unlocked phones",
    "Japan-focused support information",
    "Setup guidance in English",
    "Check delivery or pickup conditions",
  ],
  reviewHref: "/reviews/sakura-mobile",
  affiliateHref: affiliateLinks.sakuraMobile.travelSim,
} as const;

export default function SimCardMobile() {
  return (
    <div className={styles.mobilePage}>
      <section className={styles.hero}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "SIM Card" },
          ]}
        />

        <h1>SIM Cards for Japan</h1>

        <p className={styles.intro}>
          Use mobile data directly on your phone.
          <br />
          A practical option for compatible unlocked devices.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.simVisual}>
            <div className={styles.simGlow} aria-hidden="true" />

            <Image
              src="/images/mobile/icons/categories/sim-card.png"
              alt="A physical SIM card for Japan"
              fill
              priority
              sizes="46vw"
              className={styles.simImage}
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

      <section className={styles.fitGuidance} aria-labelledby="mobile-sim-card-fit-title">
        <span className={styles.fitGuidanceLabel}>Quick answer</span>

        <h2 id="mobile-sim-card-fit-title">Who should consider a physical SIM?</h2>

        <ul>
          <li>Your unlocked phone does not support eSIM</li>
          <li>You want data directly on one phone</li>
          <li>You are comfortable removing your home SIM</li>
          <li>You can collect or receive the card before use</li>
        </ul>

        <span className={styles.fitGuidanceLabel}>Less ideal if</span>

        <ul>
          <li>Your phone is carrier-locked</li>
          <li>You would rather not remove your home SIM</li>
        </ul>

        <Link href="/sim-card-vs-esim">
          Compare physical SIM and eSIM
          <ArrowIcon />
        </Link>
      </section>

      <section
        className={styles.products}
        aria-labelledby="mobile-sim-card-title"
      >
        <h2 id="mobile-sim-card-title" className={styles.srOnly}>
          SIM card options for Japan
        </h2>

        <div className={styles.tabs} aria-label="SIM card categories">
          <span className={styles.activeTab}>Popular</span>
          <span>Easy Setup</span>
          <span>Before Arrival</span>
        </div>

        <div className={styles.productList}>
          <article className={styles.productCard}>
            <div className={styles.productMedia}>
              <Image
                src="/images/mobile/icons/categories/sim-card.png"
                alt=""
                fill
                sizes="105px"
                className={styles.productImage}
              />
            </div>

            <div className={styles.productContent}>
              <div className={styles.productTop}>
                <div>
                  <small>{PRODUCT.provider}</small>
                  <h3>{PRODUCT.name}</h3>
                </div>

                <span className={styles.availableBadge}>{PRODUCT.badge}</span>
              </div>

              <p className={styles.productDescription}>
                {PRODUCT.description}
              </p>

              <ul>
                {PRODUCT.strengths.map((strength) => (
                  <li key={strength}>
                    <CheckIcon />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.productBottom}>
                <div>
                  <small>Current conditions</small>
                  <strong>Check provider</strong>
                </div>

                <PrimaryButton
                  href={PRODUCT.affiliateHref}
                  className={styles.primaryButton}
                  variant="provider"
                  rel="sponsored noopener noreferrer"
                  page="/sim-card"
                  provider="Sakura Mobile"
                  product="Travel SIM"
                  placement="card"
                >
                  Check Price
                </PrimaryButton>
              </div>

              <Link href={PRODUCT.reviewHref} className={styles.reviewLink}>
                Read the full review
                <ArrowIcon />
              </Link>
            </div>
          </article>
        </div>

        <SecondaryButton
            href="/compare#providers"
            variant="more"
          >
            Browse SIM &amp; travel providers
          </SecondaryButton>
      </section>

      <section className={styles.checkSection}>
        <div className={styles.checkIcon}>
          <PhoneCheckIcon />
        </div>

        <div>
          <small>Before you buy</small>
          <SectionHeading variant="check">
            Check that your phone can use a physical SIM
          </SectionHeading>
          <p>
            Confirm that the device is carrier-unlocked and accepts the
            correct SIM size.
          </p>
        </div>

        <Link href="/diagnosis">
          Check My Options
          <ArrowIcon />
        </Link>
      </section>

      <section className={styles.notice}>
        <span className={styles.noticeIcon}>
          <AlertIcon />
        </span>

        <div>
          <small>Before you switch</small>
          <SectionHeading variant="check">
            Before replacing your home SIM
          </SectionHeading>

          <ul>
            <li>Keep your home SIM in a safe holder</li>
            <li>Confirm the required SIM size</li>
            <li>Check APN setup instructions</li>
            <li>Prevent accidental roaming charges</li>
          </ul>
        </div>
      </section>

      <section className={styles.finalCta}>
        <small>Not sure which option fits?</small>

        <SectionHeading variant="diagnosis">
            Find your best internet option
          </SectionHeading>

        <p>
          Answer a few questions about your phone, trip, and travel style.
        </p>

        <Link href="/diagnosis">
          Find My Best Option
          <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function SimIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 3h8l5 5v13H7z" />
      <rect x="10" y="10" width="6" height="5" rx="1" />
    </svg>
  );
}

function PhoneDataIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M9 18h6M9 6h6" />
    </svg>
  );
}

function SimpleIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
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

function PhoneCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 3 20h18Z" />
      <path d="M12 10v4M12 17h.01" />
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
