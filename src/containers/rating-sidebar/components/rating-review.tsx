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
      <div className={styles.header}>
        <span className={verdictClassName}>{verdict}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </div>
      <p className={styles.text}>{text}</p>
      {votesLabel && <p className={styles.votes}>{votesLabel}</p>}
    </li>
  );
});
