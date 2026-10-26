import { memo } from 'react';

import type { SteamReview } from '&network';
import { TEXT } from '&constants';
import { RatingReview } from './rating-review.tsx';
import * as styles from './rating-reviews.module.css';

type RatingReviewsProps = {
  reviews: SteamReview[];
  reviewsLoading?: boolean;
};

export const RatingReviews = memo(function RatingReviews({
  reviews,
  reviewsLoading = false,
}: RatingReviewsProps) {
  const reviewItems = reviews.map((review) => (
    <RatingReview key={review.recommendationId} review={review} />
  ));

  return (
    <section className={styles.reviews} aria-busy={reviewsLoading}>
      <h3 className={styles.title}>{TEXT.ratingRecent}</h3>

      {reviews.length === 0 ? (
        <p className={styles.empty}>{TEXT.ratingReviewsEmpty}</p>
      ) : (
        <ul className={styles.list}>{reviewItems}</ul>
      )}
    </section>
  );
});
