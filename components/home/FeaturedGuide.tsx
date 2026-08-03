"use client";

import Image from "next/image";
import Link from "next/link";
import { trackHomeNavClick } from "@/lib/analytics";
import Container from "@/components/home-redesign/Container";
import styles from "./FeaturedGuide.module.css";

export default function FeaturedGuide() {
  return (
    <section className={styles.section} aria-labelledby="jx-featured-guide-title">
      <Container>
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-featured-guide.webp"
              alt="eSIM and Pocket WiFi comparison for travelers in Japan"
              fill
              sizes="(min-width: 860px) 420px, 100vw"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.badge}>Featured Guide</p>

            <h2 id="jx-featured-guide-title" className={styles.title}>
              eSIM vs Pocket WiFi for Japan
            </h2>

            <p className={styles.lead}>
              Not sure which option is best for your trip?
            </p>

            <p className={styles.description}>
              Compare price, speed, setup, coverage, battery life, and
              discover which option fits your travel style.
            </p>

            <Link
              href="/esim-vs-pocket-wifi-japan"
              className={`jx-cta jx-cta--primary jx-cta--default ${styles.cta}`}
              onClick={() => trackHomeNavClick("home-featured-guide")}
            >
              Read the Complete Guide
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
