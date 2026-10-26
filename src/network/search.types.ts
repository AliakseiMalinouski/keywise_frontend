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

export type SteamReview = {
  recommendationId: string;
  language: string;
  text: string;
  votedUp: boolean;
  timestamp: number;
  votesUp: number;
};

export type GameRating = {
  appid: number;
  title: string;
  score: number;
  scoreDescription: string;
  totalPositive: number;
  totalNegative: number;
  totalReviews: number;
  reviews: SteamReview[];
};

export type SearchResponse = {
  result: SourceResult[];
  best: BestOffer | null;
  rating: GameRating | null;
  image?: string;
  wishlist?: WishlistGame[];
};
