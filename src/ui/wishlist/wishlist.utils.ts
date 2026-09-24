import type { WishlistGame } from '../../api/search.types.ts';

export function getWishlistItems(games: WishlistGame[]): {
  selected: WishlistGame | undefined;
  items: WishlistGame[];
} {
  const selected = games.find((game) => game.selected);
  const items = selected
    ? [selected, ...games.filter((game) => game !== selected)]
    : games;

  return { selected, items };
}

export function getGamesCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} игра`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} игры`;
  }

  return `${count} игр`;
}
