import styles from "../page.module.css";

const groups = [
  {
    title: "eSIM pros",
    tone: "positive",
    items: [
      "No rental device to collect, carry, or return.",
      "Can often be installed before departure.",
      "Each traveler can keep an independent connection.",
      "Useful when the group may separate during the day.",
    ],
  },
  {
    title: "eSIM limitations",
    tone: "caution",
    items: [
      "Requires a compatible, carrier-unlocked phone.",
      "Installation and activation rules vary by plan.",
      "Hotspot use may be restricted or unavailable.",
      "Each traveler may need a separate plan.",
    ],
  },
  {
    title: "Pocket WiFi pros",
    tone: "positive",
    items: [
      "Several WiFi-capable devices can share one router.",
      "Works even when a phone does not support eSIM.",
      "Can be convenient for families staying together.",
      "Familiar WiFi-password setup for phones and laptops.",
    ],
  },
  {
    title: "Pocket WiFi limitations",
    tone: "caution",
    items: [
      "The router must be carried and charged.",
      "One device cannot serve travelers who split up.",
      "Pickup, delivery, and return logistics may apply.",
      "Loss, damage, and fair-use conditions must be checked.",
    ],
  },
] as const;

export default function ProsCons() {
  return (
    <section className={styles.section} aria-labelledby="pros-cons-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Pros and cons</p>
          <h2 id="pros-cons-heading">A final side-by-side recap.</h2>
          <p>
            Treat these as format-level tendencies. Exact performance and value
            still depend on the selected provider and plan.
          </p>
        </header>

        <div className={styles.prosConsGrid}>
          {groups.map((group) => (
            <article
              className={`${styles.prosConsCard} ${
                group.tone === "positive"
                  ? styles.prosConsPositive
                  : styles.prosConsCaution
              }`}
              key={group.title}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
