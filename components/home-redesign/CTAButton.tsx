import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonVariant = "primary" | "secondary";
type CTAButtonSize = "default" | "compact";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: CTAButtonVariant;
  size?: CTAButtonSize;
  onClick?: () => void;
  tabIndex?: number;
};

export default function CTAButton({
  href,
  children,
  className = "",
  variant = "primary",
  size = "default",
  onClick,
  tabIndex,
}: CTAButtonProps) {
  const classes = [
    "jx-cta",
    `jx-cta--${variant}`,
    `jx-cta--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes} onClick={onClick} tabIndex={tabIndex}>
      {children}
    </Link>
  );
}
