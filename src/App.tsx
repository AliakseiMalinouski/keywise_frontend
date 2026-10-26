import { useState } from 'react';

import { searchGames, type SearchResponse } from '&network';
import {
  DEFAULT_SEARCH_REGION,
  STATUS,
  TEXT,
  type SearchRegion,
  type Status,
} from '&constants';
import { RatingSidebar } from '&containers/rating-sidebar';
import { SearchForm } from '&containers/search-form';
import { SearchResults } from '&containers/search-results';

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

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.main}>
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

          <SearchResults
            status={status}
            data={data}
            error={error}
            region={region}
            onRegionChange={setRegion}
          />
        </section>

        <RatingSidebar rating={data?.rating ?? null} status={status} />
      </div>
    </main>
  );
}

export default App;
