"use client";

import { useState } from "react";
import Link from "next/link";
import { faqItems } from "@/data/faq";
import Container from "./Container";

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
    <section className="jxm-faq-preview" aria-labelledby="jxm-faq-preview-title">
      <Container>
        <div className="jxm-faq-preview__heading">
          <p className="jxm-faq-preview__eyebrow">FAQ</p>
          <h2 id="jxm-faq-preview-title">Frequently Asked Questions</h2>
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
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`jxm-faq-preview__chevron${expanded ? " is-open" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
