import { memo, useCallback, type KeyboardEvent } from 'react';

import type { RegionShape } from '../idle-map.shapes.ts';
import { handleRegionKey, joinClassNames } from '../idle-map.utils.ts';
import * as styles from '../idle-map.module.css';

type IdleMapRegionProps = {
  shape: RegionShape;
  selected: boolean;
  inEuroZone: boolean;
  onSelect: (region: RegionShape['id']) => void;
};

export const IdleMapRegion = memo(function IdleMapRegion({
  shape,
  selected,
  inEuroZone,
  onSelect,
}: IdleMapRegionProps) {
  const regionId = shape.id;
  const label = regionId.toUpperCase();
  const landClassName = joinClassNames(
    styles.land,
    selected && styles.active,
    inEuroZone && styles.zone,
  );
  const labelClassName = joinClassNames(
    styles.label,
    (selected || inEuroZone) && styles.labelOn,
  );

  const handleClick = useCallback(() => {
    onSelect(regionId);
  }, [onSelect, regionId]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<SVGElement>) => {
      handleRegionKey(event, regionId, onSelect);
    },
    [onSelect, regionId],
  );

  return (
    <g>
      <path
        d={shape.d}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={label}
        className={landClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      <text
        x={shape.label.x}
        y={shape.label.y}
        className={labelClassName}
        aria-hidden="true"
      >
        {label}
      </text>
    </g>
  );
});
