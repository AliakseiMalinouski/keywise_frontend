import type { SearchResponse } from '../../api/search.ts';
import { STATUS } from '../../constants/status.ts';
import { TEXT } from '../../constants/text.ts';
import { StatusMessage } from '../status-message/status-message.tsx';
import * as styles from './offers-table.module.css';

type OfferRow = {
  key: string;
  marketplace: string;
  source: string;
  title: string;
  amount: number;
  currency: string;
  url: string;
  isBest: boolean;
};

function isBestOffer(
  marketplace: string,
  offer: SearchResponse['result'][number]['data'][number],
  best: SearchResponse['best'],
): boolean {
  if (!best) {
    return false;
  }

  return (
    marketplace === best.marketplace &&
    offer.url === best.url &&
    offer.price.amount === best.price.amount &&
    offer.price.currency === best.price.currency
  );
}

function toRows(data: SearchResponse): OfferRow[] {
  return data.result.flatMap((block) =>
    block.data.map((offer, index) => ({
      key: `${block.source}-${offer.url}-${index}`,
      marketplace: block.source,
      source: offer.source,
      title: offer.title,
      amount: offer.price.amount,
      currency: offer.price.currency,
      url: offer.url,
      isBest: isBestOffer(block.source, offer, data.best),
    })),
  );
}

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
            <tr key={row.key} className={row.isBest ? styles.best : undefined}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
