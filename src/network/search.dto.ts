type OfferPriceDto = {
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

type SourceResultDto = {
  source: string;
  data: OfferDto[];
};

export type BestOfferDto = OfferDto & {
  marketplace: string;
  image?: string;
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

export type PlatformRequirementsDto = {
  minimum?: string;
  recommended?: string;
};

export type GameRequirementsDto = {
  appid: number;
  pc?: PlatformRequirementsDto;
  mac?: PlatformRequirementsDto;
  linux?: PlatformRequirementsDto;
};

export type SearchResponseDto = {
  result: SourceResultDto[];
  best: BestOfferDto | null;
  rating: GameRatingDto | null;
  requirements: GameRequirementsDto | null;
  image?: string;
  wishlist?: WishlistGameDto[];
};
