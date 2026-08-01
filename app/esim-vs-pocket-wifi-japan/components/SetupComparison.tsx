import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const SETUP_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-setup-guide-mobile.webp";

const esimSteps = [
  "Confirm that the phone supports eSIM.",
  "Confirm that the phone is carrier-unlocked.",
  "Purchase the correct plan for the trip.",
  "Install before travel when the provider recommends it.",
  "Label the new line clearly in phone settings.",
  "Configure mobile data, data switching, and roaming correctly.",
  "Activate or test at the correct time for that plan.",
];

const wifiSteps = [
  "Reserve the rental for the correct dates.",
  "Confirm delivery or airport pickup details.",
  "Collect the router and included accessories.",
  "Power it on and confirm the network indicator.",
  "Connect each device using the WiFi credentials.",
  "Monitor battery level and the provider's data policy.",
  "Return it by the required deadline and method.",
];

function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <article className={styles.stepCard}>
      <h3>{title}</h3>
      <ol className={styles.stepsList}>
        {steps.map((step, index) => (
          <li key={step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function SetupComparison() {
  return (
    <section className={styles.section} aria-labelledby="setup-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Setup comparison</p>
          <h2 id="setup-heading">Choose the workflow you can complete confidently.</h2>
          <p>
            eSIM removes physical pickup and return, but requires correct phone settings.
            Pocket WiFi uses familiar WiFi credentials, but adds collection, charging, and return steps.
          </p>
        </header>

        <div className={styles.twoColumn}>
          <StepList title="eSIM setup flow" steps={esimSteps} />
          <StepList title="Pocket WiFi setup flow" steps={wifiSteps} />
        </div>

        <ArticleImage
          src={SETUP_IMAGE}
          alt="Step-by-step comparison of setting up an eSIM and Pocket WiFi for a Japan trip"
          width={1024}
          height={1536}
          caption="Save the provider's instructions offline before departure in case you need them without an active connection."
        />
      </div>
    </section>
  );
}
