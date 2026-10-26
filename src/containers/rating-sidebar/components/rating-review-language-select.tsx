import type { ChangeEvent } from 'react';

import { REVIEW_LANGUAGE_OPTIONS, TEXT, type ReviewLang } from '&constants';
import { Label } from '&ui/label';
import * as styles from './rating-review-language-select.module.css';

type RatingReviewLanguageSelectProps = {
  disabled?: boolean;
  value: ReviewLang;
  onChange: (reviewLang: ReviewLang) => void;
};

export function RatingReviewLanguageSelect({
  disabled = false,
  value,
  onChange,
}: RatingReviewLanguageSelectProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as ReviewLang);
  }

  return (
    <Label header={TEXT.reviewLang}>
      <select
        className={styles.select}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {REVIEW_LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Label>
  );
}
