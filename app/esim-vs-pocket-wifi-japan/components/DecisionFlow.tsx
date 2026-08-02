import Link from "next/link";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const DECISION_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-decision-tree-mobile.webp";

const decisionSteps = [
  {
    question: "Will several people or devices share one connection?",
    yes: "Pocket WiFi may be the better fit for a family, group, or several devices traveling together.",
    no: "Continue to question 2 to check whether an eSIM suits your phone.",
  },
  {
    question: "Is your phone unlocked and compatible with eSIM?",
    yes: "Continue to question 3 to compare convenience with a separate WiFi device.",
    no: "Pocket WiFi may be the safer starting point because it does not require eSIM support.",
  },
  {
    question: "Do you want to connect without carrying another device?",
    yes: "An eSIM is likely to suit you better if your phone is compatible.",
    no: "Pocket WiFi may suit you better if you prefer one shared connection for nearby devices.",
  },
];

export default function DecisionFlow() {
  return (
    <section
      className={styles.sectionAlt}
      aria-labelledby="decision-flow-heading"
    >
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Quick decision guide</p>
          <h2 id="decision-flow-heading">Which Option Fits Your Trip?</h2>
          <p>
            Answer these quick questions to see whether an eSIM or Pocket WiFi
            is likely to suit your trip before comparing individual plans.
          </p>
        </header>

        <ol className={styles.decisionFlowList}>
          {decisionSteps.map((step, index) => (
            <li className={styles.decisionFlowItem} key={step.question}>
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>

              <div>
                <h3>{step.question}</h3>

                <p>
                  <strong>Yes</strong>
                  <span>{step.yes}</span>
                </p>

                <p>
                  <strong>No</strong>
                  <span>{step.no}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <ArticleImage
          src={DECISION_IMAGE}
          alt="Visual summary helping Japan travelers choose between an eSIM and Pocket WiFi"
          width={1024}
          height={1536}
          caption="Visual summary of the main factors that can influence your choice."
        />

        <div className={styles.inlineCta}>
          <div>
            <p className={styles.cardLabel}>Need a more personal answer?</p>
            <h3>Get a recommendation based on your actual trip.</h3>
            <p>
              Trip length, group size, phone compatibility, data use, and
              hotspot needs can all affect the best option.
            </p>
          </div>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/diagnosis">
              Find My Best Option
            </Link>

            <Link className={styles.secondaryButton} href="/compare">
              Compare All Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
