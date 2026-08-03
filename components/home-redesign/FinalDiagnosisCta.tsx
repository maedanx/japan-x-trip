"use client";

import Link from "next/link";
import { trackDiagnosisEntryClick } from "@/lib/analytics";
import Container from "./Container";
import styles from "./FinalDiagnosisCta.module.css";

const REASSURANCE_ITEMS = [
  "Takes about 30 seconds",
  "Free to use",
  "No sign-up required",
] as const;

export default function FinalDiagnosisCta() {
  return (
    <>
      <section
        className={`${styles.desktopOnly} jxm-final-cta`}
        aria-labelledby="jxm-final-cta-title"
      >
        <Container>
          <p className="jxm-final-cta__eyebrow">Still not sure?</p>

          <h2 id="jxm-final-cta-title">
            Find the best connection for your trip.
          </h2>

          <p className="jxm-final-cta__subtitle">
            Answer a few quick questions and get a recommendation based on
            your trip, device, and usage.
          </p>

          <Link
            href="/diagnosis"
            className="jxm-final-cta__cta"
            onClick={() =>
              trackDiagnosisEntryClick("home-final-diagnosis")
            }
          >
            Find My Best Option
            <ArrowIcon />
          </Link>
        </Container>
      </section>

      <section
        className={styles.mobileSection}
        aria-labelledby="mobile-final-cta-title"
      >
        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.container}>
          <span className={styles.icon} aria-hidden="true">
            <SparkIcon />
          </span>

          <p className={styles.eyebrow}>Your next step</p>

          <h2 id="mobile-final-cta-title">
            Ready to find
            <span>your best option?</span>
          </h2>

          <p className={styles.description}>
            Get a personalized recommendation based on your trip, devices,
            and how you plan to use mobile data.
          </p>

          <ul className={styles.reassurance} aria-label="Diagnosis details">
            {REASSURANCE_ITEMS.map((item) => (
              <li key={item}>
                <span aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/diagnosis"
            className={styles.cta}
            onClick={() =>
              trackDiagnosisEntryClick("home-final-diagnosis")
            }
          >
            <span>Find My Best Option</span>
            <ArrowIcon />
          </Link>

          <p className={styles.note}>
            We’ll explain why each option fits your answers.
          </p>
        </div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 12.5 3.2 3.2L17.5 8.5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" />
      <path d="m18.5 14 .7 2.1 1.8.9-1.8.9-.7 2.1-.7-2.1-1.8-.9 1.8-.9.7-2.1Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
