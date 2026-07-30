"use client";

import Link from "next/link";
import { trackHomeNavClick } from "@/lib/analytics";
import Container from "./Container";

const COMPARE_CARDS = [
  {
    key: "esim",
    title: "eSIM",
    points: [
      "Fast digital setup",
      "No physical SIM swap",
      "Best for compatible unlocked phones",
    ],
    icon: <EsimIcon />,
  },
  {
    key: "sim",
    title: "SIM Card",
    points: [
      "Physical SIM for your phone",
      "Useful when eSIM is not supported",
      "Best for unlocked devices with a SIM slot",
    ],
    icon: <SimIcon />,
  },
  {
    key: "wifi",
    title: "Pocket Wi-Fi",
    points: [
      "Connect multiple devices",
      "No phone compatibility concerns",
      "Best for families and groups",
    ],
    icon: <WifiIcon />,
  },
] as const;

export default function CompareIntroduction() {
  return (
    <section
      className="jxm-compare-intro"
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
