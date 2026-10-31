import { TEXT } from '&constants';

import * as styles from './search-reset-button.module.css';

type SearchResetButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function SearchResetButton({
  disabled = false,
  onClick,
}: SearchResetButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      title={TEXT.resetSearchHint}
      aria-label={TEXT.resetSearchHint}
      onClick={onClick}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 8a5.5 5.5 0 0 1 9.3-3.9M13.5 8A5.5 5.5 0 0 1 4.2 11.9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.5 2.5h2v2M11.5 4.5 13.5 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {TEXT.resetSearch}
    </button>
  );
}
