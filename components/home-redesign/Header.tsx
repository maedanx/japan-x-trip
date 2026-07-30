"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackDiagnosisEntryClick } from "@/lib/analytics";
import Container from "./Container";
import CTAButton from "./CTAButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "eSIM", href: "/esim" },
  { label: "Pocket WiFi", href: "/pocket-wifi" },
  { label: "SIM Card", href: "/sim-card" },
  { label: "Diagnosis", href: "/diagnosis" },
  { label: "Guides", href: "/airport" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  const handleMobileMenuCtaClick = () => {
    trackDiagnosisEntryClick("home-mobile-menu-diagnosis");
    closeMenu();
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;

      closeMenu();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="jx-header">
      <Container className="jx-header__inner">
        <Link
          href="/"
          className="jx-header__logo"
          aria-label="Japan X Trip home"
          onClick={closeMenu}
        >
          <span className="jx-header__logo-frame">
            <Image
              src="/images/brand/logo-header-web.png"
              alt="Japan X Trip"
              fill
              priority
              sizes="150px"
              className="jx-header__logo-image"
            />
          </span>
        </Link>

        <nav className="jx-header__nav" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="jx-header__link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="jx-header__actions">
          <button
            type="button"
            className="jx-header__language"
            aria-label="Language selector"
          >
            EN
            <ChevronIcon />
          </button>

          <CTAButton
            href="/diagnosis"
            variant="primary"
            size="compact"
            className="jx-header__cta"
            onClick={() => trackDiagnosisEntryClick("home-header-diagnosis")}
          >
            Build My Travel Kit
          </CTAButton>

          <button
            ref={buttonRef}
            type="button"
            className="jx-header__menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="jx-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="jx-header__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="jx-header__mobile-backdrop" aria-hidden="true" />
      )}

      <div
        id="jx-mobile-menu"
        ref={menuRef}
        className={`jx-header__mobile-menu${isMenuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <nav className="jx-header__mobile-nav" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="jx-header__mobile-link"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? undefined : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CTAButton
          href="/diagnosis"
          variant="primary"
          size="default"
          className="jx-header__mobile-cta"
          onClick={handleMobileMenuCtaClick}
          tabIndex={isMenuOpen ? undefined : -1}
        >
          Build My Travel Kit
        </CTAButton>
      </div>
    </header>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}
