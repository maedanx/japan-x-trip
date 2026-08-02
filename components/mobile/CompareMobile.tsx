"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PrimaryButton from "./ui/PrimaryButton";
import {
  connectivityProviders,
  getProviderCtaLabel,
  getProviderDestination,
  hasProviderOutboundUrl,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";
import { analyzeDiagnosis, type DiagnosisAnalysis } from "@/data/diagnosisEngine";
import { diagnosisQuestions } from "@/data/diagnosisQuestions";
import { answerRecordToArray, loadDiagnosisState } from "@/lib/diagnosisStorage";
import { trackDiagnosisEntryClick } from "@/lib/analytics";
import styles from "./CompareMobile.module.css";
import Breadcrumb from "./navigation/Breadcrumb";
import SecondaryButton from "./ui/SecondaryButton";

import SectionHeading from "./ui/SectionHeading";

const methodComparisons = [
  {
    method: "esim",
    name: "Travel eSIM",
    summary: "Digital setup without swapping a physical SIM.",
    bestFor: "Solo travelers and compatible unlocked phones.",
    setup: "Install before departure or after arrival using Wi-Fi.",
    sharing: "Hotspot support depends on the plan and device.",
    tradeOff: "Requires an eSIM-compatible, carrier-unlocked phone.",
    href: "/esim",
  },
  {
    method: "sim",
    name: "Physical SIM card",
    summary: "A removable SIM inserted into the phone.",
    bestFor: "Travelers whose phones do not support eSIM.",
    setup: "Insert the SIM and configure the phone if required.",
    sharing: "Hotspot support depends on the plan and device.",
    tradeOff: "Your current SIM must be removed or managed separately.",
    href: "/sim-card",
  },
  {
    method: "wifi",
    name: "Pocket Wi-Fi",
    summary: "A separate portable Wi-Fi device shared by multiple devices.",
    bestFor: "Families, groups, and travelers connecting several devices.",
    setup: "Pick up or receive the device, then connect by Wi-Fi.",
    sharing: "Designed to connect multiple devices.",
    tradeOff: "Must be charged, carried, and sometimes returned.",
    href: "/pocket-wifi",
  },
] as const;

const methodNameByKey: Record<(typeof methodComparisons)[number]["method"], string> = {
  esim: "Travel eSIM",
  sim: "Physical SIM card",
  wifi: "Pocket Wi-Fi",
};

// Maps a diagnosis method key to the exact connectionTypes label used in
// data/connectivityProviders.ts, so a provider's own type list can be
// checked for an honest match -- no new classification is invented.
const methodToConnectionType: Record<
  (typeof methodComparisons)[number]["method"],
  string
> = {
  esim: "eSIM",
  sim: "Physical SIM",
  wifi: "Pocket Wi-Fi",
};

type MethodKey = (typeof methodComparisons)[number]["method"];
type MethodBadgeTone = "best" | "alternative" | "check" | "notRecommended";

function getMethodBadge(
  methodKey: MethodKey,
  diagnosis: DiagnosisAnalysis | null,
  bestMethod: MethodKey | null,
  alternativeMethod: MethodKey | null,
): { label: string; tone: MethodBadgeTone } | null {
  if (!diagnosis) return null;
  if (methodKey === bestMethod) return { label: "Best Match", tone: "best" };
  if (methodKey === alternativeMethod) {
    return { label: "Strong Alternative", tone: "alternative" };
  }

  const availability = diagnosis.assessments[methodKey].availability;
  if (availability === "unavailable") {
    return { label: "Not Recommended", tone: "notRecommended" };
  }
  if (availability === "conditional") {
    return { label: "Check Compatibility", tone: "check" };
  }

  return null;
}

// Keywords that indicate a caution/reason is explaining *why a method can't
// be used* (compatibility, lock status, device support, pickup) rather than
// a generic reminder. Used to pick a more direct sentence than cautions[0]
// out of the Diagnosis Engine's existing, unmodified text.
const notRecommendedKeywords = [
  "incompatible",
  "not supported",
  "unsupported",
  "carrier-locked",
  "locked phone",
  "cannot",
  "unavailable",
  "not available",
  "no pickup",
  "requires",
];

const checkCompatibilityKeywords = [
  "compatib",
  "device",
  "carrier lock",
  "carrier-unlocked",
  "pickup",
  "delivery",
  "return",
  "setup",
];

function findByKeyword(candidates: string[], keywords: string[]): string | null {
  for (const keyword of keywords) {
    const match = candidates.find((text) => text.toLowerCase().includes(keyword));
    if (match) return match;
  }
  return null;
}

function getMethodReasonNote(
  methodKey: MethodKey,
  diagnosis: DiagnosisAnalysis | null,
  tone: MethodBadgeTone | undefined,
): string | null {
  if (!diagnosis || !tone) return null;

  const assessment = diagnosis.assessments[methodKey];

  if (tone === "best" || tone === "alternative") {
    return assessment.reasons[0] ?? null;
  }

  if (tone === "notRecommended") {
    return (
      findByKeyword(assessment.cautions, notRecommendedKeywords) ??
      findByKeyword(assessment.reasons, notRecommendedKeywords) ??
      assessment.cautions[0] ??
      null
    );
  }

  // tone === "check"
  return (
    findByKeyword(assessment.cautions, checkCompatibilityKeywords) ??
    assessment.cautions[0] ??
    null
  );
}

const decisionGuideItems = [
  {
    title: "Solo traveler",
    guidance: "Focus on simple setup and a plan that fits one phone.",
  },
  {
    title: "Family or group",
    guidance:
      "Consider sharing, multiple devices, pickup, charging, and return requirements.",
  },
  {
    title: "Older or incompatible phone",
    guidance:
      "Check eSIM support, carrier lock status, and physical SIM compatibility.",
  },
  {
    title: "Business or heavy use",
    guidance:
      "Check hotspot rules, data allowances, device limits, and support availability.",
  },
] as const;

type CompareFaq = {
  question: string;
  answer: string;
};

type CompareMobileProps = {
  /**
   * Shared with app/compare/page.tsx's FAQPage structured data so the
   * visible FAQ and the schema never drift apart.
   */
  faqs: CompareFaq[];
  /**
   * Shared with app/compare/page.tsx's desktop provider cards so the
   * "Not ideal for" note can never drift between desktop and mobile.
   */
  notIdealForByProvider: Record<string, string>;
};

export default function CompareMobile({
  faqs,
  notIdealForByProvider,
}: CompareMobileProps) {
  const providers = connectivityProviders.slice(0, 6);
  const [diagnosis, setDiagnosis] = useState<DiagnosisAnalysis | null>(null);

  useEffect(() => {
    // Reads a completed /diagnosis result, read-only. Any missing, partial,
    // or corrupted session data is treated the same as "no diagnosis yet" --
    // this must never throw and never block the rest of the Compare page.
    try {
      const stored = loadDiagnosisState();
      if (!stored) return;

      const questionIds = diagnosisQuestions.map((question) => question.id);
      const answers = answerRecordToArray(questionIds, stored.answers);
      const isComplete =
        stored.showResult &&
        diagnosisQuestions.every((_, index) => answers[index] !== undefined);

      if (!isComplete) return;

      setDiagnosis(analyzeDiagnosis(answers));
    } catch {
      setDiagnosis(null);
    }
  }, []);

  const bestMethod =
    diagnosis && diagnosis.primary !== "check" ? diagnosis.primary : null;
  const alternativeMethod = diagnosis?.alternative ?? null;
  const notRecommendedMethods = diagnosis
    ? methodComparisons.filter(
        (method) =>
          diagnosis.assessments[method.method].availability === "unavailable",
      )
    : [];

  return (
    <div className={styles.mobilePage}>
      <section className={styles.hero}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Compare" },
          ]}
          color="#758596"
        />

        <h1>
          Find the Best Option
          <br />
          for Your Trip
        </h1>

        <p className={styles.intro}>
          Quickly compare eSIM, Pocket WiFi,
          <br />
          and SIM cards side by side.
        </p>

        <p className={styles.disclosure}>
          Some links on this page may be affiliate links. Recommendations
          are based on traveler suitability, not commission availability.{" "}
          <Link href="/affiliate-disclosure">Learn more</Link>
        </p>

        <p className={styles.disclosure}>
          Editorial review updated: July 2026. Prices and plan conditions
          may change — confirm current details on the official site.
        </p>
      </section>

      {diagnosis ? (
        <section
          className={styles.diagnosisSummary}
          aria-labelledby="diagnosis-summary-heading"
        >
          <div className={styles.diagnosisSummaryHeader}>
            <p className={styles.diagnosisSummaryEyebrow}>
              Your diagnosis result
            </p>

            <Link
              href="/diagnosis"
              className={styles.changeAnswersLink}
              onClick={() => trackDiagnosisEntryClick("compare-change-answers")}
            >
              Change your answers
            </Link>
          </div>

          {bestMethod ? (
            <div>
              <p className={styles.diagnosisSummaryLabelStrong}>
                Your best match
              </p>
              <h2 id="diagnosis-summary-heading">
                {methodNameByKey[bestMethod]}
              </h2>

              {diagnosis.primaryReasons.length > 0 ? (
                <>
                  <p className={styles.diagnosisSummaryBecause}>Because</p>
                  <ul className={styles.diagnosisReasonList}>
                    {diagnosis.primaryReasons.slice(0, 3).map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ) : (
            <div>
              <p className={styles.diagnosisSummaryLabelStrong}>
                Compatibility check needed
              </p>
              <h2 id="diagnosis-summary-heading">
                Confirm your phone before choosing
              </h2>

              {diagnosis.primaryReasons.length > 0 ? (
                <ul className={styles.diagnosisReasonList}>
                  {diagnosis.primaryReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}

          {alternativeMethod ? (
            <div className={styles.diagnosisSummarySecondary}>
              <p className={styles.diagnosisSummaryLabel}>
                Strong alternative
              </p>
              <p className={styles.diagnosisSummaryMethodName}>
                {methodNameByKey[alternativeMethod]}
              </p>

              {diagnosis.assessments[alternativeMethod].reasons[0] ? (
                <p className={styles.diagnosisSummaryNote}>
                  {diagnosis.assessments[alternativeMethod].reasons[0]}
                </p>
              ) : null}
            </div>
          ) : null}

          {notRecommendedMethods.length > 0 ? (
            <div className={styles.diagnosisSummaryMuted}>
              <p className={styles.diagnosisSummaryLabel}>Not recommended</p>

              {notRecommendedMethods.map((method) => (
                <p className={styles.diagnosisSummaryNote} key={method.method}>
                  <strong>{method.name}:</strong>{" "}
                  {getMethodReasonNote(method.method, diagnosis, "notRecommended") ??
                    "Not suitable based on your answers."}
                </p>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section
        className={styles.comparison}
        aria-labelledby="mobile-compare-heading"
      >
        <div className={styles.sectionHeading}>
          <p>Compare the basics</p>
          <h2 id="mobile-compare-heading">
            eSIM, physical SIM, or Pocket Wi-Fi?
          </h2>
        </div>

        <div className={styles.methodList}>
          {methodComparisons.map((method) => {
            const badge = getMethodBadge(
              method.method,
              diagnosis,
              bestMethod,
              alternativeMethod,
            );
            const reasonNote = getMethodReasonNote(
              method.method,
              diagnosis,
              badge?.tone,
            );
            const cardToneClass = badge
              ? {
                  best: styles.methodCardBest,
                  alternative: styles.methodCardAlternative,
                  check: styles.methodCardCheck,
                  notRecommended: styles.methodCardNotRecommended,
                }[badge.tone]
              : "";
            const badgeToneClass = badge
              ? {
                  best: styles.methodBadgeBest,
                  alternative: styles.methodBadgeAlternative,
                  check: styles.methodBadgeCheck,
                  notRecommended: styles.methodBadgeNotRecommended,
                }[badge.tone]
              : "";

            return (
              <article
                className={`${styles.methodCard} ${cardToneClass}`}
                key={method.name}
              >
                {badge ? (
                  <span className={`${styles.methodBadge} ${badgeToneClass}`}>
                    {badge.label}
                  </span>
                ) : null}

                <h3>{method.name}</h3>
                <p className={styles.methodSummary}>{method.summary}</p>

                <dl className={styles.methodDetails}>
                  <div>
                    <dt>Best for</dt>
                    <dd>{method.bestFor}</dd>
                  </div>

                  <div>
                    <dt>Setup</dt>
                    <dd>{method.setup}</dd>
                  </div>

                  <div>
                    <dt>Sharing</dt>
                    <dd>{method.sharing}</dd>
                  </div>

                  <div>
                    <dt>Main trade-off</dt>
                    <dd>{method.tradeOff}</dd>
                  </div>
                </dl>

                {reasonNote ? (
                  <p className={styles.methodReasonNote}>{reasonNote}</p>
                ) : null}

                <Link className={styles.methodLink} href={method.href}>
                  Explore {method.name}
                  <ArrowIcon />
                </Link>
              </article>
            );
          })}
        </div>

        {!diagnosis ? (
          <div className={styles.diagnosisPrompt}>
            <p className={styles.diagnosisPromptLabel}>
              Not sure which to pick?
            </p>

            <p className={styles.diagnosisPromptText}>
              The best option depends on your phone, group size, trip
              length, and setup preferences.
            </p>

            <Link
              href="/diagnosis"
              className={styles.diagnosisPromptButton}
              onClick={() => trackDiagnosisEntryClick("compare-method-diagnosis")}
            >
              Find My Best Option
              <ArrowIcon />
            </Link>
          </div>
        ) : null}
      </section>

      <section className={styles.providers} id="mobile-providers">
        <div className={styles.sectionHeading}>
          <p>Step 2</p>
          <h2>Compare providers</h2>
          <span>
            Compare who each provider is best for, what they offer, and
            what to check before booking.
          </span>
        </div>

        <div className={styles.decisionGuide}>
          <p className={styles.decisionGuideLabel}>Before you compare</p>
          <h3 className={styles.decisionGuideHeading}>
            What matters most for your trip?
          </h3>

          <div className={styles.decisionGuideList}>
            {decisionGuideItems.map((item) => (
              <details className={styles.decisionGuideItem} key={item.title}>
                <summary>
                  {item.title}
                  <ChevronIcon />
                </summary>
                <p>{item.guidance}</p>
              </details>
            ))}
          </div>
        </div>

        <div className={styles.providerList}>
          {providers.map((provider) => {
            const destination = getProviderDestination(provider);
            const outbound = hasProviderOutboundUrl(provider);
            const isAffiliate = isAffiliateProviderLink(provider);
            const ctaLabel = getProviderCtaLabel(provider, "Visit provider website");
            const matchesBestMethod =
              bestMethod !== null &&
              provider.connectionTypes.includes(
                methodToConnectionType[bestMethod],
              );

            return (
              <article className={styles.providerCard} key={provider.slug}>
                <div className={styles.providerHeader}>
                  <SectionHeading variant="provider">
                    {provider.name}
                  </SectionHeading>
                </div>

                {provider.connectionTypes.length > 0 ? (
                  <ul className={styles.serviceTypeList}>
                    {provider.connectionTypes.map((type) => (
                      <li className={styles.serviceTypeChip} key={type}>
                        {type}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {matchesBestMethod ? (
                  <p className={styles.providerMatchNote}>
                    <CheckIcon />
                    Matches your recommended option
                  </p>
                ) : null}

                {provider.fit ? (
                  <div className={styles.providerBlock}>
                    <p className={styles.providerBlockLabel}>Best for</p>
                    <p className={styles.providerFit}>{provider.fit}</p>
                  </div>
                ) : null}

                {provider.strengths.length > 0 ? (
                  <div className={styles.providerBlock}>
                    <p className={styles.providerBlockLabel}>Highlights</p>
                    <ul className={styles.providerHighlights}>
                      {provider.strengths.slice(0, 2).map((strength) => (
                        <li key={strength}>
                          <CheckIcon />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {provider.caution ? (
                  <div className={styles.providerBlock}>
                    <p className={styles.providerBlockLabel}>
                      Check before booking
                    </p>
                    <p className={styles.providerCaution}>
                      {provider.caution}
                    </p>
                  </div>
                ) : null}

                {notIdealForByProvider[provider.slug] ? (
                  <div className={styles.providerBlock}>
                    <p className={styles.providerBlockLabel}>
                      Not ideal for
                    </p>
                    <p className={styles.providerCaution}>
                      {notIdealForByProvider[provider.slug]}
                    </p>
                  </div>
                ) : null}

                <div className={styles.providerActions}>
                  <SecondaryButton
                    href={provider.reviewHref}
                    variant="compact"
                    ariaLabel={`Read review for ${provider.name}`}
                  >
                    Read review
                  </SecondaryButton>

                  {outbound && destination ? (
                    <PrimaryButton
                      href={destination}
                      variant="compact"
                      rel={isAffiliate ? "sponsored nofollow noopener noreferrer" : "noopener"}
                      ariaLabel={`${ctaLabel} on the ${provider.name} website, opens in a new tab`}
                      page="/compare"
                      provider={provider.name}
                      product="General"
                      placement="card"
                    >
                      {ctaLabel}
                    </PrimaryButton>
                  ) : (
                    <span className={styles.providerPending}>
                      Link coming soon
                    </span>
                  )}
                </div>

                {outbound ? (
                  <p className={styles.providerLinkNote}>
                    {isAffiliate ? "Affiliate link" : "Official provider site"}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>

        <Link href="/how-we-review-providers" className={styles.reviewMethodologyLink}>
          How we review providers
        </Link>
      </section>

      <section className={styles.faq}>
        <div className={styles.sectionHeading}>
          <p>Quick answers</p>
          <h2>Which option should you start with?</h2>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronIcon />
              </summary>

              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <small>Still unsure?</small>
        <h2>
          Get a starting recommendation
          <br />
          in 30 seconds
        </h2>

        <p>
          Answer a few simple questions and get a personalized starting point.
        </p>

        <Link
          href="/diagnosis"
          onClick={() => trackDiagnosisEntryClick("compare-final-diagnosis")}
        >
          Find My Best Option
          <ArrowIcon />
        </Link>
      </section>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
