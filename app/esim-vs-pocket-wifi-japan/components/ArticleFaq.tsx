import styles from "../page.module.css";

export const articleFaqs = [
  {
    question: "Is eSIM or Pocket WiFi better for Japan?",
    answer:
      "An eSIM is usually the simpler starting point for a traveler with an unlocked compatible phone who wants an independent connection. Pocket WiFi may be a better starting point when several devices will share one connection and the group will stay together.",
  },
  {
    question: "Do I need Pocket WiFi in Japan?",
    answer:
      "Not necessarily. Many travelers can use an eSIM or physical SIM instead. Pocket WiFi becomes more useful when a phone cannot use eSIM, several devices need one connection, or a family prefers a shared router.",
  },
  {
    question: "Is an eSIM enough for Japan travel?",
    answer:
      "It can be enough when the phone is unlocked and compatible, the plan has suitable data and validity, and any hotspot needs are supported. Coverage and speed depend on the provider, underlying network, location, device, and plan conditions.",
  },
  {
    question: "Is Pocket WiFi better for a family?",
    answer:
      "It can be a practical starting point for a family that stays together and connects several phones, tablets, or laptops. Separate eSIMs may be more practical when family members may split up.",
  },
  {
    question: "Can I use an eSIM with a locked phone?",
    answer:
      "Usually no. Travel eSIMs generally require a carrier-unlocked phone that supports eSIM. Confirm the exact device model and carrier-lock status before purchasing.",
  },
  {
    question: "Can I connect a laptop through an eSIM?",
    answer:
      "Possibly, by using phone hotspot or tethering. The phone and plan must both support it, and data or speed limits may apply. Check the exact plan terms before relying on it for remote work.",
  },
  {
    question: "Does Pocket WiFi work in rural Japan?",
    answer:
      "It may work, but the router format alone does not guarantee stronger rural coverage. Performance depends on the underlying network, location, terrain, congestion, device, and rental plan.",
  },
  {
    question: "Is unlimited Pocket WiFi really unlimited?",
    answer:
      "Not always in the everyday sense. Unlimited plans may still include fair-use rules, speed management, daily thresholds, or congestion controls. Read the exact conditions for the selected rental.",
  },
  {
    question: "Do I need to return Pocket WiFi?",
    answer:
      "Rental Pocket WiFi usually must be returned by the provider's specified method and deadline. Check the return location, packaging, late fees, and loss or damage terms before booking.",
  },
] as const;

export default function ArticleFaq() {
  return (
    <section className={styles.sectionAlt} aria-labelledby="faq-heading">
      <div className={styles.narrow}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Frequently asked questions</p>
          <h2 id="faq-heading">eSIM vs Pocket WiFi for Japan FAQ</h2>
        </header>

        <div className={styles.faqList}>
          {articleFaqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
