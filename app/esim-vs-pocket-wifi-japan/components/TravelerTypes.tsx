import styles from "../page.module.css";

const primaryTravelerTypes = [
  {
    title: "Solo traveler",
    choice: "Start with an eSIM",
    reason: "No pickup, return, or extra router when your phone is compatible.",
    check: "Unlocked status, validity, data allowance, and hotspot support.",
  },
  {
    title: "Couple staying together",
    choice: "Compare both options",
    reason: "One router can simplify sharing; separate eSIMs preserve independence.",
    check: "Total cost and whether you may separate during the day.",
  },
  {
    title: "Family with several devices",
    choice: "Start by comparing Pocket WiFi",
    reason: "One router can connect several nearby phones, tablets, or laptops.",
    check: "Device limits, battery, fair-use rules, pickup, and return.",
  },
  {
    title: "Group that may split up",
    choice: "Start with separate eSIMs or a mixed setup",
    reason: "One router cannot stay with multiple groups at the same time.",
    check: "Phone compatibility and the cost of independent plans.",
  },
];

const additionalTravelerTypes = [
  {
    title: "Locked or incompatible phone",
    choice: "Start with Pocket WiFi",
    reason: "WiFi-capable devices can connect without installing an eSIM.",
    check: "Rental logistics, device charging, and support.",
  },
  {
    title: "Remote worker or laptop-heavy traveler",
    choice: "Compare Pocket WiFi with hotspot-enabled eSIM",
    reason: "The better fit depends on device count, tethering, battery, and backup needs.",
    check: "Hotspot permission, fair-use limits, and charging.",
  },
  {
    title: "Simplest arrival setup",
    choice: "Choose the process you can prepare confidently",
    reason: "A preinstalled eSIM or prearranged pickup can both be simple.",
    check: "Activation timing, pickup hours, return steps, and offline instructions.",
  },
];

function TravelerCard({
  item,
}: {
  item: {
    title: string;
    choice: string;
    reason: string;
    check: string;
  };
}) {
  return (
    <article className={styles.choiceCard}>
      <p className={styles.cardLabel}>{item.title}</p>
      <h3>{item.choice}</h3>
      <p>{item.reason}</p>
      <p>
        <strong>Check:</strong> {item.check}
      </p>
    </article>
  );
}

export default function TravelerTypes() {
  return (
    <section className={styles.sectionAlt} aria-labelledby="traveler-types-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Best choice by traveler type</p>
          <h2 id="traveler-types-heading">Find the case closest to your trip.</h2>
          <p>
            Use these as starting points. Your device and current plan terms
            still decide the final choice.
          </p>
        </header>

        <div className={styles.choiceGrid}>
          {primaryTravelerTypes.map((item) => (
            <TravelerCard item={item} key={item.title} />
          ))}
        </div>

        <details className={styles.factorCard}>
          <summary className={styles.factorSummary}>
            See three additional travel situations
          </summary>

          <div className={styles.factorItem}>
            <div className={styles.choiceGrid}>
              {additionalTravelerTypes.map((item) => (
                <TravelerCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
