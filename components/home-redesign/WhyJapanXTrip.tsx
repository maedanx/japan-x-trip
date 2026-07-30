"use client";

import Link from "next/link";
import { trackHomeNavClick } from "@/lib/analytics";
import Container from "./Container";

const WHY_ITEMS = [
  {
    title: "Clear Comparisons",
    description:
      "We explain the practical differences between eSIM, SIM cards, and Pocket Wi-Fi.",
  },
  {
    title: "Independent Guidance",
    description:
      "Recommendations are based on trip needs, device compatibility, and usage — not a single provider.",
  },
  {
    title: "Transparent Affiliate Links",
    description: "Some links may earn us a commission at no extra cost to you.",
  },
] as const;

export default function WhyJapanXTrip() {
  return (
    <section className="jxm-why-jxt" aria-labelledby="jxm-why-jxt-title">
      <Container>
        <h2 id="jxm-why-jxt-title">Why Japan X Trip?</h2>

        <ol className="jxm-why-jxt__list">
          {WHY_ITEMS.map((item, index) => (
            <li className="jxm-why-jxt__item" key={item.title}>
              <span className="jxm-why-jxt__index" aria-hidden="true">
                {index + 1}
              </span>
              <div className="jxm-why-jxt__item-body">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="jxm-why-jxt__links">
          <Link
            href="/how-we-review-providers"
            className="jxm-why-jxt__link"
            onClick={() => trackHomeNavClick("home-why-review-method")}
          >
            How We Review Providers
          </Link>
          <Link
            href="/affiliate-disclosure"
            className="jxm-why-jxt__link"
            onClick={() => trackHomeNavClick("home-why-affiliate-disclosure")}
          >
            Affiliate Disclosure
          </Link>
        </div>
      </Container>
    </section>
  );
}
