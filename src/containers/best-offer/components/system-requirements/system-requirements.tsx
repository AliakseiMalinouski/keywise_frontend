import { memo, useMemo, type MouseEvent } from 'react';

import type { GameRequirements } from '&network';
import { TEXT } from '&constants';
import { Accordion } from '&ui/accordion';

import { SystemRequirementsPlatform } from './components/system-requirements-platform';
import * as styles from './system-requirements.module.css';
import { toBlocks } from './system-requirements.utils.ts';

type SystemRequirementsProps = {
  requirements: GameRequirements | null;
  onImage?: boolean;
};

function stopCardNavigation(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
  event.stopPropagation();
}

export const SystemRequirements = memo(function SystemRequirements({
  requirements,
  onImage = false,
}: SystemRequirementsProps) {
  const blocks = useMemo(
    () => (requirements ? toBlocks(requirements) : []),
    [requirements],
  );

  if (!requirements || blocks.length === 0) {
    return null;
  }

  const rootClass = onImage ? `${styles.root} ${styles.onImage}` : styles.root;

  return (
    <div className={rootClass} onClick={stopCardNavigation}>
      <Accordion
        ariaLabel={TEXT.systemRequirements}
        className={styles.accordion}
        label={<span className={styles.heading}>{TEXT.systemRequirements}</span>}
        tone={onImage ? 'inverse' : 'default'}
      >
        <div className={styles.content}>
          {blocks.map((platform) => (
            <SystemRequirementsPlatform
              key={platform.key}
              platformLabel={platform.platformLabel}
              minimum={platform.minimum}
              recommended={platform.recommended}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
});
