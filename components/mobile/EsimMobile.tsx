import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./ui/PrimaryButton";
import { affiliateLinks } from "@/data/affiliateLinks";
import styles from "./EsimMobile.module.css";
import Breadcrumb from "./navigation/Breadcrumb";

import SectionHeading from "./ui/SectionHeading";
const FEATURES = [
  {
    title: "Instant Setup",
    detail: "Digital installation",
    icon: <SetupIcon />,
  },
  {
    title: "High Speed",
    detail: "Check current network",
    icon: <WifiIcon />,
  },
  {
    title: "Keep Your Number",
    detail: "Keep your home SIM",
    icon: <PhoneIcon />,
  },
  {
    title: "24/7 Support",
    detail: "Check provider support",
    icon: <SupportIcon />,
  },
] as const;

const PLANS = [
  {
    name: "Japan eSIM 5GB",
    allowance: "5GB",
    badge: "POPULAR",
    href: affiliateLinks.airalo.fiveGb,
    description: "A smaller-data option for maps, messaging, and light use.",
  },
  {
    name: "Japan eSIM 10GB",
    allowance: "10GB",
    badge: null,
    href: affiliateLinks.airalo.tenGb,
    description: "A mid-size option for regular browsing, maps, and social use.",
  },
  {
    name: "Japan eSIM 20GB",
    allowance: "20GB",
    badge: null,
    href: affiliateLinks.airalo.twentyGb,
    description: "A larger-data option for travelers expecting heavier use.",
  },
] as const;

export default function EsimMobile() {
  return (
    <div className={styles.mobilePage}>
      <section className={styles.hero}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "eSIM" },
          ]}
        />

        <h1>eSIM Plans for Japan</h1>

        <p className={styles.intro}>
          Instant digital setup. No physical SIM needed.
          <br />
          A simple option for compatible phones.
        </p>

        <div className={styles.heroGrid}>
          <div className={styles.phoneVisual}>
            <div className={styles.phoneGlow} aria-hidden="true" />

            <Image
              src="/images/comparisons/esim-sim-pocket-wifi-comparison.png"
              alt="A smartphone with a QR code activating a digital eSIM"
              fill
              priority
              sizes="48vw"
              className={styles.phoneImage}
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
        className={styles.plans}
        aria-labelledby="mobile-esim-plans-title"
      >
        <h2 id="mobile-esim-plans-title" className={styles.srOnly}>
          Japan eSIM plans
        </h2>

        <div className={styles.tabs} aria-label="Plan categories">
          <span className={styles.activeTab}>Popular</span>
          <span>Unlimited</span>
          <span>Best Value</span>
        </div>

        <div className={styles.planList}>
          {PLANS.map((plan) => (
            <article className={styles.planCard} key={plan.name}>
              <div className={styles.planTop}>
                <div>
                  <small>Airalo Japan eSIM</small>
                  <h3>{plan.name}</h3>
                  <p>{plan.allowance} · Confirm validity before buying</p>
                </div>

                {plan.badge ? (
                  <span className={styles.planBadge}>{plan.badge}</span>
                ) : null}
              </div>

              <p className={styles.planDescription}>{plan.description}</p>

              <div className={styles.planDetails}>
                <span>
                  <SpeedIcon />
                  High-speed data
                </span>

                <span>
                  <SetupMiniIcon />
                  Digital installation
                </span>

                <span>
                  <SupportMiniIcon />
                  Provider support
                </span>
              </div>

              <div className={styles.planBottom}>
                <div className={styles.priceNotice}>
                  <small>Current price</small>
                  <strong>Check provider</strong>
                </div>

                <PrimaryButton
                  href={plan.href}
                  variant="plan"
                  rel="sponsored nofollow noopener"
                  page="/esim"
                  provider="Airalo"
                  product={plan.allowance}
                  placement="card"
                >
                  View Details
                </PrimaryButton>
              </div>
            </article>
          ))}
        </div>

        <Link href="/best-esim-japan" className={styles.morePlans}>
          View More eSIM Options
          <ArrowIcon />
        </Link>
      </section>

      <section className={styles.checkSection}>
        <div className={styles.checkIcon}>
          <PhoneCheckIcon />
        </div>

        <div>
          <small>Before you buy</small>
          <SectionHeading variant="check">
            Check that your phone supports eSIM
          </SectionHeading>
          <p>
            Your phone must support eSIM and be carrier-unlocked.
          </p>
        </div>

        <Link href="/esim-checker">
          Check My Phone
          <ArrowIcon />
        </Link>
      </section>

      <section className={styles.finalCta}>
        <small>Not sure which plan fits?</small>

        <SectionHeading variant="diagnosis">
            Find your best internet option
          </SectionHeading>

        <p>
          Answer a few questions about your phone, trip length, and data use.
        </p>

        <Link href="/diagnosis">
          Find My Best Option
          <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function SetupIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 6h4M10 17h4" />
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 6h6M10 18h4" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14v-3a4 4 0 0 1 8 0v3" />
      <path d="M8 13H6v4h3M16 13h2v4h-3" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="m12 15 4-5" />
      <circle cx="12" cy="15" r="1.5" />
    </svg>
  );
}

function SetupMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12M8 7l4-4 4 4" />
      <rect x="5" y="15" width="14" height="6" rx="2" />
    </svg>
  );
}

function SupportMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
