import type { ComponentProps, ReactNode } from "react";
import AffiliateCtaLink from "@/components/ui/AffiliateCtaLink";
import styles from "./PrimaryButton.module.css";

type AffiliateCtaProps = ComponentProps<typeof AffiliateCtaLink>;

export type PrimaryButtonVariant =
  | "compact"
  | "plan"
  | "provider";

type PrimaryButtonProps = Omit<AffiliateCtaProps, "className" | "children"> & {
  children: ReactNode;
  className?: string;
  variant?: PrimaryButtonVariant;
};

export default function PrimaryButton({
  children,
  className,
  variant = "provider",
  ...affiliateProps
}: PrimaryButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AffiliateCtaLink
      {...affiliateProps}
      className={classes}
    >
      {children}
    </AffiliateCtaLink>
  );
}
