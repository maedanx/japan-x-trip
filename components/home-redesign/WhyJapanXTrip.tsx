"use client";

import Link from "next/link";
import { trackHomeNavClick } from "@/lib/analytics";
import Container from "./Container";
import styles from "./WhyJapanXTrip.module.css";

const WHY_ITEMS = [
  {
    title: "Clear Comparisons",
    description:
      "We explain the practical differences between eSIM, SIM cards, and Pocket Wi-Fi.",
  },
  {
    title: "Independent Guidance",
    description:
      "Recommendations are based on trip needs, device compatibility, and usage — not a single provider.",
  },
  {
    title: "Transparent Affiliate Links",
    description:
      "Some links may earn us a commission at no extra cost to you.",
  },
] as const;

const MOBILE_TRUST_ITEMS = [
  {
    title: "Independent comparisons",
    description:
      "Consistent criteria for every option.",
    icon: <CompareIcon />,
    tone: "blue",
  },
  {
    title: "Transparent recommendations",
    description:
      "Clear affiliate disclosure. No extra cost to you.",
    icon: <ShieldIcon />,
    tone: "coral",
  },
  {
    title: "Built for Japan travelers",
    description:
      "Advice built around real Japan trips.",
    icon: <JapanIcon />,
    tone: "green",
  },
] as const;

export default function WhyJapanXTrip() {
  return (
    <>
      <section
        className={`${styles.desktopOnly} jxm-why-jxt`}
        aria-labelledby="jxm-why-jxt-title"
      >
        <Container>
          <h2 id="jxm-why-jxt-title">Why Japan X Trip?</h2>

          <ol className="jxm-why-jxt__list">
            {WHY_ITEMS.map((item, index) => (
              <li className="jxm-why-jxt__item" key={item.title}>
                <span className="jxm-why-jxt__index" aria-hidden="true">
                  {index + 1}
                </span>

                <div className="jxm-why-jxt__item-body">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="jxm-why-jxt__links">
            <Link
              href="/how-we-review-providers"
              className="jxm-why-jxt__link"
              onClick={() => trackHomeNavClick("home-why-review-method")}
            >
              How We Review Providers
            </Link>

            <Link
              href="/affiliate-disclosure"
              className="jxm-why-jxt__link"
              onClick={() =>
                trackHomeNavClick("home-why-affiliate-disclosure")
              }
            >
              Affiliate Disclosure
            </Link>
          </div>
        </Container>
      </section>

      <section
        className={styles.mobileSection}
        aria-labelledby="mobile-why-jxt-title"
      >
        <div className={styles.container}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>Why Japan X Trip</p>

            <h2 id="mobile-why-jxt-title">
              Clear, Honest Guidance
            </h2>

            <p>
              Compare confidently before you buy.
            </p>
          </header>

          <div className={styles.cardList}>
            {MOBILE_TRUST_ITEMS.map((item) => (
              <article
                key={item.title}
                className={`${styles.card} ${styles[item.tone]}`}
              >
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.proof}>
            <p className={styles.proofLabel}>See how we work</p>

            <Link
              href="/how-we-review-providers"
              className={styles.proofLink}
              onClick={() => trackHomeNavClick("home-why-review-method")}
            >
              <span className={styles.proofIcon} aria-hidden="true">
                <ClipboardIcon />
              </span>

              <span>
                <strong>How we review providers</strong>
                <small>
                  See our review criteria.
                </small>
              </span>

              <ArrowIcon />
            </Link>

            <Link
              href="/affiliate-disclosure"
              className={styles.proofLink}
              onClick={() =>
                trackHomeNavClick("home-why-affiliate-disclosure")
              }
            >
              <span className={styles.proofIcon} aria-hidden="true">
                <DisclosureIcon />
              </span>

              <span>
                <strong>Affiliate disclosure</strong>
                <small>
                  See how commissions work.
                </small>
              </span>

              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 4v16M17 4v16M4 8h6M14 16h6" />
      <path d="m7 5 2 3-2 3M17 19l-2-3 2-3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function JapanIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="9" r="4" />
      <path d="M5 20h14M7 20l2-6h6l2 6M4 12h3M17 12h3" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3h6v1.5M8 10h8M8 14h8M8 18h5" />
    </svg>
  );
}

function DisclosureIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7h.01" />
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
