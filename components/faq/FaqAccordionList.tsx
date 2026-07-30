"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";
import Container from "@/components/home-redesign/Container";

export default function FaqAccordionList() {
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
    <section className="jxm-faq-preview" aria-label="All frequently asked questions">
      <Container>
        <div className="jxm-faq-preview__list">
          {faqItems.map((item, index) => {
            const isOpen = openIndexes.has(index);
            const buttonId = `jxfaq-question-${index}`;
            const panelId = `jxfaq-answer-${index}`;

            return (
              <div className="jxm-faq-preview__item" key={item.question}>
                <h2 className="jxm-faq-preview__question-heading">
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
                </h2>

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
