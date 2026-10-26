import type { SearchResponse } from '../../api/search.types.ts';
import type { SearchRegion } from '../../constants/regions.ts';
import { STATUS, type Status } from '../../constants/status.ts';
import { BestOffer } from '../best-offer/best-offer.tsx';
import { IdleMap } from '../idle-map/idle-map.tsx';
import { OffersTable } from '../offers-table/offers-table.tsx';
import { SearchLoader } from '../search-loader/search-loader.tsx';
import { StatusMessage } from '../status-message/status-message.tsx';
import { Wishlist } from '../wishlist/wishlist.tsx';

type SearchResultsProps = {
  status: Status;
  data: SearchResponse | null;
  error: string | null;
  region: SearchRegion;
  onRegionChange: (region: SearchRegion) => void;
};

export function SearchResults({
  status,
  data,
  error,
  region,
  onRegionChange,
}: SearchResultsProps) {
  const isLoading = status === STATUS.loading;
  const isError = status === STATUS.error && error;
  const isSuccess = status === STATUS.success && data;
  const bestOffer = isSuccess ? data.best : null;
  const wishlist = isSuccess ? data.wishlist : undefined;

  return (
    <>
      {status === STATUS.idle && (
        <IdleMap region={region} onRegionChange={onRegionChange} />
      )}

      {isLoading && <SearchLoader />}

      {isError && (
        <StatusMessage kind={STATUS.error}>{error}</StatusMessage>
      )}

      {bestOffer && <BestOffer offer={bestOffer} />}
      {wishlist && <Wishlist games={wishlist} />}
      {isSuccess && <OffersTable data={data} />}
    </>
  );
}
