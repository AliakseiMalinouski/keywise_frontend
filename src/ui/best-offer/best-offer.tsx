import type { BestOffer as BestOfferData } from '&network';
import { TEXT } from '&constants';
import * as styles from './best-offer.module.css';

type BestOfferProps = {
  offer: BestOfferData;
};

const DIVIDER = ' ';

export function BestOffer({ offer }: BestOfferProps) {
  const marketAndSource = `${offer.marketplace} · ${offer.source}`;
  const region = offer.region ? ` · ${offer.region.toUpperCase()}` : null;

  return (
    <article className={styles.card} aria-label={`${TEXT.bestOffer}: ${offer.title}`}>
      <header className={styles.header}>
        <p className={styles.kicker}>{TEXT.bestOffer}</p>
        <h2 className={styles.title}>{offer.title}</h2>
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
      <footer className={styles.footer}>
        <a className={styles.link} href={offer.url} target="_blank" rel="noreferrer">
          {TEXT.open}
        </a>
      </footer>
    </article>
  );
}
