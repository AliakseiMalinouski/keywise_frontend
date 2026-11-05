import * as styles from './search-loader.module.css';

type SearchLoaderProps = {
  message: string;
  messageKey: number;
};

export function SearchLoader({ message, messageKey }: SearchLoaderProps) {
  return (
    <p className={styles.wrap} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.messageWrap}>
        <span className={styles.message} key={messageKey}>
          {message}
        </span>
      </span>
    </p>
  );
}
