import type { SearchResponse } from '&network';
import { STATUS, TEXT, type SearchRegion, type Status } from '&constants';
import { useSearchLoadingMessage } from '../../hooks';
import { IdleMap } from '&ui/idle-map';
import { OffersTable } from '&ui/offers-table';
import { SearchLoader } from '&ui/search-loader';
import { SearchResetButton } from '&ui/search-reset';
import { StatusMessage } from '&ui/status-message';
import { Wishlist } from '&ui/wishlist';

import * as styles from './search-results.module.css';

type SearchResultsProps = {
  status: Status;
  data: SearchResponse | null;
  error: string | null;
  region: SearchRegion;
  onRegionChange: (region: SearchRegion) => void;
  onReset: () => void;
};

export function SearchResults({
  status,
  data,
  error,
  region,
  onRegionChange,
  onReset,
}: SearchResultsProps) {
  const isLoading = status === STATUS.loading;
  const { message: loadingMessage, messageKey: loadingMessageKey } =
    useSearchLoadingMessage(isLoading);
  const isError = status === STATUS.error && error;
  const isSuccess = status === STATUS.success && data;
  const wishlist = isSuccess ? data.wishlist : undefined;
  const showReset = status !== STATUS.idle;

  return (
    <section
      className={styles.section}
      aria-label={TEXT.resultsSectionHeading}
      aria-live="polite"
    >
      {showReset && (
        <div className={styles.toolbar}>
          <SearchResetButton disabled={isLoading} onClick={onReset} />
        </div>
      )}

      {status === STATUS.idle && (
        <IdleMap region={region} onRegionChange={onRegionChange} />
      )}

      {isLoading && (
        <SearchLoader message={loadingMessage} messageKey={loadingMessageKey} />
      )}

      {isError && (
        <StatusMessage kind={STATUS.error}>{error}</StatusMessage>
      )}

      {wishlist && <Wishlist games={wishlist} />}
      {isSuccess && <OffersTable data={data} />}
    </section>
  );
}
