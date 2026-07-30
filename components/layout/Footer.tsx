import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const guideLinks = [
  { label: "Best eSIM for Japan", href: "/best-esim-japan" },
  { label: "30-sec check", href: "/diagnosis" },
  { label: "Compare", href: "/compare" },
  { label: "FAQ", href: "/faq" },
];

const informationLinks = [
  { label: "About", href: "/about" },
  {
    label: "How We Review Providers",
    href: "/how-we-review-providers",
  },
  {
    label: "Affiliate Disclosure",
    href: "/affiliate-disclosure",
  },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

const mobileFooterGroups = [
  {
    title: "Explore",
    icon: <CompassIcon />,
    links: [
      { label: "Best eSIM for Japan", href: "/best-esim-japan" },
      { label: "Compare Options", href: "/compare" },
      { label: "Pocket WiFi", href: "/pocket-wifi" },
      { label: "SIM Card", href: "/sim-card" },
    ],
  },
  {
    title: "Guides",
    icon: <GuideIcon />,
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "30-sec check", href: "/diagnosis" },
    ],
  },
  {
    title: "About",
    icon: <PersonIcon />,
    links: [
      { label: "About Japan X Trip", href: "/about" },
      {
        label: "How We Review Providers",
        href: "/how-we-review-providers",
      },
      {
        label: "Affiliate Disclosure",
        href: "/affiliate-disclosure",
      },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <DesktopFooter />
      <MobileFooter />
    </footer>
  );
}

function DesktopFooter() {
  return (
    <div className="site-footer__desktop">
      <div className="container">
        <div className="footer-grid footer-grid-expanded">
          <div>
            <Link
              className="brand brand--footer brand--footer-image"
              href="/"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="footer-logo-frame">
                <Image
                  src="/images/brand/logo-footer-web.png"
                  alt="Japan X Trip"
                  fill
                  loading="eager"
                  sizes="260px"
                  className="footer-logo-image"
                />
              </span>
            </Link>

            <p className="footer-copy">
              Independent, beginner-friendly guidance for travelers who want
              reliable internet in Japan without the jargon.
            </p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              {guideLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>About this guide</h3>
            <ul>
              {informationLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built in Japan for international travelers.</p>
        </div>
      </div>
    </div>
  );
}

function MobileFooter() {
  return (
    <div className="jxm-footer">
      <div className="jxm-footer__brand">
        <Link
          href="/"
          className="jxm-footer__logo"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/brand/logo-footer-web.png"
            alt="Japan X Trip"
            fill
            sizes="180px"
            className="jxm-footer__logo-image"
          />
        </Link>

        <p>
          Stay connected, travel better.
          <br />
          Your trusted guide to internet in Japan.
        </p>
      </div>

      <div className="jxm-footer__groups">
        {mobileFooterGroups.map((group) => (
          <details className="jxm-footer-group" key={group.title}>
            <summary>
              <span className="jxm-footer-group__label">
                <span className="jxm-footer-group__icon" aria-hidden="true">
                  {group.icon}
                </span>

                <strong>{group.title}</strong>
              </span>

              <ChevronIcon />
            </summary>

            <ul>
              {group.links.map((item) => (
                <li key={`${group.title}-${item.href}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="jxm-footer__bottom">
        <div className="jxm-footer__copyright">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built in Japan for international travelers.</p>
        </div>

        <div className="jxm-footer__socials" aria-label="Social media">
          <span aria-label="Instagram">
            <InstagramIcon />
          </span>

          <span aria-label="X">
            <XIcon />
          </span>

          <span aria-label="YouTube">
            <YouTubeIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </svg>
  );
}

function GuideIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 5.5c3-1.6 6-1.3 9 .7v14c-3-2-6-2.3-9-.7v-14Z" />
      <path d="M21 5.5c-3-1.6-6-1.3-9 .7v14c3-2 6-2.3 9-.7v-14Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.7-4.5 3.2-7 7.5-7s6.8 2.5 7.5 7" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="jxm-footer-group__chevron"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 4 19 20M19 4 5 20" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 7.5c0-1.4 1.1-2.5 2.5-2.5h11C18.9 5 20 6.1 20 7.5v9c0 1.4-1.1 2.5-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}
