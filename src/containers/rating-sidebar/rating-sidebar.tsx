import { memo } from 'react';

import type { GameRating } from '&network';
import { STATUS, TEXT, type Status } from '&constants';
import { RatingContent } from './components/rating-content.tsx';
import { RatingCover } from './components/rating-cover.tsx';
import { RatingHeader } from './components/rating-header.tsx';
import { RatingPlaceholder } from './components/rating-placeholder.tsx';
import * as styles from './rating-sidebar.module.css';

type RatingSidebarProps = {
  image?: string;
  rating: GameRating | null;
  status: Status;
};

function placeholderMessage(
  status: Status,
  rating: GameRating | null,
  image?: string,
): string | null {
  if (status === STATUS.idle) {
    return TEXT.ratingIdle;
  }

  if (status === STATUS.loading) {
    return TEXT.ratingLoading;
  }

  if (status === STATUS.error) {
    return TEXT.ratingEmpty;
  }

  if (status === STATUS.success && !rating && !image) {
    return TEXT.ratingEmpty;
  }

  return null;
}

export const RatingSidebar = memo(function RatingSidebar({
  image,
  rating,
  status,
}: RatingSidebarProps) {
  const placeholder = placeholderMessage(status, rating, image);
  const headerTitle = rating?.title;
  const contentRating = status === STATUS.success ? rating : null;
  const cover =
    status === STATUS.success && image
      ? { src: image, alt: rating?.title ?? TEXT.ratingTitle }
      : null;

  return (
    <aside className={styles.sidebar} aria-label={TEXT.ratingTitle}>
      <div className={styles.panel}>
        {cover && <RatingCover alt={cover.alt} src={cover.src} />}

        <RatingHeader title={headerTitle} />

        {placeholder && <RatingPlaceholder message={placeholder} />}

        {contentRating && <RatingContent rating={contentRating} />}
      </div>
    </aside>
  );
});
