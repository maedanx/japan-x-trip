import Link from "next/link";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const QUICK_ANSWER_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-3-second-answer-mobile.webp";

export default function QuickAnswer() {
  return (
    <section
      className={styles.section}
      id="quick-answer"
      aria-labelledby="quick-answer-heading"
    >
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>3-second answer</p>
          <h2 id="quick-answer-heading">Which option should you start with?</h2>
          <p>
            Start with an eSIM for an independent connection. Start with Pocket
            WiFi when several nearby devices will share one router.
          </p>
        </header>

        <div className={styles.quickAnswerGrid}>
          <article className={styles.quickAnswerCard}>
            <p className={styles.cardLabel}>Start with an eSIM</p>
            <h3>Your phone is compatible and you want your own connection.</h3>
            <ul className={styles.checkList}>
              <li>No pickup, return, or extra router.</li>
              <li>Better when travelers may separate.</li>
              <li>Requires an unlocked eSIM-compatible phone.</li>
            </ul>
          </article>

          <article className={styles.quickAnswerCard}>
            <p className={styles.cardLabel}>Start with Pocket WiFi</p>
            <h3>Your group stays together and several devices need internet.</h3>
            <ul className={styles.checkList}>
              <li>Phones, tablets, and laptops can share one connection.</li>
              <li>Useful when a phone cannot use eSIM.</li>
              <li>The router must be carried, charged, and returned.</li>
            </ul>
          </article>
        </div>

        <aside className={styles.exceptionCard} aria-label="Important exception">
          <p className={styles.cardLabel}>Important exception</p>
          <h3>If your group may split up, one router may become a limitation.</h3>
          <p>
            Separate eSIMs or a mixed setup can keep each group connected.
          </p>
        </aside>

        <ArticleImage
          src={QUICK_ANSWER_IMAGE}
          alt="Quick visual guide showing when travelers should start with an eSIM or Pocket WiFi in Japan"
          width={941}
          height={1672}
          caption="Use this as a starting point, then verify compatibility, data limits, hotspot rules, and total trip cost."
        />

        <div className={styles.inlineCta}>
          <div>
            <p className={styles.cardLabel}>Need a trip-specific answer?</p>
            <h3>Check your phone, group, devices, and travel pattern.</h3>
          </div>
          <Link className={styles.primaryButton} href="/diagnosis">
            Get my recommendation
          </Link>
        </div>
      </div>
    </section>
  );
}
