"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { affiliateLinks } from "@/data/affiliateLinks";
import { connectivityProviders } from "@/data/connectivityProviders";
import { analyzeDiagnosis } from "@/data/diagnosisEngine";
import {
  diagnosisQuestions as questions,
  durationQuestionIndex,
  type DiagnosisMethod as Method,
} from "@/data/diagnosisQuestions";
import { getProductRecommendation } from "@/data/productRecommendations";
import { trackAffiliateCtaClick } from "@/lib/analytics";
import {
  answerArrayToRecord,
  answerRecordToArray,
  clearDiagnosisState,
  loadDiagnosisState,
  saveDiagnosisState,
} from "@/lib/diagnosisStorage";
import styles from "./page.module.css";

type ResultDefinition = {
  name: string;
  shortName: string;
  badge: string;
  summary: string;
  reasons: string[];
  cautions: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

const results: Record<Method, ResultDefinition> = {
  esim: {
    name: "Travel eSIM",
    shortName: "eSIM",
    badge: "Best match",
    summary: "A travel eSIM is likely the most convenient match for your trip. It can be installed before departure and does not require pickup or return.",
    reasons: ["Fast digital setup for a compatible unlocked phone", "Good fit for independent travelers and immediate arrival access", "No rental device or physical SIM swap"],
    cautions: ["Confirm the exact phone model supports eSIM", "Confirm the phone is carrier-unlocked", "Check activation timing and hotspot rules before purchase"],
    primaryHref: "/esim",
    primaryLabel: "Read the Japan eSIM guide",
    secondaryHref: "/best-esim-japan",
    secondaryLabel: "Compare eSIM options",
  },
  sim: {
    name: "Physical SIM card",
    shortName: "Physical SIM",
    badge: "Best match",
    summary: "A physical travel SIM is likely the better fit for your unlocked phone, especially when eSIM is unavailable or you are comfortable changing SIM cards.",
    reasons: ["Works with many unlocked phones without eSIM", "Provides an independent mobile connection", "No separate router to charge or return"],
    cautions: ["Confirm the phone is carrier-unlocked", "Check SIM size, APN instructions, pickup, or delivery", "Store your home SIM safely during the trip"],
    primaryHref: "/sim-card",
    primaryLabel: "Read the Japan SIM card guide",
    secondaryHref: "/compare",
    secondaryLabel: "Compare all connection methods",
  },
  wifi: {
    name: "Pocket Wi-Fi",
    shortName: "Pocket Wi-Fi",
    badge: "Best match",
    summary: "Pocket Wi-Fi is likely the strongest match for shared access, multiple devices, heavy use, or a phone that cannot accept a travel SIM.",
    reasons: ["One router can connect several phones, tablets, and laptops", "Works through Wi-Fi even when a phone is carrier-locked", "Useful for groups that usually stay together"],
    cautions: ["The router must be charged and carried", "The group loses access when separated from the router", "Confirm pickup, delivery, return, and fair-use rules"],
    primaryHref: "/pocket-wifi",
    primaryLabel: "Read the pocket Wi-Fi guide",
    secondaryHref: "/compare",
    secondaryLabel: "Compare all connection methods",
  },
  check: {
    name: "Check your phone first",
    shortName: "Compatibility check",
    badge: "One step before choosing",
    summary: "Your phone compatibility is still unclear. Confirm eSIM support and carrier-lock status before buying, so you do not end up with a plan your phone cannot use.",
    reasons: ["eSIM and physical SIM both depend on phone compatibility", "A quick check prevents an unusable purchase", "Pocket Wi-Fi remains a safer fallback when the phone is locked"],
    cautions: ["Do not buy an eSIM until support is confirmed", "Ask your home carrier whether the phone is unlocked", "Check the exact model number, not only the phone family name"],
    primaryHref: "/compare",
    primaryLabel: "See the compatibility checklist",
    secondaryHref: "/pocket-wifi",
    secondaryLabel: "Review the safer Pocket Wi-Fi fallback",
  },
};

const whyWeAskCopy: Record<string, string> = {
  esim: "Knowing your phone's eSIM support means we only recommend options that will actually work during your trip.",
  unlocked: "Carrier-lock status decides whether a travel SIM or eSIM can even activate on your phone.",
  party: "Group size and device count often make a shared pocket Wi-Fi more practical than individual SIMs.",
  duration: "Trip length affects plan size, rental logistics, and whether a physical SIM is worth the extra step.",
  usage: "Your data habits, from maps to video calls, decide how much bandwidth you'll actually need.",
  arrival: "Arrival timing affects whether a pre-installed eSIM or an airport pickup fits your plan better.",
  handling: "Your comfort with setup, SIM swapping, or carrying a router shapes which option feels effortless.",
};

function trackDiagnosis(eventName: string, parameters: Record<string, string | number> = {}) {
  const browserWindow = window as typeof window & {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, string | number>) => void;
  };
  browserWindow.gtag?.("event", eventName, parameters);
}

