import type { SearchResponse } from '../../api/search.types.ts';
import { STATUS } from '../../constants/status.ts';
import { TEXT } from '../../constants/text.ts';
import { StatusMessage } from '../status-message/status-message.tsx';
import { OfferRow } from './offer-row.tsx';
import * as styles from './offers-table.module.css';
import { toRows } from './utils.ts';

type OffersTableProps = {
  data: SearchResponse;
};

export function OffersTable({ data }: OffersTableProps) {
  const rows = toRows(data);

  if (rows.length === 0) {
    return <StatusMessage kind={STATUS.empty}>{TEXT.empty}</StatusMessage>;
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{TEXT.source}</th>
            <th>{TEXT.shop}</th>
            <th>{TEXT.game}</th>
            <th>{TEXT.price}</th>
            <th>{TEXT.link}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <OfferRow key={row.key} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
