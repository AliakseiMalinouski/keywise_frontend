import type { ReactNode } from 'react';

import * as styles from './label.module.css';

type LabelProps = {
  header: string;
  children: ReactNode;
};

export function Label({ header, children }: LabelProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{header}</span>
      {children}
    </label>
  );
}
