import { memo } from 'react';

import type { GameRating, SteamReview } from '&network';
import { STATUS, TEXT, type ReviewLang, type Status } from '&constants';
import { RatingContent } from './components/rating-content.tsx';
import { RatingCover } from './components/rating-cover.tsx';
import { RatingHeader } from './components/rating-header.tsx';
import { RatingPlaceholder } from './components/rating-placeholder.tsx';
import { RatingReviewLanguageSelect } from './components/rating-review-language-select.tsx';
import { RatingReviews } from './components/rating-reviews.tsx';
import * as styles from './rating-sidebar.module.css';

type RatingSidebarProps = {
  hasSearchData?: boolean;
  image?: string;
  onReviewLangChange: (reviewLang: ReviewLang) => void;
  rating: GameRating | null;
  reviewLang: ReviewLang;
  reviewsLoading?: boolean;
  status: Status;
};

function placeholderMessage(
  status: Status,
  rating: GameRating | null,
  image?: string,
  reviewsLoading?: boolean,
): string | null {
  if (status === STATUS.idle) {
    return TEXT.ratingIdle;
  }

  if (status === STATUS.loading && !reviewsLoading) {
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
  hasSearchData = false,
  image,
  onReviewLangChange,
  rating,
  reviewLang,
  reviewsLoading = false,
  status,
}: RatingSidebarProps) {
  const placeholder = placeholderMessage(status, rating, image, reviewsLoading);
  const languageSelectDisabled = status === STATUS.loading;
  const headerTitle = rating?.title;
  const contentRating =
    rating && (status === STATUS.success || reviewsLoading) ? rating : null;
  const showReviewList =
    hasSearchData && (status === STATUS.success || reviewsLoading);
  const cover =
    status === STATUS.success && image
      ? { src: image, alt: rating?.title ?? TEXT.ratingTitle }
      : null;
  const reviews: SteamReview[] = contentRating?.reviews ?? [];
  const loading = status === STATUS.loading && !reviewsLoading;

  return (
    <aside className={styles.sidebar} aria-labelledby="rating-sidebar-heading">
      <section className={styles.panel}>
        {cover && <RatingCover alt={cover.alt} src={cover.src} />}

        <RatingHeader title={headerTitle} />

        <RatingReviewLanguageSelect
          disabled={languageSelectDisabled}
          value={reviewLang}
          onChange={onReviewLangChange}
        />

        {placeholder && (
          <RatingPlaceholder
            loading={loading}
            message={placeholder}
          />
        )}

        {contentRating && <RatingContent rating={contentRating} />}

        {showReviewList && (
          <RatingReviews reviews={reviews} reviewsLoading={reviewsLoading} />
        )}
      </section>
    </aside>
  );
});
