"use client";

import Image from "next/image";
import Link from "next/link";
import { trackHomeNavClick } from "@/lib/analytics";
import Container from "@/components/home-redesign/Container";
import styles from "./FeaturedGuide.module.css";

const FEATURED_GUIDE_HREF = "/esim-vs-pocket-wifi-japan";

export default function FeaturedGuide() {
  return (
    <section className={styles.section} aria-labelledby="jx-featured-guide-title">
      <Container>
        <div className={styles.card}>
          <Link
            href={FEATURED_GUIDE_HREF}
            className={styles.imageWrap}
            aria-label="Read the eSIM vs Pocket WiFi for Japan guide"
            onClick={() => trackHomeNavClick("home-featured-guide")}
          >
            <Image
              src="/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-featured-guide.webp"
              alt="eSIM and Pocket WiFi comparison for travelers in Japan"
              fill
              sizes="(min-width: 860px) 420px, 100vw"
              className={styles.image}
            />
          </Link>

          <div className={styles.content}>
            <p className={styles.badge}>Featured Guide</p>

            <h2 id="jx-featured-guide-title" className={styles.title}>
              <Link
                href={FEATURED_GUIDE_HREF}
                onClick={() => trackHomeNavClick("home-featured-guide")}
              >
                eSIM vs Pocket WiFi for Japan
              </Link>
            </h2>

            <p className={styles.description}>
              Compare the two options and find the best fit for your trip.
            </p>

            <Link
              href={FEATURED_GUIDE_HREF}
              className={styles.cta}
              onClick={() => trackHomeNavClick("home-featured-guide")}
            >
              Read the Guide
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
