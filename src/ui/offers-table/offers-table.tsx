import type { SearchResponse } from '&network';
import { STATUS, TEXT } from '&constants';
import { StatusMessage } from '&ui/status-message';
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
    <section className={styles.wrap} aria-label="All offers">
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{TEXT.source}</th>
            <th scope="col">{TEXT.shop}</th>
            <th scope="col">{TEXT.game}</th>
            <th scope="col">{TEXT.price}</th>
            <th scope="col">{TEXT.link}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <OfferRow key={row.key} row={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
