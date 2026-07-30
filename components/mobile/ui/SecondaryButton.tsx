import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./SecondaryButton.module.css";

type SecondaryButtonVariant = "provider" | "more" | "compact";

type SecondaryButtonProps = {
  href: string;
  children: ReactNode;
  variant: SecondaryButtonVariant;
  className?: string;
  ariaLabel?: string;
};

export default function SecondaryButton({
  href,
  children,
  variant,
  className,
  ariaLabel,
}: SecondaryButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={classes}
      aria-label={ariaLabel}
    >
      <span className={styles.label}>{children}</span>

      {variant === "more" && (
        <span
          className={styles.arrow}
          aria-hidden="true"
        >
          →
        </span>
      )}
    </Link>
  );
}
