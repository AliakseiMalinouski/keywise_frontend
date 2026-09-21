import type { BestOffer as BestOfferData } from '../../api/search.types.ts';
import { TEXT } from '../../constants/text.ts';
import * as styles from './best-offer.module.css';

type BestOfferProps = {
  offer: BestOfferData;
};

export function BestOffer({ offer }: BestOfferProps) {
  return (
    <article className={styles.card}>
      <p className={styles.kicker}>{TEXT.bestOffer}</p>
      <h2 className={styles.title}>{offer.title}</h2>
      <p className={styles.price}>
        {offer.price.amount} {offer.price.currency}
      </p>
      <p className={styles.meta}>
        {offer.marketplace} · {offer.source}
        {offer.region ? ` · ${offer.region.toUpperCase()}` : null}
      </p>
      <a className={styles.link} href={offer.url} target="_blank" rel="noreferrer">
        {TEXT.open}
      </a>
    </article>
  );
}
