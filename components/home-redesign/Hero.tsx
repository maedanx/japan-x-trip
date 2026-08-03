"use client";

import Image from "next/image";
import Link from "next/link";
import { trackDiagnosisEntryClick, trackHomeNavClick } from "@/lib/analytics";
import CTAButton from "./CTAButton";

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
            Find your best internet option in seconds.
          </p>

          <div className="jxm-hero-v2__actions">
            <Link
              href="/diagnosis"
              className="jxm-hero-v2__primary"
              onClick={() => trackDiagnosisEntryClick("home-hero-primary")}
            >
              Find My Best Option
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
