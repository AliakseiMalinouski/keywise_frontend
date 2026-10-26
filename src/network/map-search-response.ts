import type {
  BestOfferDto,
  GameRatingDto,
  OfferDto,
  SearchResponseDto,
  SteamReviewDto,
  WishlistGameDto,
} from './search.dto.ts';
import type {
  BestOffer,
  GameRating,
  Offer,
  SearchResponse,
  SteamReview,
  WishlistGame,
} from './search.types.ts';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function readBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function mapOffer(dto: OfferDto): Offer {
  return {
    source: dto.source,
    title: dto.title,
    url: dto.url,
    region: dto.region,
    price: {
      amount: dto.price.amount,
      currency: dto.price.currency,
    },
  };
}

function mapBestOffer(dto: BestOfferDto): BestOffer {
  return {
    ...mapOffer(dto),
    marketplace: dto.marketplace,
  };
}

function mapWishlistGame(dto: WishlistGameDto): WishlistGame {
  return {
    appid: dto.appid,
    title: dto.title,
    selected: dto.selected,
  };
}

function mapSteamReview(dto: SteamReviewDto): SteamReview | null {
  const recommendationId = readString(dto.recommendationId);
  const text = readString(dto.text);
  const votedUp = readBoolean(dto.votedUp);
  const timestamp = readNumber(dto.timestamp);
  const votesUp = readNumber(dto.votesUp);

  if (!recommendationId || !text || votedUp === null || timestamp === null) {
    return null;
  }

  return {
    recommendationId,
    language: readString(dto.language) ?? '',
    text,
    votedUp,
    timestamp,
    votesUp: votesUp ?? 0,
  };
}

export function mapGameRating(dto: GameRatingDto | null | undefined): GameRating | null {
  if (!dto) {
    return null;
  }

  const appid = readNumber(dto.appid);
  const title = readString(dto.title);
  const score = readNumber(dto.score);
  const scoreDescription = readString(dto.scoreDescription);
  const totalPositive = readNumber(dto.totalPositive);
  const totalNegative = readNumber(dto.totalNegative);
  const totalReviews = readNumber(dto.totalReviews);

  if (
    appid === null ||
    !title ||
    score === null ||
    !scoreDescription ||
    totalPositive === null ||
    totalNegative === null ||
    totalReviews === null
  ) {
    return null;
  }

  const reviews = (dto.reviews ?? [])
    .map((review) => mapSteamReview(review))
    .filter((review): review is SteamReview => review !== null);

  return {
    appid,
    title,
    score,
    scoreDescription,
    totalPositive,
    totalNegative,
    totalReviews,
    reviews,
  };
}

function mapImage(value: unknown): string | undefined {
  const image = readString(value);
  if (!image) {
    return undefined;
  }

  try {
    const url = new URL(image);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return undefined;
    }
  } catch {
    return undefined;
  }

  return image;
}

export function mapSearchResponse(dto: SearchResponseDto): SearchResponse {
  const image = mapImage(dto.image);

  return {
    result: dto.result.map((block) => ({
      source: block.source,
      data: block.data.map(mapOffer),
    })),
    best: dto.best ? mapBestOffer(dto.best) : null,
    rating: mapGameRating(dto.rating),
    ...(image ? { image } : {}),
    wishlist: dto.wishlist?.map(mapWishlistGame),
  };
}

export function parseSearchResponse(payload: unknown): SearchResponse {
  if (!isRecord(payload) || !Array.isArray(payload.result)) {
    throw new Error('Invalid search response');
  }

  return mapSearchResponse(payload as SearchResponseDto);
}
