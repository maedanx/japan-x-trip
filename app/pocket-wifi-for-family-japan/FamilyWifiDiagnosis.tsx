"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { affiliateLinks } from "@/data/affiliateLinks";
import {
  trackAffiliateCtaClick,
  trackFamilyWifiEvent,
} from "@/lib/analytics";
import styles from "./page.module.css";

type FamilySize = "small" | "medium" | "large";
type SplitFrequency = "never" | "sometimes" | "often";
type EsimCompatibility = "yes" | "no" | "unknown";
type DeviceCount = "few" | "medium" | "many";
type ResultType = "pocket_wifi" | "esim" | "hybrid";

type Answers = {
  familySize?: FamilySize;
  splitFrequency?: SplitFrequency;
  esimCompatibility?: EsimCompatibility;
  deviceCount?: DeviceCount;
};

type QuestionKey = keyof Answers;

type Option<T extends string> = {
  value: T;
  label: string;
};

const familySizeOptions: Option<FamilySize>[] = [
  { value: "small", label: "1–2 people" },
  { value: "medium", label: "3–4 people" },
  { value: "large", label: "5 or more" },
];

const splitOptions: Option<SplitFrequency>[] = [
  { value: "never", label: "No, we will stay together" },
  { value: "sometimes", label: "Sometimes" },
  { value: "often", label: "Yes, often" },
];

const compatibilityOptions: Option<EsimCompatibility>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unknown", label: "Not sure" },
];

const deviceOptions: Option<DeviceCount>[] = [
  { value: "few", label: "1–3" },
  { value: "medium", label: "4–6" },
  { value: "many", label: "7 or more" },
];

function getFamilyWifiResult(answers: Answers): ResultType | null {
  const {
    familySize,
    splitFrequency,
    esimCompatibility,
    deviceCount,
  } = answers;

  if (
    !familySize ||
    !splitFrequency ||
    !esimCompatibility ||
    !deviceCount
  ) {
    return null;
  }

  const threeOrMore =
    familySize === "medium" || familySize === "large";

  /*
   * Conflict priority:
   * 1. Frequent separation with confirmed eSIM support -> eSIM.
   * 2. A confirmed non-eSIM phone -> Pocket WiFi or hybrid.
   * 3. Three or more people who sometimes separate -> hybrid.
   * 4. Three or more people who stay together -> Pocket WiFi.
   * 5. Otherwise use the weighted Pocket WiFi checks, then eSIM.
   */
  if (
    splitFrequency === "often" &&
    esimCompatibility === "yes"
  ) {
    return "esim";
  }

  if (esimCompatibility === "no") {
    if (splitFrequency !== "never") return "hybrid";
    return "pocket_wifi";
  }

  if (threeOrMore && splitFrequency === "sometimes") {
    return "hybrid";
  }

  if (splitFrequency === "often") {
    return "esim";
  }

  if (threeOrMore && splitFrequency === "never") {
    return "pocket_wifi";
  }

  let pocketWifiSignals = 0;

  if (threeOrMore) pocketWifiSignals += 1;
  if (deviceCount === "medium" || deviceCount === "many") {
    pocketWifiSignals += 1;
  }
  if (splitFrequency === "never") pocketWifiSignals += 1;
  if (esimCompatibility === "unknown") {
    pocketWifiSignals += 1;
  }
  if (deviceCount === "many") pocketWifiSignals += 1;

  return pocketWifiSignals >= 2 ? "pocket_wifi" : "esim";
}

