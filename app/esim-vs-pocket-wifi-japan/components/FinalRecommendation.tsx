import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const FINAL_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-final-recommendation-mobile.webp";

export default function FinalRecommendation() {
  return (
    <section className={styles.section} aria-labelledby="final-recommendation-heading">
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Final recommendation</p>
          <h2 id="final-recommendation-heading">Choose the setup that matches how your trip moves.</h2>
        </header>

        <div className={styles.finalRecommendationGrid}>
          <article className={styles.recommendationCard}>
            <p className={styles.cardLabel}>Choose an eSIM when</p>
            <h3>You need an independent connection without another device.</h3>
            <p>
              Best when your phone is unlocked and compatible, and travelers may
              separate during the trip.
            </p>
          </article>

          <article className={styles.recommendationCard}>
            <p className={styles.cardLabel}>Choose Pocket WiFi when</p>
            <h3>Several nearby devices will share one connection.</h3>
            <p>
              Best when the group stays together or a phone cannot use eSIM.
            </p>
          </article>
        </div>

        <aside className={styles.exceptionCard}>
          <p className={styles.cardLabel}>Before buying</p>
          <p>
            Verify current data limits, fair-use rules, total cost, hotspot
            support, coverage, pickup or return steps, and cancellation terms.
          </p>
        </aside>

        <ArticleImage
          src={FINAL_IMAGE}
          alt="Final recommendation comparing eSIM and Pocket WiFi for different Japan travel needs"
          width={941}
          height={1672}
          caption="Use this as the final check before comparing current plans."
        />
      </div>
    </section>
  );
}
