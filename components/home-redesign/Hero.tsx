"use client";

import Image from "next/image";
import Link from "next/link";
import { trackDiagnosisEntryClick, trackHomeNavClick } from "@/lib/analytics";
import CTAButton from "./CTAButton";

const MOBILE_BENEFITS = [
  {
    title: "Compare the best plans",
    icon: "calendar",
  },
  {
    title: "Personalized recommendation",
    icon: "shield",
  },
  {
    title: "Clear setup support",
    icon: "support",
  },
] as const;

export default function Hero() {
  return (
    <>
      <DesktopHero />
      <MobileHero />
    </>
  );
}

function DesktopHero() {
  return (
    <section
      className="jxt-hero-cta"
      aria-label="Find the best internet option for your Japan trip"
    >
      {/* The Mobile Hero variant below has its own visible <h1>; this
          Desktop variant had no heading at all, which left the page with
          zero visible h1 elements at >900px widths. This sr-only heading
          fixes that without changing the Desktop visual design. */}
      <h1 className="sr-only">Stay Connected in Japan</h1>

      <Image
        src="/images/hero/Japanxtrip-hero.png"
        alt="A family traveling in Japan with Mount Fuji, cherry blossoms and a connectivity guide robot"
        fill
        priority
        sizes="(max-width: 900px) 0px, 100vw"
        className="jxt-hero-cta__background"
      />

      <div className="jxt-hero-cta__overlay">
        <div
          className="jxt-hero-cta__actions"
          aria-label="Plan or compare your Japan connection"
        >
          <CTAButton
            href="/diagnosis"
            variant="primary"
            size="default"
            className="jxt-hero-cta__primary"
            onClick={() => trackDiagnosisEntryClick("home-hero-primary")}
          >
            <span>Build My Travel Kit</span>
            <ArrowIcon />
          </CTAButton>

          <CTAButton
            href="/compare"
            variant="secondary"
            size="default"
            className="jxt-hero-cta__secondary"
            onClick={() => trackHomeNavClick("home-hero-compare")}
          >
            Compare Options
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section
      className="jxm-hero jxm-hero--v2"
      aria-labelledby="mobile-home-hero-title"
    >
      <div className="jxm-hero-v2__scene">
        <Image
          src="/images/mobile/home/hero/japan-x-trip-home-hero-mobile.png"
          alt="Travelers visiting Japan with Mount Fuji, cherry blossoms and a Japanese pagoda in the background"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 0px"
          className="jxm-hero-v2__background"
        />

        <div className="jxm-hero-v2__shade" aria-hidden="true" />

        <div className="jxm-hero-v2__content">
          <h1 id="mobile-home-hero-title" className="jxm-hero-v2__title">
            Stay Connected
            <br />
            in Japan
          </h1>

          <p className="jxm-hero-v2__description">
            Find the best SIM, eSIM or Pocket WiFi
            for your trip in seconds.
          </p>

          <ul
            className="jxm-hero-v2__benefits"
            aria-label="Japan X Trip benefits"
          >
            {MOBILE_BENEFITS.map((benefit) => (
              <li key={benefit.title}>
                <span className="jxm-hero-v2__benefit-icon" aria-hidden="true">
                  <BenefitIcon type={benefit.icon} />
                </span>
                <span>{benefit.title}</span>
              </li>
            ))}
          </ul>

          <div className="jxm-hero-v2__actions">
            <Link
              href="/diagnosis"
              className="jxm-hero-v2__primary"
              onClick={() => trackDiagnosisEntryClick("home-hero-primary")}
            >
              Find My Perfect Plan
              <ArrowIcon />
            </Link>

            <Link
              href="/compare"
              className="jxm-hero-v2__secondary"
              onClick={() => trackHomeNavClick("home-hero-compare")}
            >
              Compare All Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({
  type,
}: {
  type: (typeof MOBILE_BENEFITS)[number]["icon"];
}) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M6 3v3M18 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
        <path d="m8 14 2 2 5-5" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5Z" />
      <path d="M17 19c0 1.1-.9 2-2 2h-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="jxt-hero-cta__arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
