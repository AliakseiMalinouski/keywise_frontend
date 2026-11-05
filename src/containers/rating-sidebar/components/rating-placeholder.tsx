import * as styles from './rating-placeholder.module.css';

type RatingPlaceholderLink = {
  href: string;
  label: string;
};

type RatingPlaceholderProps = {
  loading?: boolean;
  link?: RatingPlaceholderLink;
  message: string;
};

export function RatingPlaceholder({
  loading = false,
  link,
  message,
}: RatingPlaceholderProps) {
  const placeholderClassName = loading
    ? `${styles.placeholder} ${styles.placeholderLoading}`
    : styles.placeholder;

  return (
    <div className={styles.frame}>
      {loading && (
        <svg className={styles.borderSvg} aria-hidden="true" preserveAspectRatio="none">
          <rect
            className={styles.borderRect}
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            rx="10"
            ry="10"
          />
        </svg>
      )}
      <div className={styles.content}>
        <p className={placeholderClassName} role="status">
          {message}
        </p>
        {link && (
          <a
            className={styles.link}
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
}
