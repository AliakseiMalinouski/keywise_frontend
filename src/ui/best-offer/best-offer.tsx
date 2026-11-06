import type { CSSProperties } from 'react';

import type { BestOffer as BestOfferData } from '&network';
import { TEXT } from '&constants';
import * as styles from './best-offer.module.css';

type BestOfferProps = {
  offer: BestOfferData;
  copied: boolean;
  onShare: (title: string) => void;
};

const DIVIDER = ' ';

function backgroundStyle(image: string): CSSProperties {
  const safeUrl = image.replace(/["\\\n\r]/g, '');

  return {
    backgroundImage: `linear-gradient(160deg, rgb(9 9 11 / 48%), rgb(9 9 11 / 68%)), url("${safeUrl}")`,
  };
}

export function BestOffer({ offer, copied, onShare }: BestOfferProps) {
  const marketAndSource = `${offer.marketplace} · ${offer.source}`;
  const region = offer.region ? ` · ${offer.region.toUpperCase()}` : null;
  const articleStyle = offer.image ? backgroundStyle(offer.image) : undefined;

  return (
    <article
      className={offer.image ? `${styles.card} ${styles.cardWithImage}` : styles.card}
      style={articleStyle}
      aria-label={`${TEXT.bestOffer}: ${offer.title}`}
    >
      <header className={styles.header}>
        <p className={styles.kicker}>{TEXT.bestOffer}</p>
        <h3 className={styles.title}>{offer.title}</h3>
      </header>
      <p className={styles.price}>
        <data value={offer.price.amount}>
          {offer.price.amount} {offer.price.currency}
        </data>
      </p>
      <p className={styles.meta}>
        {marketAndSource}
        {DIVIDER}
        {region && <span>{region}</span>}
      </p>
      <button
        type="button"
        className={copied ? `${styles.share} ${styles.shareCopied}` : styles.share}
        title={TEXT.shareHint}
        aria-label={TEXT.shareHint}
        onClick={() => onShare(offer.title)}
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
        {copied ? TEXT.shareCopied : TEXT.share}
      </button>
      <footer className={styles.footer}>
        <a className={styles.link} href={offer.url} target="_blank" rel="noreferrer">
          {TEXT.open}
        </a>
      </footer>
    </article>
  );
}
