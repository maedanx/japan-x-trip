import Link from "next/link";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const HERO_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-hero-mobile.webp";

type ArticleHeroProps = {
  updatedLabel?: string;
  readingTimeLabel?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function ArticleHero({
  updatedLabel = "Updated August 2026",
  readingTimeLabel = "12 min read",
  imageWidth = 1024,
  imageHeight = 1536,
}: ArticleHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="a001-title">
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">eSIM vs Pocket WiFi</span>
        </nav>

        <p className={styles.eyebrow}>Japan internet comparison</p>

        <h1 id="a001-title">eSIM vs Pocket WiFi for Japan</h1>

        <p className={styles.lead}>
          Choose the better starting point for your phone, group, and travel
          style—without guessing from price alone.
        </p>

        <ArticleImage
          className={styles.heroVisual}
          src={HERO_IMAGE}
          alt="Two international travelers in Japan comparing an eSIM phone and a Pocket WiFi device"
          width={imageWidth}
          height={imageHeight}
          priority
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 64px), 840px"
        />

        <p className={styles.meta}>
          <span>{updatedLabel}</span>
          <span aria-hidden="true">•</span>
          <span>{readingTimeLabel}</span>
        </p>

        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} href="/diagnosis">
            Find my best option
          </Link>
          <Link className={styles.secondaryButton} href="#quick-answer">
            See the 3-second answer
          </Link>
        </div>
      </div>
    </section>
  );
}