function Question<T extends string>({
  number,
  questionKey,
  title,
  options,
  selected,
  onSelect,
}: {
  number: number;
  questionKey: QuestionKey;
  title: string;
  options: Option<T>[];
  selected: T | undefined;
  onSelect: (key: QuestionKey, value: T) => void;
}) {
  return (
    <fieldset className={styles.question}>
      <legend>
        <span>{String(number).padStart(2, "0")}</span>
        {title}
      </legend>

      <div
        className={styles.answerGrid}
        role="radiogroup"
        aria-label={title}
      >
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.answerButton} ${
                isSelected ? styles.answerSelected : ""
              }`}
              onClick={() => onSelect(questionKey, option.value)}
            >
              <span
                className={styles.answerIndicator}
                aria-hidden="true"
              >
                {isSelected ? "✓" : ""}
              </span>
              <strong>{option.label}</strong>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FamilyWifiDiagnosis() {
  const [answers, setAnswers] = useState<Answers>({});
  const diagnosisStarted = useRef(false);
  const lastTrackedResult = useRef<ResultType | null>(null);

  const result = getFamilyWifiResult(answers);
  const answeredCount = Object.values(answers).filter(Boolean).length;

  useEffect(() => {
    trackFamilyWifiEvent("family_wifi_page_view");
  }, []);

  useEffect(() => {
    if (!result || result === lastTrackedResult.current) return;

    lastTrackedResult.current = result;

    trackFamilyWifiEvent("family_wifi_diagnosis_complete", {
      result_type: result,
    });

    trackFamilyWifiEvent(
      result === "pocket_wifi"
        ? "family_wifi_result_pocket_wifi"
        : result === "hybrid"
          ? "family_wifi_result_hybrid"
          : "family_wifi_result_esim",
    );
  }, [result]);

  function selectAnswer<T extends string>(
    key: QuestionKey,
    value: T,
  ) {
    if (!diagnosisStarted.current) {
      diagnosisStarted.current = true;
      trackFamilyWifiEvent("family_wifi_diagnosis_start");
    }

    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function trackSakuraClick() {
    trackFamilyWifiEvent("family_wifi_click_sakura_wifi");

    trackAffiliateCtaClick({
      page: "/pocket-wifi-for-family-japan",
      provider: "Sakura Mobile",
      product: "Travel Pocket WiFi",
      placement: "family-diagnosis-result",
    });
  }

  function trackEsimClick() {
    trackFamilyWifiEvent("family_wifi_click_esim_compare");
  }

  return (
    <section
      className={styles.diagnosisSection}
      id="family-internet-check"
      aria-labelledby="family-diagnosis-title"
    >
      <div className={styles.container}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}>4-question family check</p>
          <h2 id="family-diagnosis-title">
            Find the Best Internet Setup for Your Family
          </h2>
          <p>
            Your answers remain in this page and are used only to show
            a general travel recommendation.
          </p>
        </header>

        <div className={styles.diagnosisCard}>
          <div className={styles.progressRow}>
            <strong>{answeredCount} of 4 answered</strong>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label={`${answeredCount} of 4 questions answered`}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={answeredCount}
            >
              <span style={{ width: `${answeredCount * 25}%` }} />
            </div>
          </div>

          <Question
            number={1}
            questionKey="familySize"
            title="How many people need internet?"
            options={familySizeOptions}
            selected={answers.familySize}
            onSelect={selectAnswer}
          />

          <Question
            number={2}
            questionKey="splitFrequency"
            title="Will your family ever split up?"
            options={splitOptions}
            selected={answers.splitFrequency}
            onSelect={selectAnswer}
          />

          <Question
            number={3}
            questionKey="esimCompatibility"
            title="Are all phones eSIM-compatible?"
            options={compatibilityOptions}
            selected={answers.esimCompatibility}
            onSelect={selectAnswer}
          />

          <Question
            number={4}
            questionKey="deviceCount"
            title="How many total devices will you connect?"
            options={deviceOptions}
            selected={answers.deviceCount}
            onSelect={selectAnswer}
          />
        </div>

        {!result ? (
          <p className={styles.resultWaiting} aria-live="polite">
            Answer all four questions to see your family&apos;s suggested
            setup.
          </p>
        ) : null}

        {result === "pocket_wifi" ? (
          <article
            className={styles.resultCard}
            aria-live="polite"
            data-family-result="pocket_wifi"
          >
            <p className={styles.resultLabel}>Your family result</p>
            <h3>Best Fit: One Pocket WiFi for Your Family</h3>
            <p>
              A shared Pocket WiFi is likely the simplest option because
              your family has multiple people or devices and will mostly
              stay together.
            </p>

            <ul className={styles.resultBenefits}>
              <li>Connect multiple devices</li>
              <li>Works with non-eSIM devices</li>
              <li>Easy setup for the whole family</li>
            </ul>

            <a
              className={styles.primaryButton}
              href={affiliateLinks.sakuraMobile.travelPocketWifi}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={trackSakuraClick}
            >
              Check Sakura Mobile Pocket WiFi
              <span aria-hidden="true">→</span>
            </a>

            <p className={styles.affiliateDisclosure}>
              Japan X Trip may earn a commission if you continue, at no
              additional cost to you. Confirm current pricing, device
              limits, pickup, return, and data conditions before booking.
            </p>
          </article>
        ) : null}

        {result === "esim" ? (
          <article
            className={styles.resultCard}
            aria-live="polite"
            data-family-result="esim"
          >
            <p className={styles.resultLabel}>Your family result</p>
            <h3>Best Fit: Individual eSIMs</h3>
            <p>
              Individual eSIMs give each traveler their own connection,
              making them a better choice if your family may split up.
            </p>

            <ul className={styles.resultBenefits}>
              <li>Each person stays connected</li>
              <li>No device pickup or return</li>
              <li>No extra router to charge</li>
            </ul>

            <Link
              className={styles.primaryButton}
              href="/best-esim-japan"
              onClick={trackEsimClick}
            >
              Compare Japan eSIM Plans
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ) : null}

        {result === "hybrid" ? (
          <article
            className={styles.resultCard}
            aria-live="polite"
            data-family-result="hybrid"
          >
            <p className={styles.resultLabel}>Your family result</p>
            <h3>Best Fit: Pocket WiFi + Backup eSIM</h3>
            <p>
              Use one Pocket WiFi while traveling together, and add one
              low-cost eSIM for anyone who may travel separately.
            </p>

            <ul className={styles.resultBenefits}>
              <li>Share one connection while together</li>
              <li>Keep one traveler connected when separated</li>
              <li>Support phones, tablets, and laptops</li>
            </ul>

            <div className={styles.resultActions}>
              <a
                className={styles.primaryButton}
                href={affiliateLinks.sakuraMobile.travelPocketWifi}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                onClick={trackSakuraClick}
              >
                Check Pocket WiFi Options
                <span aria-hidden="true">→</span>
              </a>

              <Link
                className={styles.secondaryButton}
                href="/best-esim-japan"
                onClick={trackEsimClick}
              >
                Compare Backup eSIMs
              </Link>
            </div>

            <p className={styles.affiliateDisclosure}>
              Japan X Trip may earn a commission from the Pocket WiFi
              link, at no additional cost to you. Check all current plan
              and device conditions before purchasing.
            </p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
