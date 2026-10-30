import type { GameRating } from '&network';
import { TEXT } from '&constants';
import { formatCount, positivePercent } from '../rating-sidebar.utils.ts';
import * as styles from './rating-summary.module.css';

type RatingSummaryProps = {
  rating: GameRating;
};

export function RatingSummary({ rating }: RatingSummaryProps) {
  const percent = positivePercent(rating);
  const showBar = percent !== null;
  const scoreMeta = showBar
    ? `${TEXT.ratingScore}: ${rating.score}/9 · ${percent}% ${TEXT.ratingPositive}`
    : `${TEXT.ratingScore}: ${rating.score}/9`;
  const totalReviewsMeta = `${formatCount(rating.totalReviews)} ${TEXT.ratingReviews}`;
  const barLabel = showBar ? `${percent}% ${TEXT.ratingPositive}` : '';

  return (
    <section className={styles.summary} aria-label="Steam review summary">
      <p className={styles.score}>{rating.scoreDescription}</p>
      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{TEXT.ratingScore}</dt>
          <dd className={styles.meta}>{scoreMeta}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>{TEXT.ratingReviews}</dt>
          <dd className={styles.meta}>{totalReviewsMeta}</dd>
        </div>
      </dl>
      {showBar && (
        <progress
          className={styles.bar}
          max={100}
          value={percent ?? 0}
          aria-label={barLabel}
        />
      )}
    </section>
  );
}
