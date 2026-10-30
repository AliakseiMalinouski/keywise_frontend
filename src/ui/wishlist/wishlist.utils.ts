import type { WishlistGame } from '&network';

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
  const label = count === 1 ? 'game' : 'games';
  return `${count} ${label}`;
}
