import type { SearchResponse } from './search.types.ts';

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
  steam?: string,
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    region,
  });
  const steamValue = steam?.trim();
  if (steamValue) {
    params.set('steam', steamValue);
  }

  const url = `${apiOrigin()}/search?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    throw new Error(errorMessage(payload, response.statusText || 'Search failed'));
  }

  return (await response.json()) as SearchResponse;
}
