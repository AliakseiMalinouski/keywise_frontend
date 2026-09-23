import type { SearchRegion } from '../../constants/regions.ts';

export type RegionShape = {
  id: SearchRegion;
  d: string;
  label: { x: number; y: number };
};

export const EURO_REGIONS: SearchRegion[] = [
  'be',
  'de',
  'es',
  'fi',
  'fr',
  'ie',
  'it',
  'nl',
];

export const REGION_SHAPES: RegionShape[] = [
  {
    id: 'ca',
    d: 'M46 78 C88 42 168 40 208 76 L192 118 H58 Z',
    label: { x: 128, y: 90 },
  },
  {
    id: 'us',
    d: 'M54 124 L196 118 208 182 176 206 72 198 44 162 Z',
    label: { x: 126, y: 164 },
  },
  {
    id: 'br',
    d: 'M148 236 L190 224 212 276 176 318 138 294 128 254 Z',
    label: { x: 168, y: 272 },
  },
  {
    id: 'ie',
    d: 'M302 132 L326 126 334 158 308 164 Z',
    label: { x: 318, y: 148 },
  },
  {
    id: 'gb',
    d: 'M334 108 L364 100 372 158 352 172 336 152 Z',
    label: { x: 350, y: 138 },
  },
  {
    id: 'no',
    d: 'M424 38 L452 34 464 98 436 106 422 72 Z',
    label: { x: 442, y: 72 },
  },
  {
    id: 'se',
    d: 'M462 50 L496 44 506 118 474 126 Z',
    label: { x: 484, y: 88 },
  },
  {
    id: 'fi',
    d: 'M512 52 L548 46 554 108 520 116 Z',
    label: { x: 534, y: 86 },
  },
  {
    id: 'dk',
    d: 'M434 110 L464 106 470 130 436 134 Z',
    label: { x: 452, y: 124 },
  },
  {
    id: 'nl',
    d: 'M402 140 L426 136 430 154 404 158 Z',
    label: { x: 416, y: 150 },
  },
  {
    id: 'be',
    d: 'M390 158 L414 154 418 172 392 176 Z',
    label: { x: 404, y: 168 },
  },
  {
    id: 'de',
    d: 'M422 142 L476 136 484 188 430 192 Z',
    label: { x: 452, y: 168 },
  },
  {
    id: 'pl',
    d: 'M486 140 L540 136 546 184 490 188 Z',
    label: { x: 516, y: 166 },
  },
  {
    id: 'fr',
    d: 'M352 170 L416 166 426 224 364 234 338 202 Z',
    label: { x: 386, y: 202 },
  },
  {
    id: 'ch',
    d: 'M416 190 L444 186 448 208 418 210 Z',
    label: { x: 432, y: 202 },
  },
  {
    id: 'es',
    d: 'M320 230 L392 222 398 272 328 276 Z',
    label: { x: 360, y: 252 },
  },
  {
    id: 'it',
    d: 'M432 212 L462 206 470 252 488 280 464 284 444 248 428 232 Z',
    label: { x: 452, y: 240 },
  },
  {
    id: 'au',
    d: 'M598 286 L686 278 700 334 644 354 590 328 Z',
    label: { x: 646, y: 318 },
  },
];
