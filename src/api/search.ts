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

export type SearchResponse = {
  result: SourceResult[];
  best: BestOffer | null;
};

function apiOrigin(): string {
  const raw = process.env.KEYWISE_API_PATH ?? '';
  return raw.replace(/\/+$/, '');
}

function errorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const message = (payload as { message: unknown }).message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0) {
      return message.map(String).join(', ');
    }
  }

  return fallback;
}

export async function searchGames(
  query: string,
  region: string,
): Promise<SearchResponse> {
  const url = `${apiOrigin()}/search?${new URLSearchParams({
    q: query,
    region,
  })}`;

  const response = await fetch(url);

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    throw new Error(errorMessage(payload, response.statusText || 'Search failed'));
  }

  return (await response.json()) as SearchResponse;
}
