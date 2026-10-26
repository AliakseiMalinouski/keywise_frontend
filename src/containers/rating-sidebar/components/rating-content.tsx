import { memo } from 'react';

import type { GameRating } from '&network';
import { RatingStoreLink } from './rating-store-link.tsx';
import { RatingSummary } from './rating-summary.tsx';
import * as styles from './rating-content.module.css';

type RatingContentProps = {
  rating: GameRating;
};

export const RatingContent = memo(function RatingContent({
  rating,
}: RatingContentProps) {
  const { appid } = rating;

  return (
    <div className={styles.content}>
      <RatingSummary rating={rating} />
      <RatingStoreLink appid={appid} />
    </div>
  );
});
