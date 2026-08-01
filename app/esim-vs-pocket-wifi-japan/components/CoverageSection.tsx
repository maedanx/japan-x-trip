import ArticleImage from "./ArticleImage";
import styles from "../page.module.css";

const COVERAGE_IMAGE =
  "/images/article/esim-vs-pocket-wifi-japan/esim-vs-pocket-wifi-japan-coverage-guide-mobile.webp";

const coverageContexts = [
  ["Major cities and tourist areas", "Coverage is generally broad, but congestion and indoor conditions can still affect performance."],
  ["Rural and mountain areas", "Terrain, the underlying network, and local infrastructure matter more than the connection format alone."],
  ["Remote islands", "Coverage may vary significantly, so check the selected plan's network and destination support."],
  ["Tunnels and high-speed travel", "Temporary interruptions can occur on trains, in tunnels, and while moving quickly between cells."],
  ["Buildings and crowded locations", "Walls, basements, congestion, and device radio support can reduce speed or signal quality."],
];

export default function CoverageSection() {
  return (
    <section className={styles.sectionAlt} aria-labelledby="coverage-heading">
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Coverage in Japan</p>
          <h2 id="coverage-heading">The network and plan matter more than the format.</h2>
          <p>
            eSIM and Pocket WiFi are delivery formats. The underlying Japanese network,
            selected plan, location, terrain, congestion, building environment, and device
            support determine coverage more directly.
          </p>
        </header>

        <div className={styles.factorGrid}>
          {coverageContexts.map(([title, description]) => (
            <article className={styles.factorCard} key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <ArticleImage
          src={COVERAGE_IMAGE}
          alt="Japan mobile coverage guide for cities, rural areas, mountains, islands, tunnels, and high-speed trains"
          width={864}
          height={1821}
          caption="Do not assume Pocket WiFi automatically has stronger rural coverage. Check the network and plan used by the provider."
        />
      </div>
    </section>
  );
}
