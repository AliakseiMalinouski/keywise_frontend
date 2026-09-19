import { memo } from 'react';

import { TEXT } from '../../constants/text.ts';
import * as styles from './offers-table.module.css';
import type { OfferRow as OfferRowData } from './utils.ts';

type OfferRowProps = {
  row: OfferRowData;
};

export const OfferRow = memo(function OfferRow({ row }: OfferRowProps) {
  return (
    <tr className={row.isBest ? styles.best : undefined}>
      <td>{row.marketplace}</td>
      <td>{row.source}</td>
      <td>{row.title}</td>
      <td>
        {row.amount} {row.currency}
      </td>
      <td>
        <a href={row.url} target="_blank" rel="noreferrer">
          {TEXT.open}
        </a>
      </td>
    </tr>
  );
});
