import { memo } from 'react';

import type { GameRating } from '../../../api/search.types.ts';
import { RatingReviews } from './rating-reviews.tsx';
import { RatingStoreLink } from './rating-store-link.tsx';
import { RatingSummary } from './rating-summary.tsx';
import * as styles from './rating-content.module.css';

type RatingContentProps = {
  rating: GameRating;
};

export const RatingContent = memo(function RatingContent({
  rating,
}: RatingContentProps) {
  const { appid, reviews } = rating;

  return (
    <div className={styles.content}>
      <RatingSummary rating={rating} />
      <RatingStoreLink appid={appid} />
      <RatingReviews reviews={reviews} />
    </div>
  );
});
