import type { KeyboardEvent } from 'react';

import type { SearchRegion } from '../../constants/regions.ts';
import { TEXT } from '../../constants/text.ts';
import { EURO_REGIONS, REGION_SHAPES } from './idle-map.shapes.ts';
import * as styles from './idle-map.module.css';

type IdleMapProps = {
  region: SearchRegion;
  onRegionChange: (region: SearchRegion) => void;
};

export function IdleMap({ region, onRegionChange }: IdleMapProps) {
  return (
    <div className={styles.wrap}>
      <svg className={styles.map} viewBox="0 0 760 400" role="group" aria-label={TEXT.region}>
        {REGION_SHAPES.map((shape) => {
          const selected = region === shape.id;
          const inEuroZone = region === 'eu' && EURO_REGIONS.includes(shape.id);

          return (
            <g key={shape.id}>
              <path
                className={`${styles.land}${selected ? ` ${styles.active}` : ''}${inEuroZone ? ` ${styles.zone}` : ''}`}
                d={shape.d}
                role="button"
                tabIndex={0}
                aria-label={shape.id.toUpperCase()}
                aria-pressed={selected}
                onClick={() => onRegionChange(shape.id)}
                onKeyDown={(event) => handleKey(event, shape.id, onRegionChange)}
              />
              <text
                className={`${styles.label}${selected || inEuroZone ? ` ${styles.labelOn}` : ''}`}
                x={shape.label.x}
                y={shape.label.y}
              >
                {shape.id.toUpperCase()}
              </text>
            </g>
          );
        })}

        <g>
          <rect
            className={`${styles.chip}${region === 'eu' ? ` ${styles.active}` : ''}`}
            x="368"
            y="70"
            width="40"
            height="26"
            rx="9"
            role="button"
            tabIndex={0}
            aria-label="EU"
            aria-pressed={region === 'eu'}
            onClick={() => onRegionChange('eu')}
            onKeyDown={(event) => handleKey(event, 'eu', onRegionChange)}
          />
          <text
            className={`${styles.label}${region === 'eu' ? ` ${styles.labelOn}` : ''}`}
            x="388"
            y="88"
          >
            EU
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
