import type { KeyboardEvent } from 'react';

import type { SearchRegion } from '../../constants/regions.ts';
import { TEXT } from '../../constants/text.ts';
import { EURO_REGIONS, REGION_SHAPES } from './idle-map.shapes.ts';
import * as styles from './idle-map.module.css';

type IdleMapProps = {
  region: SearchRegion;
  onRegionChange: (region: SearchRegion) => void;
};

const EU_REGION = 'eu';

export function IdleMap({ region, onRegionChange }: IdleMapProps) {
  return (
    <div className={styles.wrap}>
      <svg className={styles.map} viewBox="0 0 760 400" role="group" aria-label={TEXT.region}>
        {REGION_SHAPES.map((shape) => {
          const selected = region === shape.id;
          const inEuroZone = region === EU_REGION && EURO_REGIONS.includes(shape.id);

          return (
            <g key={shape.id}>
              <path
                d={shape.d}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                aria-label={shape.id.toUpperCase()}
                onClick={() => onRegionChange(shape.id)}
                onKeyDown={(event) => handleKey(event, shape.id, onRegionChange)}
                className={`${styles.land}${selected ? ` ${styles.active}` : ''}${inEuroZone ? ` ${styles.zone}` : ''}`}
              />
              <text
                x={shape.label.x}
                y={shape.label.y}
                className={`${styles.label}${selected || inEuroZone ? ` ${styles.labelOn}` : ''}`}
              >
                {shape.id.toUpperCase()}
              </text>
            </g>
          );
        })}

        <g>
          <rect
            className={`${styles.chip}${region === EU_REGION ? ` ${styles.active}` : ''}`}
            rx="9"
            x="368"
            y="70"
            width="40"
            height="26"
            role="button"
            tabIndex={0}
            aria-label="EU"
            aria-pressed={region === EU_REGION}
            onClick={() => onRegionChange(EU_REGION)}
            onKeyDown={(event) => handleKey(event, EU_REGION, onRegionChange)}
          />
          <text
            className={`${styles.label}${region === EU_REGION ? ` ${styles.labelOn}` : ''}`}
            x="388"
            y="88"
          >
            {EU_REGION.toUpperCase()}
          </text>
        </g>
      </svg>
      <p className={styles.caption}>
        {TEXT.region} · {region.toUpperCase()}
      </p>
    </div>
  );
}

function handleKey(
  event: KeyboardEvent<SVGElement>,
  next: SearchRegion,
  onRegionChange: (region: SearchRegion) => void,
) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  onRegionChange(next);
}
