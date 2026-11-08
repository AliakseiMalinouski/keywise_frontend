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
      <div className={styles.grid} role="table">
        <div role="row" className={styles.headerRow}>
          <span role="columnheader" className={styles.th}>
            {TEXT.source}
          </span>
          <span role="columnheader" className={styles.th}>
            {TEXT.shop}
          </span>
          <span role="columnheader" className={styles.th}>
            {TEXT.game}
          </span>
          <span role="columnheader" className={styles.th}>
            {TEXT.price}
          </span>
          <span role="columnheader" className={styles.th}>
            {TEXT.link}
          </span>
        </div>
        {rows.map((row) => (
          <OfferRow key={row.key} row={row} />
        ))}
      </div>
    </section>
  );
}
