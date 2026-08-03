"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { trackDiagnosisEntryClick, trackHomeNavClick } from "@/lib/analytics";
import { saveQuickDiagnosis } from "@/lib/diagnosisStorage";
import Container from "./Container";
import styles from "./ConnectionFinder.module.css";

const DESKTOP_OPTIONS = [
  {
    title: "eSIM Plans",
    shortTitle: "eSIM",
    description: "Instant activation. Perfect for modern smartphones.",
    href: "/esim",
    className: "jx-master-option--esim",
    icon: <PhoneIcon />,
  },
  {
    title: "Pocket WiFi",
    shortTitle: "Pocket WiFi",
    description: "Share WiFi with your family and friends. Up to 10 devices.",
    href: "/pocket-wifi",
    className: "jx-master-option--wifi",
    icon: <WifiIcon />,
  },
  {
    title: "SIM Card",
    shortTitle: "SIM Card",
    description: "Reliable connection for unlocked smartphones.",
    href: "/sim-card",
    className: "jx-master-option--sim",
    icon: <SimIcon />,
  },
  {
    title: "Find My Best Option",
    shortTitle: "Find My Best Option",
    mobileLines: ["Updated by", "Best Option"],
    description: "Answer a few questions and get a personalized recommendation.",
    href: "/diagnosis",
    className: "jx-master-option--diagnosis",
    icon: <ClipboardIcon />,
  },
] as const;

const PEOPLE_OPTIONS = [
  { value: "1", label: "1 Person", icon: <OnePersonIcon /> },
  { value: "2", label: "2 People", icon: <TwoPeopleIcon /> },
  { value: "3", label: "3 People", icon: <ThreePeopleIcon /> },
  { value: "4plus", label: "4+ People", icon: <GroupIcon /> },
] as const;

const PURPOSE_OPTIONS = [
  {
    value: "social",
    label: "Social Media",
    subLabel: "& Messaging",
    icon: <MessageIcon />,
  },
  {
    value: "video",
    label: "Video &",
    subLabel: "Streaming",
    icon: <VideoIcon />,
  },
  {
    value: "work",
    label: "Work &",
    subLabel: "Business",
    icon: <WorkIcon />,
  },
  {
    value: "other",
    label: "General Use",
    icon: <MoreIcon />,
  },
] as const;

const DAYS_OPTIONS = [
  { value: "1-3", label: "1–3 Days" },
  { value: "4-7", label: "4–7 Days" },
  { value: "8-14", label: "8–14 Days" },
  { value: "15plus", label: "15+ Days" },
] as const;

type PeopleValue = (typeof PEOPLE_OPTIONS)[number]["value"];
type PurposeValue = (typeof PURPOSE_OPTIONS)[number]["value"];
type DaysValue = (typeof DAYS_OPTIONS)[number]["value"];

