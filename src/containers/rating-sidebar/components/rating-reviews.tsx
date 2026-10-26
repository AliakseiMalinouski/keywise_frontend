import { memo } from 'react';

import type { SteamReview } from '&network';
import { TEXT } from '&constants';
import { RatingReview } from './rating-review.tsx';
import * as styles from './rating-reviews.module.css';

type RatingReviewsProps = {
  reviews: SteamReview[];
};

export const RatingReviews = memo(function RatingReviews({
  reviews,
}: RatingReviewsProps) {
  if (reviews.length === 0) {
    return null;
  }

  const reviewItems = reviews.map((review) => (
    <RatingReview key={review.recommendationId} review={review} />
  ));

  return (
    <section className={styles.reviews}>
      <h3 className={styles.title}>{TEXT.ratingRecent}</h3>
      <ul className={styles.list}>{reviewItems}</ul>
    </section>
  );
});
