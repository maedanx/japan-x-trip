import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const COST_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-price-comparison-mobile.webp";

export default function CostComparison() {
  return (
    <section className={styles.section} aria-labelledby="cost-comparison-heading">
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Cost comparison</p>
          <h2 id="cost-comparison-heading">Compare the total trip cost, not the headline price.</h2>
          <p>
            A cheaper-looking plan can become less competitive after delivery, insurance,
            extensions, device sharing, or payment effects are included.
          </p>
        </header>

        <div className={styles.formulaCard}>
          <p className={styles.cardLabel}>Total trip cost</p>
          <p>
            Plan or rental price + pickup or delivery fees + optional insurance + extension
            fees + possible extra-device costs + currency or payment effects
          </p>
        </div>

        <div className={styles.twoColumn}>
          <article className={styles.infoCard}>
            <h3>For an eSIM, verify</h3>
            <ul className={styles.checkList}>
              <li>Data amount and validity period</li>
              <li>Top-up rules and expiry</li>
              <li>Hotspot or tethering permission</li>
              <li>Activation timing and refund conditions</li>
            </ul>
          </article>

          <article className={styles.infoCard}>
            <h3>For Pocket WiFi, verify</h3>
            <ul className={styles.checkList}>
              <li>Rental duration and extension fees</li>
              <li>Pickup, delivery, and return method</li>
              <li>Insurance and loss or damage terms</li>
              <li>Fair-use limits and device capacity</li>
            </ul>
          </article>
        </div>

        <ArticleImage
          src={COST_IMAGE}
          alt="Visual comparison of typical eSIM and Pocket WiFi trip costs for travelers in Japan"
          width={864}
          height={1821}
          caption="Prices and conditions change. Verify the exact provider plan immediately before purchase."
        />
      </div>
    </section>
  );
}
