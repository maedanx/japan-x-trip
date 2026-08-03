"use client";

import Link from "next/link";
import {
  trackDiagnosisEntryClick,
  trackHomeNavClick,
} from "@/lib/analytics";
import Container from "./Container";
import styles from "./CompareIntroduction.module.css";

const COMPARE_CARDS = [
  {
    key: "esim",
    title: "eSIM",
    bestFor: "Solo travelers",
    href: "/esim",
    linkLabel: "Explore eSIM",
    points: [
      "Fast digital setup",
      "No physical SIM swap",
      "Best for compatible unlocked phones",
    ],
    details: [
      { label: "Setup", value: "Before your trip" },
      { label: "Devices", value: "1 compatible phone" },
      { label: "Carry", value: "Nothing extra" },
    ],
    tone: "blue",
    icon: <EsimIcon />,
  },
  {
    key: "wifi",
    title: "Pocket Wi-Fi",
    bestFor: "Families & groups",
    href: "/pocket-wifi",
    linkLabel: "Explore Pocket WiFi",
    points: [
      "Connect multiple devices",
      "No phone compatibility concerns",
      "Best for families and groups",
    ],
    details: [
      { label: "Setup", value: "Pickup or delivery" },
      { label: "Devices", value: "Multiple devices" },
      { label: "Carry", value: "Small router" },
    ],
    tone: "coral",
    icon: <WifiIcon />,
  },
  {
    key: "sim",
    title: "SIM Card",
    bestFor: "When eSIM is unavailable",
    href: "/sim-card",
    linkLabel: "Explore SIM Cards",
    points: [
      "Physical SIM for your phone",
      "Useful when eSIM is not supported",
      "Best for unlocked devices with a SIM slot",
    ],
    details: [
      { label: "Setup", value: "Insert on arrival" },
      { label: "Devices", value: "1 unlocked phone" },
      { label: "Carry", value: "Nothing extra" },
    ],
    tone: "green",
    icon: <SimIcon />,
  },
] as const;

export default function CompareIntroduction() {
  function trackOption(href: (typeof COMPARE_CARDS)[number]["href"]) {
    if (href === "/esim") {
      trackHomeNavClick("home-option-esim");
      return;
    }

    if (href === "/pocket-wifi") {
      trackHomeNavClick("home-option-pocket-wifi");
      return;
    }

    trackHomeNavClick("home-option-sim-card");
  }

  return (
    <>
      <section
        className={`${styles.desktopOnly} jxm-compare-intro`}
        aria-labelledby="jxm-compare-intro-title"
      >
        <Container>
          <div className="jxm-compare-intro__heading">
            <p className="jxm-compare-intro__eyebrow">Compare Options</p>
            <h2 id="jxm-compare-intro-title">Compare Your Options</h2>
            <p className="jxm-compare-intro__subtitle">
              See the key differences between eSIM, SIM cards, and Pocket
              Wi-Fi.
            </p>
          </div>

          <div className="jxm-compare-intro__grid">
            {COMPARE_CARDS.map((card) => (
              <div className="jxm-compare-intro__card" key={card.key}>
                <span className="jxm-compare-intro__icon" aria-hidden="true">
                  {card.icon}
                </span>

                <h3>{card.title}</h3>

                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="jxm-compare-intro__cta-row">
            <Link
              href="/compare"
              className="jx-cta jx-cta--secondary jx-cta--default jxm-compare-intro__cta"
              onClick={() => trackHomeNavClick("home-compare-all-options")}
            >
              Compare All Options
            </Link>
          </div>
        </Container>
      </section>

      <section
        className={styles.mobileSection}
        aria-labelledby="mobile-compare-title"
      >
        <div className={styles.mobileContainer}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>Choose your connection type</p>

            <h2 id="mobile-compare-title">
              Choose Your Connection
            </h2>

            <p>
              Compare the three main options.
            </p>
          </header>

          <div className={styles.cardList}>
            {COMPARE_CARDS.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className={`${styles.card} ${styles[card.tone]}`}
                onClick={() => trackOption(card.href)}
              >
                <div className={styles.cardTop}>
                  <span className={styles.icon} aria-hidden="true">
                    {card.icon}
                  </span>

                  <div className={styles.cardTitle}>
                    <span className={styles.bestFor}>{card.bestFor}</span>
                    <h3>{card.title}</h3>
                  </div>
                </div>

                <dl className={styles.details}>
                  {card.details.map((detail) => (
                    <div key={detail.label}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>

                <span className={styles.cardAction}>
                  {card.linkLabel}
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>

          <div className={styles.compareAction}>
            <Link
              href="/compare"
              onClick={() => trackHomeNavClick("home-compare-all-options")}
            >
              Compare all connection options
              <ArrowIcon />
            </Link>
          </div>

          <aside className={styles.diagnosis}>
            <span className={styles.diagnosisIcon} aria-hidden="true">
              <SparkIcon />
            </span>

            <div>
              <strong>Not sure?</strong>
              <p>Get your best match.</p>
            </div>

            <Link
              href="/diagnosis"
              onClick={() =>
                trackDiagnosisEntryClick("home-mid-diagnosis")
              }
              aria-label="Find my best connection option"
            >
              <ArrowIcon />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function EsimIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 6h4M11 18h2" />
    </svg>
  );
}

function SimIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h6l4 4v14H6V5a2 2 0 0 1 2-2Z" />
      <rect x="9" y="10" width="6" height="7" rx="1" />
      <path d="M12 10v7M9 13.5h6" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8 11a6 6 0 0 1 8 0M10 14a3 3 0 0 1 4 0" />
      <circle cx="12" cy="16.5" r=".8" />
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

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" />
      <path d="m18.5 14 .7 2.1 1.8.9-1.8.9-.7 2.1-.7-2.1-1.8-.9 1.8-.9.7-2.1Z" />
    </svg>
  );
}
