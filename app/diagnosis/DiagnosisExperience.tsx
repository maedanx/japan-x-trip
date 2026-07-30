"use client";

import { useState } from "react";
import DiagnosisClient from "./DiagnosisClient";
import styles from "./page.module.css";

function trackDiagnosisStart() {
  const browserWindow = window as typeof window & {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number>,
    ) => void;
  };

  browserWindow.gtag?.("event", "diagnosis_intro_start", {
    question_count: 7,
  });
}

export default function DiagnosisExperience() {
  const [started, setStarted] = useState(false);

  if (started) return <DiagnosisClient />;

  return (
    <section className={styles.finderSection} id="internet-finder">
      <div className={styles.finderContainer}>
        <article className={styles.diagnosisIntroCard}>
          <div className={styles.diagnosisIntroCopy}>
            <p className={styles.diagnosisIntroEyebrow}>Quick diagnosis</p>
            <h2>Find Your Best Option</h2>
            <p className={styles.diagnosisIntroText}>
              Answer 7 quick questions to find the best internet option for
              your trip.
            </p>

            <div className={styles.diagnosisIntroBenefits}>
              <span>30 sec</span>
              <span>No sign-up</span>
              <span>Free</span>
            </div>

            <button
              className={styles.diagnosisStartButton}
              type="button"
              onClick={() => {
                trackDiagnosisStart();
                setStarted(true);
                window.setTimeout(() => {
                  document
                    .getElementById("internet-finder")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }, 0);
              }}
            >
              Start My Diagnosis
              <span aria-hidden="true">→</span>
            </button>

          </div>
        </article>
      </div>
    </section>
  );
}