export default function DiagnosisClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hasRestoredState, setHasRestoredState] = useState(false);

  const questionIds = useMemo(
    () => questions.map((question) => question.id),
    [],
  );

  useEffect(() => {
    const stored = loadDiagnosisState();

    if (stored) {
      const restoredAnswers = answerRecordToArray(
        questionIds,
        stored.answers,
      );

      setAnswers(restoredAnswers);
      setCurrentStep(
        Math.min(
          Math.max(stored.currentStep, 0),
          questions.length - 1,
        ),
      );
      setShowResult(
        stored.showResult &&
          questions.every(
            (_, index) => restoredAnswers[index] !== undefined,
          ),
      );
    }

    setHasRestoredState(true);
  }, [questionIds]);

  useEffect(() => {
    if (!hasRestoredState) return;

    saveDiagnosisState({
      answers: answerArrayToRecord(questionIds, answers),
      currentStep,
      showResult,
    });
  }, [
    answers,
    currentStep,
    hasRestoredState,
    questionIds,
    showResult,
  ]);

  const selectedAnswer = answers[currentStep];
  const progress = showResult ? 100 : Math.round((currentStep / questions.length) * 100);

  const answerGroupRef = useRef<HTMLDivElement | null>(null);
  const isFirstQuestionRenderRef = useRef(true);
  const lastNavigationKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (showResult) return;

    if (isFirstQuestionRenderRef.current) {
      isFirstQuestionRenderRef.current = false;
      return;
    }

    document
      .getElementById("internet-finder")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    const group = answerGroupRef.current;
    const selected = group?.querySelector<HTMLButtonElement>('[aria-checked="true"]');
    const fallback = group?.querySelector<HTMLButtonElement>("button");
    (selected ?? fallback)?.focus({ preventScroll: true });
  }, [currentStep, showResult]);

  const analysis = useMemo(() => analyzeDiagnosis(answers), [answers]);

  function selectAnswer(optionIndex: number) {
    setAnswers((current) => {
      const next = current.slice(0, currentStep + 1);
      next[currentStep] = optionIndex;
      return next;
    });
    if (currentStep === 0 && answers[0] === undefined) trackDiagnosis("diagnosis_start");
  }

  // Guards against a rapid double-click/tap firing the handler twice for the
  // same render (before React has committed the resulting step change). The
  // key is only ever repeated across two calls when no state change occurred
  // in between, so it never blocks two distinct, legitimate actions.
  function isRepeatNavigation() {
    const key = `${showResult}:${currentStep}`;
    if (lastNavigationKeyRef.current === key) return true;
    lastNavigationKeyRef.current = key;
    return false;
  }

  function continueDiagnosis() {
    if (selectedAnswer === undefined) return;
    if (isRepeatNavigation()) return;

    if (currentStep === questions.length - 1) {
      setShowResult(true);
      trackDiagnosis("diagnosis_complete", { result_type: analysis.primary, question_count: questions.length });
      return;
    }
    setCurrentStep((step) => step + 1);
  }

  function goBack() {
    if (isRepeatNavigation()) return;

    if (showResult) {
      setShowResult(false);
      setCurrentStep(questions.length - 1);
      return;
    }
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  }

  function restart() {
    clearDiagnosisState();
    setAnswers([]);
    setCurrentStep(0);
    setShowResult(false);
    trackDiagnosis("diagnosis_restart");
    window.setTimeout(() => document.getElementById("internet-finder")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  const result = results[analysis.primary];

  const productRecommendation = useMemo(
    () =>
      getProductRecommendation({
        primary: analysis.primary,
        flags: analysis.flags,
        durationIndex: answers[durationQuestionIndex],
      }),
    [analysis, answers],
  );

  const methodLabels: Record<Exclude<Method, "check">, string> = {
    esim: "Travel eSIM",
    sim: "Physical SIM card",
    wifi: "Pocket Wi-Fi",
  };

  const methodHrefs: Record<Exclude<Method, "check">, string> = {
    esim: "/esim",
    sim: "/sim-card",
    wifi: "/pocket-wifi",
  };

  const connectionMethods = ["esim", "sim", "wifi"] as const;

  const bestMethod =
    analysis.primary === "check" ? null : analysis.primary;

  const alternativeMethod = analysis.alternative;

  const unavailableMethods = connectionMethods.filter(
    (method) =>
      analysis.assessments[method].availability === "unavailable",
  );

  const remainingMethods = connectionMethods.filter(
    (method) =>
      method !== bestMethod &&
      method !== alternativeMethod &&
      analysis.assessments[method].availability !== "unavailable",
  );

  const relevantProviders = connectivityProviders
    .filter((provider) => provider.slug !== "nomad-esim")
    .filter((provider) => {
      if (analysis.primary === "esim") return provider.category.includes("eSIM");
      if (analysis.primary === "sim") return provider.category.includes("SIM");
      if (analysis.primary === "wifi") return provider.category.includes("Pocket Wi-Fi");
      return false;
    })
    .slice(0, 2);

  return (
    <section className={styles.finderSection} id="internet-finder">
      <div className={styles.finderContainer}>
        <div className={styles.progressHeader}>
          <div>
            <p>{showResult ? "Your recommendation" : `Question ${currentStep + 1} of ${questions.length}`}</p>

            <div className={styles.progressHeaderActions}>
              <span>{progress}% complete</span>

              {showResult ? (
                <button
                  className={styles.topRestartButton}
                  onClick={restart}
                  type="button"
                >
                  Start again
                </button>
              ) : null}
            </div>
          </div>
          <div
            aria-label={`Question ${Math.min(currentStep + 1, questions.length)} of ${questions.length}, ${progress}% complete`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className={styles.progressTrack}
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!showResult ? (
          <div className={styles.questionCard}>
            <div className={styles.questionStage} key={currentStep}>
              <div className={styles.questionHeading}>
                <span>{String(currentStep + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{questions[currentStep].title}</h2>
                  <p>{questions[currentStep].helper}</p>
                </div>
              </div>

              {whyWeAskCopy[questions[currentStep].id] ? (
                <div className={styles.questionWhy}>
                  <span className={styles.questionWhyLabel}>
                    <i aria-hidden="true">i</i>
                    Why we ask this
                  </span>
                  <p>{whyWeAskCopy[questions[currentStep].id]}</p>
                </div>
              ) : null}

              <div className={styles.answerGrid} ref={answerGroupRef} role="radiogroup" aria-label={questions[currentStep].title}>
                {questions[currentStep].options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === optionIndex;
                  return (
                    <button aria-checked={isSelected} className={`${styles.answerButton} ${isSelected ? styles.answerSelected : ""}`} key={option.label} onClick={() => selectAnswer(optionIndex)} role="radio" type="button">
                      <span className={styles.answerRadio} aria-hidden="true">{isSelected ? "✓" : ""}</span>
                      <span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.questionFooter}>
              <button aria-label="Back to previous question" className={styles.backButton} disabled={currentStep === 0} onClick={goBack} type="button">← Back</button>
              <button className={styles.continueButton} disabled={selectedAnswer === undefined} onClick={continueDiagnosis} type="button">
                {currentStep === questions.length - 1 ? "See My Result" : "Next"} →
              </button>
            </div>
            <p className={styles.privacyNote}>Your answers stay in this browser and are not submitted as personal information.</p>
          </div>
        ) : (
          <div className={`${styles.resultCard} ${styles.questionStage}`}>
            <div className={styles.resultTop}>
              <div>
                <p className={styles.resultBadge}>{result.badge}</p>
                <span>Based on your seven answers</span>
                <h2>{result.name}</h2>
                <p className={styles.resultSummary}>{result.summary}</p>
              </div>
              <div className={styles.resultMark}><span>Result</span><strong>{result.shortName}</strong></div>
            </div>

            {productRecommendation ? (
              <article className={`${styles.resultPanel} ${styles.recommendedCard}`}>
                <span className={styles.resultBadge}>Recommended for you</span>

                <div className={styles.recommendedIdentity}>
                  <div>
                    <span className={styles.recommendedEyebrow}>Provider</span>
                    <p className={styles.recommendedProvider}>{productRecommendation.providerName}</p>
                  </div>
                  <div>
                    <span className={styles.recommendedEyebrow}>Plan</span>
                    <p className={styles.recommendedPlan}>{productRecommendation.productLabel}</p>
                  </div>
                </div>

                <p className={styles.recommendedReason}>{productRecommendation.reason}</p>

                {productRecommendation.matchReasons.length > 0 ? (
                  <ul className={styles.recommendedTags}>
                    {productRecommendation.matchReasons.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}

                <a
                  className={styles.resultPrimaryButton}
                  href={productRecommendation.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  aria-label={`Check price and availability for ${productRecommendation.providerName} ${productRecommendation.productLabel}`}
                  onClick={() =>
                    trackAffiliateCtaClick({
                      page: "/diagnosis",
                      provider: productRecommendation.providerName,
                      product: productRecommendation.productLabel,
                      placement: "diagnosis-result",
                    })
                  }
                >
                  Check price and availability →
                </a>

                <p className={styles.recommendedDisclosure}>
                  Prices, availability, and conditions are confirmed on the provider&apos;s site. Japan X Trip may earn a commission if you continue, at no additional cost to you.
                </p>
              </article>
            ) : null}

            <div className={styles.resultColumns}>
              <article className={styles.resultPanel}>
                <h3>Why this fits</h3>
                <ul className={styles.positiveList}>
                  {analysis.primaryReasons.map((reason) => (
                    <li key={reason}>
                      <span>✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </article>
              <article className={styles.resultPanel}>
                <h3>Check before buying</h3>
                <ul className={styles.cautionList}>
                  {analysis.primaryCautions.map((caution) => (
                    <li key={caution}>
                      <span>!</span>
                      {caution}
                    </li>
                  ))}
                </ul>
              </article>
            </div>


            <section
              className={styles.recommendationOverview}
              aria-labelledby="recommendation-overview-title"
            >
              <div className={styles.recommendationOverviewHeading}>
                <div>
                  <span>Your connection shortlist</span>
                  <h3 id="recommendation-overview-title">
                    How each method fits your trip
                  </h3>
                </div>

                <Link
                  href="/compare"
                  onClick={() =>
                    trackDiagnosis("diagnosis_cta_click", {
                      result_type: analysis.primary,
                      cta: "comparison",
                    })
                  }
                >
                  Open the full comparison →
                </Link>
              </div>

              {analysis.primary === "check" ? (
                <article className={styles.compatibilityAlert}>
                  <span className={styles.compatibilityAlertIcon}>!</span>

                  <div>
                    <strong>Compatibility check required</strong>
                    <p>
                      Your phone&apos;s eSIM compatibility or carrier-lock
                      status is not confirmed. Check both before purchasing an
                      eSIM or physical SIM.
                    </p>
                  </div>
                </article>
              ) : null}

              <div className={styles.recommendationCards}>
                {bestMethod ? (
                  <article
                    className={`${styles.methodCard} ${styles.methodCardBest}`}
                  >
                    <div className={styles.methodCardHeader}>
                      <span className={styles.methodStatusBest}>
                        Best match
                      </span>

                      <span className={styles.methodAvailability}>
                        {analysis.assessments[bestMethod].availability ===
                        "conditional"
                          ? "Check first"
                          : "Available"}
                      </span>
                    </div>

                    <h4>{methodLabels[bestMethod]}</h4>

                    <p className={styles.methodCardIntro}>
                      This method best matches your device, trip conditions,
                      and setup preferences.
                    </p>

                    {analysis.assessments[bestMethod].reasons.length > 0 ? (
                      <ul className={styles.methodReasonList}>
                        {analysis.assessments[bestMethod].reasons.map(
                          (reason) => (
                            <li key={reason}>
                              <span>✓</span>
                              {reason}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : null}

                    <Link href={methodHrefs[bestMethod]}>
                      Explore {methodLabels[bestMethod]} →
                    </Link>
                  </article>
                ) : null}

                {alternativeMethod ? (
                  <article
                    className={`${styles.methodCard} ${
                      styles.methodCardAlternative
                    } ${
                      analysis.assessments[alternativeMethod].availability ===
                      "conditional"
                        ? styles.methodCardConditional
                        : ""
                    }`}
                  >
                    <div className={styles.methodCardHeader}>
                      <span className={styles.methodStatusAlternative}>
                        Strong alternative
                      </span>

                      <span className={styles.methodAvailability}>
                        {analysis.assessments[alternativeMethod]
                          .availability === "conditional"
                          ? "Check first"
                          : "Available"}
                      </span>
                    </div>

                    <h4>{methodLabels[alternativeMethod]}</h4>

                    <p className={styles.methodCardIntro}>
                      Consider this option when its setup or handling fits your
                      itinerary better than the top recommendation.
                    </p>

                    {analysis.assessments[alternativeMethod].reasons.length >
                    0 ? (
                      <ul className={styles.methodReasonList}>
                        {analysis.assessments[
                          alternativeMethod
                        ].reasons.map((reason) => (
                          <li key={reason}>
                            <span>✓</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {analysis.assessments[alternativeMethod].cautions.length >
                    0 ? (
                      <p className={styles.methodCaution}>
                        <strong>Before choosing:</strong>{" "}
                        {
                          analysis.assessments[alternativeMethod]
                            .cautions[0]
                        }
                      </p>
                    ) : null}

                    <Link href={methodHrefs[alternativeMethod]}>
                      Explore {methodLabels[alternativeMethod]} →
                    </Link>
                  </article>
                ) : null}

                {remainingMethods.map((method) => {
                  const isConditional =
                    analysis.assessments[method].availability ===
                    "conditional";

                  return (
                    <article
                      className={`${styles.methodCard} ${
                        isConditional ? styles.methodCardConditional : ""
                      }`}
                      key={method}
                    >
                      <div className={styles.methodCardHeader}>
                        <span className={styles.methodStatusOther}>
                          {isConditional
                            ? "Check before choosing"
                            : "Other option"}
                        </span>

                        <span className={styles.methodAvailability}>
                          {isConditional ? "Conditional" : "Available"}
                        </span>
                      </div>

                      <h4>{methodLabels[method]}</h4>

                      <p className={styles.methodCardIntro}>
                        {isConditional
                          ? "This depends on your phone's eSIM support or carrier-lock status, which is not yet confirmed."
                          : "This can still work, but it is a weaker match for the answers you provided."}
                      </p>

                      {isConditional ? (
                        analysis.assessments[method].cautions.length > 0 ? (
                          <ul className={styles.methodCautionList}>
                            {analysis.assessments[method].cautions.map(
                              (caution) => (
                                <li key={caution}>
                                  <span>!</span>
                                  {caution}
                                </li>
                              ),
                            )}
                          </ul>
                        ) : null
                      ) : analysis.assessments[method].cautions.length > 0 ? (
                        <p className={styles.methodCaution}>
                          <strong>Consider:</strong>{" "}
                          {analysis.assessments[method].cautions[0]}
                        </p>
                      ) : null}

                      <Link href={methodHrefs[method]}>
                        Review {methodLabels[method]} →
                      </Link>
                    </article>
                  );
                })}

                {unavailableMethods.map((method) => (
                  <article
                    className={`${styles.methodCard} ${styles.methodCardUnavailable}`}
                    key={method}
                  >
                    <div className={styles.methodCardHeader}>
                      <span className={styles.methodStatusUnavailable}>
                        Not suitable
                      </span>

                      <span className={styles.methodAvailability}>
                        Unavailable
                      </span>
                    </div>

                    <h4>{methodLabels[method]}</h4>

                    <p className={styles.methodCardIntro}>
                      Based on your answers, this method is not currently
                      usable with your phone.
                    </p>

                    {analysis.assessments[method].cautions.length > 0 ? (
                      <ul className={styles.methodCautionList}>
                        {analysis.assessments[method].cautions.map(
                          (caution) => (
                            <li key={caution}>
                              <span>!</span>
                              {caution}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : null}

                    <Link href={methodHrefs[method]}>
                      Review compatibility requirements →
                    </Link>
                  </article>
                ))}
              </div>

              <p className={styles.recommendationMethodNote}>
                Recommendations are based on your answers about compatibility,
                group size, usage, trip length, and setup preferences. They are
                not speed guarantees or provider rankings.
              </p>
            </section>


            <section
              className={styles.transportOptions}
              aria-labelledby="transport-options-title"
            >
              <div className={styles.transportOptionsHeading}>
                <div>
                  <span>Plan the rest of your trip</span>
                  <h3 id="transport-options-title">
                    Transportation options to check separately
                  </h3>
                </div>
                <p>
                  These options are not based on your internet answers. Choose
                  them only when they match your route, arrival plan, and budget.
                </p>
              </div>

              <div className={styles.transportOptionsGrid}>
                <article className={styles.transportOptionCard}>
                  <span>Intercity rail</span>
                  <h4>Japan Bullet Train</h4>
                  <p>
                    Check Shinkansen tickets when your itinerary includes
                    long-distance travel between major Japanese cities.
                  </p>
                  <a
                    href={affiliateLinks.japanBulletTrain.general}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={() =>
                      trackAffiliateCtaClick({
                        page: "/diagnosis",
                        provider: "Japan Bullet Train",
                        product: "General",
                        placement: "diagnosis-transport-options",
                      })
                    }
                  >
                    Check bullet train tickets →
                  </a>
                </article>

                <article className={styles.transportOptionCard}>
                  <span>Airport transfer</span>
                  <h4>Airport Taxi</h4>
                  <p>
                    Check a private airport transfer when convenience, luggage,
                    group travel, or arrival timing makes public transport less suitable.
                  </p>
                  <a
                    href={affiliateLinks.airportTaxi.general}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={() =>
                      trackAffiliateCtaClick({
                        page: "/diagnosis",
                        provider: "Airport Taxi",
                        product: "General",
                        placement: "diagnosis-transport-options",
                      })
                    }
                  >
                    Check airport taxi options →
                  </a>
                </article>

                <article className={styles.transportOptionCard}>
                  <span>Highway bus</span>
                  <h4>Japan Bus Tickets</h4>
                  <p>
                    Check highway bus routes when you want another way to travel
                    between cities or reach destinations outside your rail plan.
                  </p>
                  <a
                    href={affiliateLinks.japanBusTickets.general}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={() =>
                      trackAffiliateCtaClick({
                        page: "/diagnosis",
                        provider: "Japan Bus Tickets",
                        product: "General",
                        placement: "diagnosis-transport-options",
                      })
                    }
                  >
                    Check bus tickets →
                  </a>
                </article>
              </div>

              <p className={styles.transportDisclosure}>
                Affiliate disclosure: Japan X Trip may earn a commission if you
                book through these links, at no additional cost to you.
              </p>
            </section>


            {relevantProviders.length > 0 ? (
              <div className={styles.providerSection}>
                <div className={styles.providerHeading}><span>Options to research</span><small>No prices or rankings are assumed</small></div>
                <div className={styles.providerGrid}>
                  {relevantProviders.map((provider, index) => (
                    <article className={styles.providerCard} key={provider.slug}>
                      <span>{index === 0 ? "Start your comparison here" : "Also worth comparing"}</span>
                      <h3>{provider.name}</h3>
                      <p>{provider.fit}</p>
                      <Link href={provider.reviewHref} onClick={() => trackDiagnosis("diagnosis_provider_click", { result_type: analysis.primary, provider: provider.slug })}>Review details and cautions →</Link>
                    </article>
                  ))}
                </div>
                <p className={styles.providerDisclosure}>Some provider relationships may be pending or added later. Always confirm current conditions on the provider’s official site.</p>
              </div>
            ) : null}

            <div className={styles.resultActions}>
              <Link className={styles.resultPrimaryButton} href={result.primaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "primary" })}>{result.primaryLabel} →</Link>
              <Link className={styles.resultSecondaryButton} href={result.secondaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "secondary" })}>{result.secondaryLabel}</Link>
            </div>

            <div className={styles.bottomCta}>
              <div>
                <strong>Ready for the next step?</strong>
                <span>Use the guide to compare setup, pickup, compatibility, and current provider conditions.</span>
              </div>
              <Link href={result.primaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "bottom" })}>
                {result.primaryLabel} →
              </Link>
            </div>

            <div className={styles.resultFooter}>
              <button onClick={goBack} type="button">← Change the last answer</button>
              <button onClick={restart} type="button">Start again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
