import { useState } from 'react';

import { searchGames } from './api/search.ts';
import type { SearchResponse } from './api/search.types.ts';
import { DEFAULT_SEARCH_REGION, type SearchRegion } from './constants/regions.ts';
import { STATUS, type Status } from './constants/status.ts';
import { TEXT } from './constants/text.ts';
import { BestOffer } from './ui/best-offer/best-offer.tsx';
import { IdleMap } from './ui/idle-map/idle-map.tsx';
import { OffersTable } from './ui/offers-table/offers-table.tsx';
import { SearchForm } from './ui/search-form/search-form.tsx';
import { SearchLoader } from './ui/search-loader/search-loader.tsx';
import { StatusMessage } from './ui/status-message/status-message.tsx';
import { Wishlist } from './ui/wishlist/wishlist.tsx';
import * as styles from './App.module.css';

function App() {
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [region, setRegion] = useState<SearchRegion>(DEFAULT_SEARCH_REGION);

  async function handleSearch(query: string, region: string, steam?: string) {
    setStatus(STATUS.loading);
    setError(null);
    setData(null);

    try {
      const result = await searchGames(query, region, steam);
      setData(result);
      setStatus(STATUS.success);
      setResetKey((key) => key + 1);
    } catch (cause) {
      setStatus(STATUS.error);
      setError(cause instanceof Error ? cause.message : TEXT.searchFailed);
    }
  }

  const isLoading = status === STATUS.loading;
  const isError = status === STATUS.error && error;
  const isSuccess = status === STATUS.success && data;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.kicker}>{TEXT.brand}</p>
          <h1 className={styles.title}>{TEXT.title}</h1>
        </header>

        <SearchForm
          disabled={status === STATUS.loading}
          region={region}
          resetKey={resetKey}
          onRegionChange={setRegion}
          onSubmit={handleSearch}
        />

        {status === STATUS.idle && (
          <IdleMap region={region} onRegionChange={setRegion} />
        )}

        {isLoading && <SearchLoader />}

        {isError && (
          <StatusMessage kind={STATUS.error}>{error}</StatusMessage>
        )}

        {isSuccess && data?.best && <BestOffer offer={data.best} />}
        {isSuccess && data?.wishlist && <Wishlist games={data.wishlist} />}
        {isSuccess && data && <OffersTable data={data} />}
      </section>
    </main>
  );
}

export default App;
