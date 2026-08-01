import Link from "next/link";
import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const DECISION_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-decision-tree-mobile.webp";

const decisionSteps = [
  {
    question: "Is the phone unlocked and eSIM-compatible?",
    yes: "Go to question 2.",
    no: "Start with Pocket WiFi or another WiFi-based option.",
  },
  {
    question: "Does each traveler need an independent connection?",
    yes: "Start with separate eSIMs.",
    no: "Go to question 3.",
  },
  {
    question: "Will several devices share one connection while staying together?",
    yes: "Compare Pocket WiFi with a hotspot-enabled eSIM.",
    no: "Start with an eSIM.",
  },
];

export default function DecisionFlow() {
  return (
    <section className={styles.sectionAlt} aria-labelledby="decision-flow-heading">
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Decision flow</p>
          <h2 id="decision-flow-heading">Answer three questions to narrow the choice.</h2>
          <p>
            Use this flow to choose a starting option. Then verify current plan
            limits, total cost, hotspot rules, support, and trip length.
          </p>
        </header>

        <ol className={styles.decisionFlowList}>
          {decisionSteps.map((step, index) => (
            <li className={styles.decisionFlowItem} key={step.question}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <div>
                <h3>{step.question}</h3>
                <p><strong>Yes:</strong> {step.yes}</p>
                <p><strong>No:</strong> {step.no}</p>
              </div>
            </li>
          ))}
        </ol>

        <ArticleImage
          src={DECISION_IMAGE}
          alt="Decision tree helping Japan travelers choose between an eSIM and Pocket WiFi"
          width={1024}
          height={1536}
          caption="A visual check of the same three-question flow."
        />

        <div className={styles.inlineCta}>
          <div>
            <p className={styles.cardLabel}>Need the final answer?</p>
            <h3>Get a recommendation based on your actual trip.</h3>
          </div>
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
