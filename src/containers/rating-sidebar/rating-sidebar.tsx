import { memo } from 'react';

import type { GameRating } from '&network';
import { STATUS, TEXT, type Status } from '&constants';
import { RatingContent } from './components/rating-content.tsx';
import { RatingHeader } from './components/rating-header.tsx';
import { RatingPlaceholder } from './components/rating-placeholder.tsx';
import * as styles from './rating-sidebar.module.css';

type RatingSidebarProps = {
  rating: GameRating | null;
  status: Status;
};

function placeholderMessage(status: Status, rating: GameRating | null): string | null {
  if (status === STATUS.idle) {
    return TEXT.ratingIdle;
  }

  if (status === STATUS.loading) {
    return TEXT.ratingLoading;
  }

  if (status === STATUS.error) {
    return TEXT.ratingEmpty;
  }

  if (status === STATUS.success && !rating) {
    return TEXT.ratingEmpty;
  }

  return null;
}

export const RatingSidebar = memo(function RatingSidebar({
  rating,
  status,
}: RatingSidebarProps) {
  const placeholder = placeholderMessage(status, rating);
  const headerTitle = rating?.title;
  const contentRating = status === STATUS.success ? rating : null;

  return (
    <aside className={styles.sidebar} aria-label={TEXT.ratingTitle}>
      <div className={styles.panel}>
        <RatingHeader title={headerTitle} />

        {placeholder && <RatingPlaceholder message={placeholder} />}

        {contentRating && <RatingContent rating={contentRating} />}
      </div>
    </aside>
  );
});
