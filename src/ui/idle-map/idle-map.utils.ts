import type { KeyboardEvent } from 'react';

import type { SearchRegion } from '../../constants/regions.ts';
import { EURO_REGIONS } from './idle-map.shapes.ts';

const EURO_REGION_SET = new Set<SearchRegion>(EURO_REGIONS);

export const EU_REGION: SearchRegion = 'eu';

export function isEuroZoneShape(
  shapeId: SearchRegion,
  euroSelected: boolean,
): boolean {
  return euroSelected && EURO_REGION_SET.has(shapeId);
}

export function joinClassNames(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function handleRegionKey(
  event: KeyboardEvent<SVGElement>,
  next: SearchRegion,
  onSelect: (region: SearchRegion) => void,
): void {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  onSelect(next);
}
