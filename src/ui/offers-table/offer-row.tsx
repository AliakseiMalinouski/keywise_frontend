import { memo } from 'react';

import { TEXT } from '&constants';
import * as styles from './offers-table.module.css';
import type { OfferRow as OfferRowData } from './utils.ts';

type OfferRowProps = {
  row: OfferRowData;
};

export const OfferRow = memo(({ row }: OfferRowProps) => {
  return (
    <a
      role="row"
      className={row.isBest ? `${styles.rowLink} ${styles.best}` : styles.rowLink}
      href={row.url}
      target="_blank"
      rel="noreferrer"
    >
      <span role="cell" className={styles.td}>
        {row.marketplace}
      </span>
      <span role="cell" className={styles.td}>
        {row.source}
      </span>
      <span role="cell" className={styles.td}>
        {row.title}
      </span>
      <span role="cell" className={styles.td}>
        <data value={row.amount}>
          {row.amount} {row.currency}
        </data>
      </span>
      <span role="cell" className={`${styles.td} ${styles.rowLinkLabel}`}>
        {TEXT.open}
      </span>
    </a>
  );
});
