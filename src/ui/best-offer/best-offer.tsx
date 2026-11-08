import type { CSSProperties } from 'react';

import type { BestOffer as BestOfferData } from '&network';
import { TEXT } from '&constants';

import { ShareButton } from './components/share_button';
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
    <a className={styles.cardLink} href={offer.url} target="_blank" rel="noreferrer">
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
        <ShareButton copied={copied} onShare={() => onShare(offer.title)} />
        <footer className={styles.footer}>
          <span className={styles.link}>{TEXT.open}</span>
        </footer>
      </article>
    </a>
  );
}
