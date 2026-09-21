export type OfferPrice = {
  amount: number;
  currency: string;
};

export type Offer = {
  source: string;
  title: string;
  url: string;
  region?: string;
  price: OfferPrice;
};

export type SourceResult = {
  source: string;
  data: Offer[];
};

export type BestOffer = Offer & {
  marketplace: string;
};

export type WishlistGame = {
  appid: number;
  title: string | null;
  selected: boolean;
};

export type SearchResponse = {
  result: SourceResult[];
  best: BestOffer | null;
  wishlist?: WishlistGame[];
};
