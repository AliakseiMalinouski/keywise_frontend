export const SEARCH_REGIONS = [
  'au',
  'be',
  'br',
  'ca',
  'ch',
  'de',
  'dk',
  'es',
  'eu',
  'fi',
  'fr',
  'gb',
  'ie',
  'it',
  'nl',
  'no',
  'pl',
  'se',
  'us',
] as const;

export type SearchRegion = (typeof SEARCH_REGIONS)[number];

const SEARCH_REGION_SET: ReadonlySet<string> = new Set(SEARCH_REGIONS);

export function isSearchRegion(value: string): value is SearchRegion {
  return SEARCH_REGION_SET.has(value);
}

export const DEFAULT_SEARCH_REGION: SearchRegion = 'pl';
