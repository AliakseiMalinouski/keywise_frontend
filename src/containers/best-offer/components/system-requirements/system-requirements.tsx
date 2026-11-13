import { memo, useMemo, type MouseEvent } from 'react';

import type { GameRequirements } from '&network';
import { TEXT } from '&constants';

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
    <section
      className={rootClass}
      aria-label={TEXT.systemRequirements}
      onClick={stopCardNavigation}
    >
      <p className={styles.heading}>{TEXT.systemRequirements}</p>
      {blocks.map((platform) => (
        <SystemRequirementsPlatform
          key={platform.key}
          platformLabel={platform.platformLabel}
          minimum={platform.minimum}
          recommended={platform.recommended}
        />
      ))}
    </section>
  );
});
