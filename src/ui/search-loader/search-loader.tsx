import { TEXT } from '&constants';
import * as styles from './search-loader.module.css';

export function SearchLoader() {
  return (
    <p className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{TEXT.loading}</span>
    </p>
  );
}
