import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const COMMON_MISTAKES_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-common-mistakes-mobile.webp";

const factors = [
  {
    title: "1. Is your phone unlocked and eSIM-compatible?",
    summary: "This is the first gate for using an eSIM.",
    detail:
      "Confirm both carrier-unlocked status and support for the exact phone model. A phone can be modern but still lack eSIM support in a particular market or carrier configuration.",
  },
  {
    title: "2. Are you traveling alone or with other people?",
    summary: "Solo travelers often value independent digital setup.",
    detail:
      "A group may benefit from sharing, but group size alone does not decide the answer. Consider whether every traveler needs an independent connection.",
  },
  {
    title: "3. Will the group stay together?",
    summary: "One shared router only helps people who remain near it.",
    detail:
      "When travelers separate for shopping, transport, or different activities, individual eSIMs or a mixed setup can reduce coordination risk.",
  },
  {
    title: "4. How many devices need internet?",
    summary: "Count phones, tablets, laptops, and other WiFi devices.",
    detail:
      "Pocket WiFi is designed for sharing, while eSIM sharing depends on the plan's hotspot rules and the phone's capabilities. Device limits vary by product.",
  },
  {
    title: "5. How much setup effort do you want?",
    summary: "Digital installation and physical pickup create different work.",
    detail:
      "An eSIM avoids collection and return but requires confidence with phone settings. Pocket WiFi can be familiar after pickup, yet adds logistics and another device to manage.",
  },
  {
    title: "6. How much data will you use?",
    summary: "Do not compare only the word “unlimited.”",
    detail:
      "Check fair-use policies, speed management, daily allowances, tethering limits, and whether video calls, uploads, or streaming are central to the trip.",
  },
  {
    title: "7. How long is the trip?",
    summary: "Validity and rental duration can change the total value.",
    detail:
      "Compare the full trip period, extension rules, top-up options, and any delivery, return, insurance, or extra-day charges.",
  },
  {
    title: "8. Will you carry and charge another device?",
    summary: "Pocket WiFi adds a router, cable, battery, and return obligation.",
    detail:
      "An eSIM removes the rental device, although hotspot use can increase phone battery consumption. Choose the operating burden you are more comfortable managing.",
  },
  {
    title: "9. What happens if something goes wrong?",
    summary: "Support and recovery matter as much as the initial setup.",
    detail:
      "Review support hours, setup guides, replacement or troubleshooting processes, offline instructions, cancellation terms, and whether a backup connection is sensible.",
  },
];

export default function DecisionFactors() {
  return (
    <section className={styles.section} aria-labelledby="factors-heading">
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Nine decision factors</p>
          <h2 id="factors-heading">The right choice depends on how the trip actually works.</h2>
          <p>
            Use these questions before comparing providers or headline prices.
            Each row includes the practical point even when it stays closed.
          </p>
        </header>

        <div className={styles.factorList}>
          {factors.map((factor, index) => (
            <details
              className={styles.factorItem}
              key={factor.title}
              open={index === 0}
            >
              <summary>
                <span>{factor.title}</span>
                <span className={styles.factorSummary}>{factor.summary}</span>
              </summary>
              <p>{factor.detail}</p>
            </details>
          ))}
        </div>

        <ArticleImage
          src={COMMON_MISTAKES_IMAGE}
          alt="Common mistakes to avoid when choosing or using an eSIM or Pocket WiFi in Japan"
          width={863}
          height={1823}
          caption="Most connection problems are preventable when compatibility, activation, fair-use rules, charging, pickup, and return are checked in advance."
        />
      </div>
    </section>
  );
}
