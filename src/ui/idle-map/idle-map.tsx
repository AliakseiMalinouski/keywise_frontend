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
  const preparedRegion = region.toUpperCase() as SearchRegion;
  const defaultTextClassName = `${styles.label}${region === EU_REGION ? ` ${styles.labelOn}` : ''}`;

  return (
    <div className={styles.wrap}>
      <svg className={styles.map} viewBox="0 0 760 400" role="group" aria-label={TEXT.region}>
        {REGION_SHAPES.map((shape) => {
          const selected = region === shape.id;
          const shapeId = shape.id.toUpperCase() as SearchRegion;
          const inEuroZone = region === 'eu' && EURO_REGIONS.includes(shape.id);
          const className = `${styles.land}${selected ? ` ${styles.active}` : ''}${inEuroZone ? ` ${styles.zone}` : ''}`;
          const textClassName = `${styles.label}${selected || inEuroZone ? ` ${styles.labelOn}` : ''}`;

          return (
            <g key={shape.id}>
              <path
                tabIndex={0}
                role="button"
                aria-label={shapeId}
                className={className}
                aria-pressed={selected}
                onClick={() => onRegionChange(shapeId)}
                onKeyDown={(event) => handleKey(event, shapeId, onRegionChange)}
              />
              <text
                x={shape.label.x}
                y={shape.label.y}
                className={textClassName}

              >
                {shapeId}
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
            tabIndex={0}
            role="button"
            aria-label={EU_REGION}
            aria-pressed={region === EU_REGION}
            onClick={() => onRegionChange(EU_REGION)}
            onKeyDown={(event) => handleKey(event, EU_REGION, onRegionChange)}
          />
          <text
            y="88"
            x="388"
            className={defaultTextClassName}
          >
            {EU_REGION}
          </text>
        </g>
      </svg>
      <p className={styles.caption}>
        {TEXT.region} · {preparedRegion}
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
