export type OfferPriceDto = {
  amount: number;
  currency: string;
};

export type OfferDto = {
  source: string;
  title: string;
  url: string;
  region?: string;
  price: OfferPriceDto;
};

export type SourceResultDto = {
  source: string;
  data: OfferDto[];
};

export type BestOfferDto = OfferDto & {
  marketplace: string;
};

export type WishlistGameDto = {
  appid: number;
  title: string | null;
  selected: boolean;
};

export type SteamReviewDto = {
  recommendationId: string;
  language: string;
  text: string;
  votedUp: boolean;
  timestamp: number;
  votesUp: number;
};

export type GameRatingDto = {
  appid: number;
  title: string;
  score: number;
  scoreDescription: string;
  totalPositive: number;
  totalNegative: number;
  totalReviews: number;
  reviews: SteamReviewDto[];
};

export type SearchResponseDto = {
  result: SourceResultDto[];
  best: BestOfferDto | null;
  rating: GameRatingDto | null;
  wishlist?: WishlistGameDto[];
};
