import Link from "next/link";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const FINDER_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-finder-cta-mobile.webp";

export default function FinderCta() {
  return (
    <section className={styles.finderCta} aria-labelledby="finder-cta-heading">
      <div className={styles.narrow}>
        <ArticleImage
          src={FINDER_IMAGE}
          alt="Japan X Trip internet finder inviting travelers to get a personalized connection recommendation"
          width={1122}
          height={1402}
        />

        <div className={styles.finderCtaContent}>
          <p className={styles.eyebrow}>Your next step</p>
          <h2 id="finder-cta-heading">Get a recommendation for your actual trip.</h2>
          <p>
            Answer a few questions about your phone, group, devices, trip length,
            and data use.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/diagnosis">
              Get my recommendation
            </Link>
            <Link className={styles.secondaryButton} href="/compare">
              Compare all options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
