import { useEffect, useState, type CSSProperties } from 'react';

import type { BestOffer as BestOfferData, GameRequirements } from '&network';
import { TEXT } from '&constants';

import { ShareButton } from './components/share_button';
import { SystemRequirements } from './components/system-requirements';
import * as styles from './best-offer.module.css';

type BestOfferProps = {
  offer: BestOfferData;
  requirements: GameRequirements | null;
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

export function BestOffer({ offer, requirements, copied, onShare }: BestOfferProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const marketAndSource = `${offer.marketplace} · ${offer.source}`;
  const region = offer.region ? ` · ${offer.region.toUpperCase()}` : null;
  const hasImage = Boolean(offer.image);

  useEffect(() => {
    if (!offer.image) {
      setImageLoaded(false);
      return;
    }

    setImageLoaded(false);
    const image = new Image();
    image.src = offer.image;

    const markLoaded = () => setImageLoaded(true);
    if (image.complete) {
      markLoaded();
      return;
    }

    image.addEventListener('load', markLoaded);
    image.addEventListener('error', markLoaded);

    return () => {
      image.removeEventListener('load', markLoaded);
      image.removeEventListener('error', markLoaded);
    };
  }, [offer.image]);

  return (
    <a className={styles.cardLink} href={offer.url} target="_blank" rel="noreferrer">
      <article
        className={hasImage ? `${styles.card} ${styles.cardWithImage}` : styles.card}
        aria-label={`${TEXT.bestOffer}: ${offer.title}`}
      >
        {hasImage ? (
          <div
            className={`${styles.cardBackdrop} ${imageLoaded ? styles.cardBackdropReady : ''}`}
            style={backgroundStyle(offer.image!)}
            aria-hidden
          />
        ) : null}
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
        <SystemRequirements requirements={requirements} onImage={hasImage} />
        <ShareButton copied={copied} onShare={() => onShare(offer.title)} />
        <footer className={styles.footer}>
          <span className={styles.link}>{TEXT.open}</span>
        </footer>
      </article>
    </a>
  );
}
