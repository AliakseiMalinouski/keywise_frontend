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

export const DEFAULT_SEARCH_REGION: SearchRegion = 'pl';
