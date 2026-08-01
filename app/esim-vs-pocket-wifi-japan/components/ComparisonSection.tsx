import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const COMPARISON_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-quick-comparison-mobile.webp";

const comparisonRows = [
  {
    feature: "Physical device",
    esim: "No extra device beyond a compatible phone",
    pocketWifi: "A separate rental router is required",
  },
  {
    feature: "Setup",
    esim: "Install and activate on the phone",
    pocketWifi: "Power on and connect by WiFi password",
  },
  {
    feature: "Compatibility",
    esim: "Requires an unlocked, eSIM-compatible phone",
    pocketWifi: "Works with WiFi-capable phones, tablets, and laptops",
  },
  {
    feature: "Multiple devices",
    esim: "Depends on hotspot support or separate plans",
    pocketWifi: "Usually designed for shared connections",
  },
  {
    feature: "Group separation",
    esim: "Easy when each traveler has an individual plan",
    pocketWifi: "Difficult because the router stays with one group",
  },
  {
    feature: "Pickup and return",
    esim: "Not required",
    pocketWifi: "Usually required, depending on the rental service",
  },
  {
    feature: "Charging",
    esim: "Phone only, subject to normal battery use",
    pocketWifi: "Router battery plus the connected devices",
  },
  {
    feature: "Loss or damage",
    esim: "No rental hardware risk",
    pocketWifi: "Rental loss or damage charges may apply",
  },
  {
    feature: "Data limits",
    esim: "Plan-specific, including hotspot and fair-use terms",
    pocketWifi: "Rental-plan-specific, including fair-use terms",
  },
  {
    feature: "Coverage",
    esim: "Depends on the selected network, plan, location, and device",
    pocketWifi: "Depends on the selected network, plan, and location",
  },
  {
    feature: "Best starting fit",
    esim: "Solo or independent travelers with compatible phones",
    pocketWifi: "Groups staying together or travelers using many devices",
  },
];

export default function ComparisonSection() {
  return (
    <section
      className={styles.sectionAlt}
      aria-labelledby="comparison-heading"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>At-a-glance comparison</p>
          <h2 id="comparison-heading">The main difference is independent vs shared access.</h2>
          <p>
            Use the visual summary first. Open the table when you need to check
            a specific practical difference.
          </p>
        </header>

        <div className={styles.methodGrid}>
          <article className={styles.methodCard}>
            <p className={styles.cardLabel}>eSIM</p>
            <h3>Independent connection, no extra router</h3>
            <p>
              Best suited to compatible phones and travelers who may separate.
            </p>
          </article>

          <article className={styles.methodCard}>
            <p className={styles.cardLabel}>Pocket WiFi</p>
            <h3>One shared connection for nearby devices</h3>
            <p>
              Best suited to groups staying together with several devices.
            </p>
          </article>
        </div>

        <ArticleImage
          src={COMPARISON_IMAGE}
          alt="Mobile comparison infographic summarizing eSIM and Pocket WiFi for a Japan trip"
          width={864}
          height={1821}
          caption="A quick visual summary. Price, speed, coverage, and fair-use rules still depend on the exact plan."
        />

        <div className={styles.tableWrap}>
          <table className={styles.comparisonTable}>
            <caption className="sr-only">
              Detailed comparison of eSIM and Pocket WiFi for travel in Japan
            </caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">eSIM</th>
                <th scope="col">Pocket WiFi</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>{row.esim}</td>
                  <td>{row.pocketWifi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
