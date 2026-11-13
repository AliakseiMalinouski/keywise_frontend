import { memo } from 'react';

import type { RequirementBlock } from '../../system-requirements.utils.ts';
import * as styles from '../../system-requirements.module.css';

type RequirementHtmlProps = {
  html: string;
};

const RequirementHtml = memo(function RequirementHtml({ html }: RequirementHtmlProps) {
  return (
    <div
      className={styles.html}
      // Steam requirement copy is HTML; content is sanitized locally.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

type SystemRequirementsPlatformProps = Pick<
  RequirementBlock,
  'platformLabel' | 'minimum' | 'recommended'
>;

export const SystemRequirementsPlatform = memo(function SystemRequirementsPlatform({
  platformLabel,
  minimum,
  recommended,
}: SystemRequirementsPlatformProps) {
  return (
    <div className={styles.platform}>
      <p className={styles.platformLabel}>{platformLabel}</p>
      {minimum ? <RequirementHtml html={minimum} /> : null}
      {recommended ? <RequirementHtml html={recommended} /> : null}
    </div>
  );
});
