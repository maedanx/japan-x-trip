"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

const SEARCH_LINKS = [
  {
    title: "Find My Best Option",
    detail: "Get a personalized recommendation",
    category: "Tool",
    href: "/diagnosis",
  },
  {
    title: "Compare Internet Options",
    detail: "Compare eSIM, SIM cards and Pocket WiFi",
    category: "Compare",
    href: "/compare",
  },
  {
    title: "eSIM for Japan",
    detail: "Fast digital setup for compatible phones",
    category: "Connection",
    href: "/esim",
  },
  {
    title: "Pocket WiFi for Japan",
    detail: "Share internet across multiple devices",
    category: "Connection",
    href: "/pocket-wifi",
  },
  {
    title: "SIM Cards for Japan",
    detail: "Physical SIM options for unlocked phones",
    category: "Connection",
    href: "/sim-card",
  },
  {
    title: "Best eSIM for Japan",
    detail: "Compare featured eSIM providers and plans",
    category: "Guide",
    href: "/best-esim-japan",
  },
  {
    title: "Best Pocket WiFi for Japan",
    detail: "Compare featured Pocket WiFi options",
    category: "Guide",
    href: "/best-pocket-wifi-japan",
  },
  {
    title: "Airport Internet Guide",
    detail: "Plan pickup, delivery and arrival setup",
    category: "Guide",
    href: "/airport",
  },
  {
    title: "eSIM Compatibility Checker",
    detail: "Check whether your phone supports eSIM",
    category: "Tool",
    href: "/esim-checker",
  },
  {
    title: "Airalo vs Ubigi",
    detail: "Compare two popular eSIM providers",
    category: "Comparison",
    href: "/airalo-vs-ubigi-japan",
  },
  {
    title: "eSIM vs Pocket WiFi",
    detail: "Choose the right format for your trip",
    category: "Comparison",
    href: "/esim-vs-pocket-wifi-japan",
  },
  {
    title: "Japan Internet FAQ",
    detail: "Quick answers to common questions",
    category: "Help",
    href: "/faq",
  },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return SEARCH_LINKS.slice(0, 6);
    }

    return SEARCH_LINKS.filter((item) =>
      [item.title, item.detail, item.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const closeMenu = () => setIsMenuOpen(false);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
  };

  const openSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleMobileMenuCtaClick = () => {
    trackDiagnosisEntryClick("home-mobile-menu-diagnosis");
    closeMenu();
  };

  useEffect(() => {
    if (isSearchOpen) {
      window.requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMenuOpen && !isSearchOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      closeMenu();
      closeSearch();
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target) ||
        searchRef.current?.contains(target) ||
        searchButtonRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
      closeSearch();
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className="jx-header">
      <Container className="jx-header__inner">
        <Link
          href="/"
          className="jx-header__logo"
          aria-label="Japan X Trip home"
          onClick={() => {
            closeMenu();
            closeSearch();
          }}
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

        <button
          ref={searchButtonRef}
          type="button"
          className="jx-header__search-trigger"
          aria-expanded={isSearchOpen}
          aria-controls="jx-site-search"
          onClick={() => {
            if (isSearchOpen) {
              closeSearch();
            } else {
              openSearch();
            }
          }}
        >
          <SearchIcon />

          <span className="jx-header__search-copy">
            <strong>
              <span className="jx-header__search-full">Search Japan X Trip</span>
              <span className="jx-header__search-short">Search</span>
            </strong>
            <small>eSIM, WiFi, airports...</small>
          </span>
        </button>

        <div className="jx-header__actions">
          <CTAButton
            href="/diagnosis"
            variant="primary"
            size="compact"
            className="jx-header__cta"
            onClick={() => trackDiagnosisEntryClick("home-header-diagnosis")}
          >
            <span className="jx-header__cta-full">Find My Best Option</span>
            <span className="jx-header__cta-short">Best Match</span>
          </CTAButton>

          <button
            ref={menuButtonRef}
            type="button"
            className="jx-header__menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="jx-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              closeSearch();
              setIsMenuOpen((open) => !open);
            }}
          >
            <span className="jx-header__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="jx-site-search"
        ref={searchRef}
        className={`jx-header__search-panel${isSearchOpen ? " is-open" : ""}`}
        aria-hidden={!isSearchOpen}
      >
        <div className="jx-header__search-panel-inner">
          <div className="jx-header__search-input-wrap">
            <SearchIcon />

            <input
              ref={searchInputRef}
              type="search"
              value={query}
              placeholder="Search eSIM, Pocket WiFi, airport..."
              aria-label="Search Japan X Trip"
              onChange={(event) => setQuery(event.target.value)}
              tabIndex={isSearchOpen ? undefined : -1}
            />

            {query && (
              <button
                type="button"
                className="jx-header__search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
              >
                ×
              </button>
            )}
          </div>

          <div className="jx-header__search-heading">
            <strong>{query ? "Search results" : "Popular shortcuts"}</strong>
            <span>{filteredLinks.length} options</span>
          </div>

          <div className="jx-header__search-results">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="jx-header__search-result"
                  onClick={closeSearch}
                  tabIndex={isSearchOpen ? undefined : -1}
                >
                  <span className="jx-header__search-result-icon">
                    <SearchResultIcon category={item.category} />
                  </span>

                  <span>
                    <small>{item.category}</small>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </span>

                  <ArrowIcon />
                </Link>
              ))
            ) : (
              <div className="jx-header__search-empty">
                <strong>No matching guide found</strong>
                <span>Try “eSIM”, “airport” or “Pocket WiFi”.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {(isMenuOpen || isSearchOpen) && (
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
          Find My Best Option
        </CTAButton>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function SearchResultIcon({ category }: { category: string }) {
  if (category === "Tool") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.5 2.7 8.1 7 10 4.3-1.9 7-5.5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (category === "Connection") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M10 18h4M10 6h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v14H5z" />
      <path d="M8 9h8M8 13h6M8 17h4" />
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
