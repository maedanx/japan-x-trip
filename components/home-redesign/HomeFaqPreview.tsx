"use client";

import Link from "next/link";
import { useState } from "react";
import { faqItems } from "@/data/faq";
import Container from "./Container";
import styles from "./HomeFaqPreview.module.css";

const PREVIEW_FAQS = faqItems.slice(0, 4);

export default function HomeFaqPreview() {
  const [openIndexes, setOpenIndexes] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  function toggleIndex(index: number) {
    setOpenIndexes((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <>
      <section
        className={`${styles.desktopOnly} jxm-faq-preview`}
        aria-labelledby="jxm-faq-preview-title"
      >
        <Container>
          <div className="jxm-faq-preview__heading">
            <p className="jxm-faq-preview__eyebrow">FAQ</p>

            <h2 id="jxm-faq-preview-title">
              Frequently Asked Questions
            </h2>

            <p className="jxm-faq-preview__subtitle">
              Quick answers before you choose your connection.
            </p>
          </div>

          <div className="jxm-faq-preview__list">
            {PREVIEW_FAQS.map((item, index) => {
              const isOpen = openIndexes.has(index);
              const buttonId = `jxm-faq-preview-question-${index}`;
              const panelId = `jxm-faq-preview-answer-${index}`;

              return (
                <div className="jxm-faq-preview__item" key={item.question}>
                  <h3 className="jxm-faq-preview__question-heading">
                    <button
                      type="button"
                      id={buttonId}
                      className="jxm-faq-preview__question"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleIndex(index)}
                    >
                      <span>{item.question}</span>
                      <ChevronIcon expanded={isOpen} />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="jxm-faq-preview__answer"
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="jxm-faq-preview__cta-row">
            <Link href="/faq" className="jxm-why-jxt__link">
              View All FAQs
            </Link>
          </div>
        </Container>
      </section>

      <section
        className={styles.mobileSection}
        aria-labelledby="mobile-home-faq-title"
      >
        <div className={styles.container}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>Quick answers</p>

            <h2 id="mobile-home-faq-title">
              Common Questions
            </h2>

            <p>
              What travelers ask before choosing.
            </p>
          </header>

          <div className={styles.list}>
            {PREVIEW_FAQS.map((item, index) => {
              const isOpen = openIndexes.has(index);
              const buttonId = `mobile-faq-question-${index}`;
              const panelId = `mobile-faq-answer-${index}`;

              return (
                <article
                  className={styles.item}
                  data-open={isOpen}
                  key={item.question}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleIndex(index)}
                    >
                      <span className={styles.questionIcon} aria-hidden="true">
                        ?
                      </span>

                      <span className={styles.questionText}>
                        {item.question}
                      </span>

                      <span className={styles.chevron} aria-hidden="true">
                        <ChevronIcon expanded={isOpen} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={styles.answer}
                    hidden={!isOpen}
                  >
                    <div className={styles.answerInner}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <Link href="/faq" className={styles.allFaqs}>
            <span>
              <strong>View All FAQs</strong>
              <small>
                Setup, compatibility, and more.
              </small>
            </span>

            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={expanded ? styles.chevronOpen : undefined}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
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
