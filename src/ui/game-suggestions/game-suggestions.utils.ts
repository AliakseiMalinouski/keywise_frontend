import { POPULAR_GAME_TITLES } from './game-suggestions.const.ts';

export function filterGameTitles(query: string): string[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [...POPULAR_GAME_TITLES];
  }

  return POPULAR_GAME_TITLES.filter((title) => title.toLowerCase().includes(needle));
}
