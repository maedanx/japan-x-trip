import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingVariant =
  | "check"
  | "diagnosis"
  | "provider";

type SectionHeadingProps = {
  children: ReactNode;
  variant: SectionHeadingVariant;
  id?: string;
  className?: string;
};

export default function SectionHeading({
  children,
  variant,
  id,
  className,
}: SectionHeadingProps) {
  const combinedClassName = [
    styles.heading,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "provider") {
    return (
      <h3 id={id} className={combinedClassName}>
        {children}
      </h3>
    );
  }

  return (
    <h2 id={id} className={combinedClassName}>
      {children}
    </h2>
  );
}
