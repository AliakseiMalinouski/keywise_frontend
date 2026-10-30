import { memo, useMemo } from 'react';

import { TEXT, type SearchRegion } from '&constants';
import { IdleMapCaption } from './components/idle-map-caption.tsx';
import { IdleMapEuChip } from './components/idle-map-eu-chip.tsx';
import { IdleMapRegion } from './components/idle-map-region.tsx';
import { REGION_SHAPES } from './idle-map.shapes.ts';
import { EU_REGION, isEuroZoneShape } from './idle-map.utils.ts';
import * as styles from './idle-map.module.css';

type IdleMapProps = {
  region: SearchRegion;
  onRegionChange: (region: SearchRegion) => void;
};

export const IdleMap = memo(function IdleMap({
  region,
  onRegionChange,
}: IdleMapProps) {
  const euroSelected = region === EU_REGION;
  const caption = `${TEXT.region} · ${region.toUpperCase()}`;

  const regions = useMemo(
    () =>
      REGION_SHAPES.map((shape) => ({
        shape,
        selected: region === shape.id,
        inEuroZone: isEuroZoneShape(shape.id, euroSelected),
      })),
    [region, euroSelected],
  );

  return (
    <figure className={styles.wrap}>
      <svg
        className={styles.map}
        viewBox="0 0 760 400"
        role="img"
        aria-label={`${TEXT.region}: ${region.toUpperCase()}`}
      >
        {regions.map(({ shape, selected, inEuroZone }) => (
          <IdleMapRegion
            key={shape.id}
            shape={shape}
            selected={selected}
            inEuroZone={inEuroZone}
            onSelect={onRegionChange}
          />
        ))}

        <IdleMapEuChip selected={euroSelected} onSelect={onRegionChange} />
      </svg>

      <IdleMapCaption text={caption} />
    </figure>
  );
});
