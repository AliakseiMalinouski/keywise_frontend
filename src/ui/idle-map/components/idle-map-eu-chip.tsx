import { memo, useCallback, type KeyboardEvent } from 'react';

import type { SearchRegion } from '&constants';
import { EU_REGION, handleRegionKey, joinClassNames } from '../idle-map.utils.ts';
import * as styles from '../idle-map.module.css';

const EU_LABEL = EU_REGION.toUpperCase();

type IdleMapEuChipProps = {
  selected: boolean;
  onSelect: (region: SearchRegion) => void;
};

export const IdleMapEuChip = memo(function IdleMapEuChip({
  selected,
  onSelect,
}: IdleMapEuChipProps) {
  const chipClassName = joinClassNames(styles.chip, selected && styles.active);
  const labelClassName = joinClassNames(styles.label, selected && styles.labelOn);

  const handleClick = useCallback(() => {
    onSelect(EU_REGION);
  }, [onSelect]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<SVGElement>) => {
      handleRegionKey(event, EU_REGION, onSelect);
    },
    [onSelect],
  );

  return (
    <g>
      <rect
        className={chipClassName}
        rx="9"
        x="368"
        y="70"
        width="40"
        height="26"
        role="button"
        tabIndex={0}
        aria-label={EU_LABEL}
        aria-pressed={selected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
      <text className={labelClassName} x="388" y="88" aria-hidden="true">
        {EU_LABEL}
      </text>
    </g>
  );
});
