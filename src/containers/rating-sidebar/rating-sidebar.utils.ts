import type { GameRating } from '&network';

export function steamStoreUrl(appid: number): string {
  return `https://store.steampowered.com/app/${appid}`;
}

export function formatReviewDate(timestamp: number): string {
  if (!Number.isFinite(timestamp) || timestamp <= 0) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(timestamp * 1000));
}

export function positivePercent(rating: GameRating): number | null {
  if (rating.totalReviews <= 0) {
    return null;
  }

  return Math.round((rating.totalPositive / rating.totalReviews) * 100);
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function stripSteamMarkup(text: string): string {
  return text
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
