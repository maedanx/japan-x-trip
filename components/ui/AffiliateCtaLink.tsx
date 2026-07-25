"use client";

import type { ReactNode } from "react";
import {
  trackAffiliateCtaClick,
  type AffiliateCtaPlacement,
} from "@/lib/analytics";

type AffiliateCtaLinkProps = {
  href: string;
  className?: string;
  rel: string;
  ariaLabel?: string;
  page: string;
  provider: string;
  product: string;
  placement: AffiliateCtaPlacement;
  children: ReactNode;
};

/**
 * Small client-side wrapper so Server Component pages (reviews/[slug],
 * best-esim-japan, compare, sakura-mobile-review) can attach the shared
 * affiliate_cta_click tracker to an outbound CTA without becoming Client
 * Components themselves. Does not alter href, rel, or target -- callers
 * pass their existing values unchanged.
 */
export default function AffiliateCtaLink({
  href,
  className,
  rel,
  ariaLabel,
  page,
  provider,
  product,
  placement,
  children,
}: AffiliateCtaLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel={rel}
      aria-label={ariaLabel}
      onClick={() =>
        trackAffiliateCtaClick({ page, provider, product, placement })
      }
    >
      {children}
    </a>
  );
}