export default function ConnectionFinder() {
  const router = useRouter();

  const [people, setPeople] = useState<PeopleValue | null>(null);
  const [purpose, setPurpose] = useState<PurposeValue | null>(null);
  const [days, setDays] = useState<DaysValue | null>(null);

  const answeredCount = useMemo(
    () => [people, purpose, days].filter(Boolean).length,
    [people, purpose, days],
  );

  const isComplete = answeredCount === 3;
  const progressPercent = (answeredCount / 3) * 100;

  function startDiagnosis() {
    if (!people || !purpose || !days) {
      return;
    }

    trackDiagnosisEntryClick("home-quick-diagnosis");

    saveQuickDiagnosis({
      people,
      purpose,
      days,
    });

    router.push("/diagnosis");
  }

  function handleOptionClick(href: (typeof DESKTOP_OPTIONS)[number]["href"]) {
    if (href === "/diagnosis") {
      trackDiagnosisEntryClick("home-option-diagnosis");
      return;
    }

    if (href === "/esim") {
      trackHomeNavClick("home-option-esim");
      return;
    }

    if (href === "/pocket-wifi") {
      trackHomeNavClick("home-option-pocket-wifi");
      return;
    }

    if (href === "/sim-card") {
      trackHomeNavClick("home-option-sim-card");
    }
  }

  return (
    <>
      <section
        className={styles.mobileDiagnosis}
        aria-labelledby="mobile-quick-diagnosis-title"
      >
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <p className={styles.eyebrow}>Quick recommendation</p>

              <span className={styles.progressLabel}>
                {answeredCount} of 3 answered
              </span>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={answeredCount}
              aria-label={`${answeredCount} of 3 questions answered`}
            >
              <span
                className={styles.progressValue}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <h2 id="mobile-quick-diagnosis-title">
              Find the right connection
              <span>for your Japan trip.</span>
            </h2>

            <p className={styles.intro}>
              Answer three simple questions. No sign-up required.
            </p>
          </header>

          <div className={styles.questionList}>
            <div
              className={styles.questionCard}
              role="group"
              aria-labelledby="quick-diagnosis-people-title"
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber} aria-hidden="true">
                  1
                </span>

                <span>
                  <strong id="quick-diagnosis-people-title">
                    How many people?
                  </strong>
                  <small>Include everyone sharing the connection.</small>
                </span>
              </div>

              <div className={styles.optionGrid}>
                {PEOPLE_OPTIONS.map((option) => {
                  const selected = people === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={styles.option}
                      data-selected={selected}
                      aria-pressed={selected}
                      onClick={() => setPeople(option.value)}
                    >
                      <span className={styles.optionIcon} aria-hidden="true">
                        {option.icon}
                      </span>

                      <span className={styles.optionLabel}>{option.label}</span>

                      <span className={styles.check} aria-hidden="true">
                        <CheckIcon />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={styles.questionCard}
              role="group"
              aria-labelledby="quick-diagnosis-purpose-title"
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber} aria-hidden="true">
                  2
                </span>

                <span>
                  <strong id="quick-diagnosis-purpose-title">
                    How will you use mobile data?
                  </strong>
                  <small>Choose the activity that matters most.</small>
                </span>
              </div>

              <div className={styles.optionGrid}>
                {PURPOSE_OPTIONS.map((option) => {
                  const selected = purpose === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.option} ${styles.purposeOption}`}
                      data-selected={selected}
                      aria-pressed={selected}
                      onClick={() => setPurpose(option.value)}
                    >
                      <span className={styles.optionIcon} aria-hidden="true">
                        {option.icon}
                      </span>

                      <span className={styles.optionLabel}>
                        {option.label}
                        {"subLabel" in option && option.subLabel ? (
                          <small>{option.subLabel}</small>
                        ) : null}
                      </span>

                      <span className={styles.check} aria-hidden="true">
                        <CheckIcon />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={styles.questionCard}
              role="group"
              aria-labelledby="quick-diagnosis-days-title"
            >
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber} aria-hidden="true">
                  3
                </span>

                <span>
                  <strong id="quick-diagnosis-days-title">
                    How long are you staying?
                  </strong>
                  <small>Select the total length of your Japan trip.</small>
                </span>
              </div>

              <div className={styles.daysGrid}>
                {DAYS_OPTIONS.map((option) => {
                  const selected = days === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={styles.dayOption}
                      data-selected={selected}
                      aria-pressed={selected}
                      onClick={() => setDays(option.value)}
                    >
                      <span>{option.label}</span>

                      <span className={styles.dayCheck} aria-hidden="true">
                        <CheckIcon />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.actionArea}>
            <button
              type="button"
              className={styles.submit}
              disabled={!isComplete}
              onClick={startDiagnosis}
            >
              <span>
                {isComplete
                  ? "Continue to My Recommendation"
                  : "Answer All 3 Questions"}
              </span>

              <ArrowIcon />
            </button>

            <div
              className={styles.status}
              data-ready={isComplete}
              aria-live="polite"
            >
              <span className={styles.statusIcon} aria-hidden="true">
                {isComplete ? <CheckIcon /> : <LockIcon />}
              </span>

              <span>
                <strong>
                  {isComplete
                    ? "Great — you’re ready."
                    : "Your answers stay on this device."}
                </strong>

                <small>
                  {isComplete
                    ? "We’ll use your answers to personalize the next step."
                    : "Complete all three questions to continue."}
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="jx-master-connections"
        aria-labelledby="jx-master-connections-title"
      >
        <Container>
          <div className="jx-master-connections__heading">
            <h2 id="jx-master-connections-title">
              Find Your Best Connection
              <span aria-hidden="true">✦</span>
            </h2>
            <p>Choose the option that fits your travel style</p>
          </div>

          <div className="jx-master-connections__grid">
            {DESKTOP_OPTIONS.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className={`jx-master-option ${option.className}`}
                onClick={() => handleOptionClick(option.href)}
              >
                <span className="jx-master-option__icon">{option.icon}</span>

                <strong className="jx-master-option__desktop-title">
                  {option.title}
                </strong>

                <strong className="jx-master-option__mobile-title">
                  {"mobileLines" in option ? (
                    option.mobileLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))
                  ) : (
                    option.shortTitle
                  )}
                </strong>

                <p>{option.description}</p>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function BasePersonIcon({ count }: { count: 1 | 2 | 3 | 4 }) {
  const positions = {
    1: [12],
    2: [8, 16],
    3: [6, 12, 18],
    4: [5, 10, 15, 20],
  }[count];

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {positions.map((x) => (
        <g key={x}>
          <circle cx={x} cy="8" r="2.1" />
          <path d={`M${x - 3} 18v-2.1c0-2.2 1.3-3.8 3-3.8s3 1.6 3 3.8V18`} />
        </g>
      ))}
    </svg>
  );
}

function OnePersonIcon() {
  return <BasePersonIcon count={1} />;
}

function TwoPeopleIcon() {
  return <BasePersonIcon count={2} />;
}

function ThreePeopleIcon() {
  return <BasePersonIcon count={3} />;
}

function GroupIcon() {
  return <BasePersonIcon count={4} />;
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <circle cx="9" cy="10.5" r=".8" />
      <circle cx="12" cy="10.5" r=".8" />
      <circle cx="15" cy="10.5" r=".8" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16v11H4V8Z" />
      <path d="M9 8V5h6v3M4 12h16M10 12v2h4v-2" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="m7 12.5 3.2 3.2L17.5 8.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="jx-master-option__arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 6h4M11 18h2" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M8 11a6 6 0 0 1 8 0M10 14a3 3 0 0 1 4 0" />
      <circle cx="12" cy="16.5" r=".8" />
    </svg>
  );
}

function SimIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h6l4 4v14H6V5a2 2 0 0 1 2-2Z" />
      <rect x="9" y="10" width="6" height="7" rx="1" />
      <path d="M12 10v7M9 13.5h6" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3h6v1.5M8 10h8M8 14h8M8 18h5" />
    </svg>
  );
}
