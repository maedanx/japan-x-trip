const BENEFITS = [
  {
    title: "Instant & Easy",
    detail: "Setup in minutes",
    icon: <TimerIcon />,
  },
  {
    title: "High Speed",
    detail: "Reliable connection",
    icon: <WifiIcon />,
  },
  {
    title: "Travel-Friendly",
    detail: "Light & convenient",
    icon: <EnvelopeIcon />,
  },
  {
    title: "Safe & Secure",
    detail: "Trusted service",
    icon: <ShieldIcon />,
  },
  {
    title: "24/7 Support",
    detail: "We’re here for you",
    icon: <ChatIcon />,
  },
] as const;

export default function MobileBenefitsStrip() {
  return (
    <section
      className="jxm-benefits"
      aria-label="Japan X Trip service benefits"
    >
      {BENEFITS.map((benefit) => (
        <div className="jxm-benefit" key={benefit.title}>
          <span className="jxm-benefit__icon" aria-hidden="true">
            {benefit.icon}
          </span>

          <strong>{benefit.title}</strong>
          <small>{benefit.detail}</small>
        </div>
      ))}
    </section>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="13" r="8" />
      <path d="M9 2h6M12 5v2M12 13l3-3" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 9a14 14 0 0 1 18 0" />
      <path d="M6.5 12.5a9 9 0 0 1 11 0" />
      <path d="M10 16a4 4 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </svg>
  );
}
