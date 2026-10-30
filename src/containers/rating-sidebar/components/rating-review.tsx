import { memo, useMemo } from 'react';

import type { SteamReview } from '&network';
import { TEXT } from '&constants';
import {
  formatCount,
  formatReviewDate,
  stripSteamMarkup,
} from '../rating-sidebar.utils.ts';
import * as styles from './rating-review.module.css';

type RatingReviewProps = {
  review: SteamReview;
};

export const RatingReview = memo(function RatingReview({
  review,
}: RatingReviewProps) {
  const verdict = review.votedUp
    ? TEXT.ratingRecommended
    : TEXT.ratingNotRecommended;
  const verdictClassName = review.votedUp
    ? styles.verdictPositive
    : styles.verdictNegative;
  const date = formatReviewDate(review.timestamp);
  const meta = [date, review.language.toUpperCase()].filter(Boolean).join(' · ');
  const text = useMemo(() => stripSteamMarkup(review.text), [review.text]);
  const votesLabel =
    review.votesUp > 0
      ? `${formatCount(review.votesUp)} ${TEXT.ratingVotes}`
      : null;

  return (
    <li className={styles.item}>
      <article>
        <header className={styles.header}>
          <strong className={verdictClassName}>{verdict}</strong>
          {meta && <span className={styles.meta}>{meta}</span>}
        </header>
        <p className={styles.text}>{text}</p>
        {votesLabel && (
          <footer className={styles.votes}>
            {votesLabel}
          </footer>
        )}
      </article>
    </li>
  );
});
