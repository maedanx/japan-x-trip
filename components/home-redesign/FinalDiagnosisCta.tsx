"use client";

import Link from "next/link";
import { trackDiagnosisEntryClick } from "@/lib/analytics";
import Container from "./Container";

export default function FinalDiagnosisCta() {
  return (
    <section
      className="jxm-final-cta"
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
          onClick={() => trackDiagnosisEntryClick("home-final-diagnosis")}
        >
          Find My Best Option
          <ArrowIcon />
        </Link>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="jxm-final-cta__arrow"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
