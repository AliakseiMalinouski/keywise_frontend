import { useMemo } from 'react';

import {
  STATUS,
  TEXT,
} from '&constants';
import { SearchForm } from '&containers/search-form';
import { RatingSidebar } from '&containers/rating-sidebar';
import { SearchResults } from '&containers/search-results';

import { useSearch } from './hooks';
import * as styles from './App.module.css';

function App() {
  const { 
    inputs: {
      setRegion,
      handleSearch,
      handleReviewLangChange,
    },
    outputs: {
      data,
      error,
      status,
      region,
      resetKey,
      reviewLang,
    }
  } = useSearch();

  const reviewsLoading = useMemo(() => status === STATUS.loading && data !== null, [status, data]);

  return (
    <main className={styles.page}>
      <section className={styles.main} aria-labelledby="app-title">
        <header className={styles.header}>
          <p className={styles.kicker}>{TEXT.brand}</p>
          <h1 id="app-title" className={styles.title}>
            {TEXT.title}
          </h1>
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

      <RatingSidebar
        hasSearchData={data !== null}
        image={data?.image}
        rating={data?.rating ?? null}
        reviewLang={reviewLang}
        reviewsLoading={reviewsLoading}
        status={status}
        onReviewLangChange={handleReviewLangChange}
      />
    </main>
  );
}

export default App;
