import type { Offer, SearchResponse } from '../../api/search.types.ts';

export type OfferRow = {
  key: string;
  marketplace: string;
  source: string;
  title: string;
  amount: number;
  currency: string;
  url: string;
  isBest: boolean;
};

function isBestOffer(
  marketplace: string,
  offer: Offer,
  best: SearchResponse['best'],
): boolean {
  if (!best) {
    return false;
  }

  return (
    marketplace === best.marketplace &&
    offer.url === best.url &&
    offer.price.amount === best.price.amount &&
    offer.price.currency === best.price.currency
  );
}

export function toRows(data: SearchResponse): OfferRow[] {
  return data.result.flatMap((block) =>
    block.data.map((offer, index) => ({
      key: `${block.source}-${offer.url}-${index}`,
      marketplace: block.source,
      source: offer.source,
      title: offer.title,
      amount: offer.price.amount,
      currency: offer.price.currency,
      url: offer.url,
      isBest: isBestOffer(block.source, offer, data.best),
    })),
  );
}
