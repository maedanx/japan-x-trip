import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  color?: string;
};

export default function Breadcrumb({
  items,
  color = "#788897",
}: BreadcrumbProps) {
  return (
    <nav
      className={styles.breadcrumb}
      aria-label="Breadcrumb"
      style={{ color }}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span className={styles.separator} aria-hidden="true">
                  ›
                </span>
              ) : null}

              {item.href && !isCurrent ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
