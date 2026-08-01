import Image from "next/image";
import styles from "../page.module.css";

type ArticleImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function ArticleImage({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className,
  sizes = "(max-width: 767px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 64px), 760px",
}: ArticleImageProps) {
  const figureClassName = [styles.articleVisual, className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={figureClassName}>
      <Image
        className={styles.articleImage}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
      />
      {caption ? (
        <figcaption className={styles.imageCaption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
