import type { MouseEvent } from 'react';

import { TEXT } from '&constants';

import * as styles from '../../best-offer.module.css';

type ShareButtonProps = {
  copied: boolean;
  onShare: () => void;
};

export function ShareButton({ copied, onShare }: ShareButtonProps) {
  const className = copied ? `${styles.share} ${styles.shareCopied}` : styles.share;
  const label = copied ? TEXT.shareCopied : TEXT.share;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onShare();
  }

  return (
    <button
      type="button"
      className={className}
      title={TEXT.shareHint}
      aria-label={TEXT.shareHint}
      onClick={handleClick}
    >
      <svg className={styles.shareIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="4" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11.6" cy="4.1" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11.6" cy="11.9" r="1.6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5.5 7.15 10.05 5.05M5.5 8.85l4.55 2.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </button>
  );
}
