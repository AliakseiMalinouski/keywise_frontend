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
  const barWidth = showBar ? `${percent}%` : '0%';

  return (
    <div className={styles.summary}>
      <p className={styles.score}>{rating.scoreDescription}</p>
      <p className={styles.meta}>{scoreMeta}</p>
      <p className={styles.meta}>{totalReviewsMeta}</p>
      {showBar && (
        <div className={styles.bar} role="img" aria-label={barLabel}>
          <span className={styles.barFill} style={{ width: barWidth }} />
        </div>
      )}
    </div>
  );
}
