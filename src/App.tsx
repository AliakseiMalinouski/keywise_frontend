import { useCallback, useState } from 'react';

import { searchGames, type SearchResponse } from '&network';
import {
  DEFAULT_REVIEW_LANG,
  DEFAULT_SEARCH_REGION,
  STATUS,
  TEXT,
  type ReviewLang,
  type SearchRegion,
  type Status,
} from '&constants';
import { RatingSidebar } from '&containers/rating-sidebar';
import { SearchForm } from '&containers/search-form';
import { SearchResults } from '&containers/search-results';

import * as styles from './App.module.css';

type SearchContext = {
  query: string;
  steam?: string;
};

function App() {
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [region, setRegion] = useState<SearchRegion>(DEFAULT_SEARCH_REGION);
  const [reviewLang, setReviewLang] = useState<ReviewLang>(DEFAULT_REVIEW_LANG);
  const [searchContext, setSearchContext] = useState<SearchContext | null>(null);

  const executeSearch = useCallback(
    async (
      query: string,
      nextRegion: SearchRegion,
      steam?: string,
      nextReviewLang: ReviewLang = reviewLang,
      options: { preserveData?: boolean } = {},
    ) => {
      setStatus(STATUS.loading);
      setError(null);
      if (!options.preserveData) {
        setData(null);
      }

      try {
        const result = await searchGames(query, nextRegion, steam, nextReviewLang);
        setData(result);
        setSearchContext({ query, steam: steam?.trim() || undefined });
        setStatus(STATUS.success);
        if (!options.preserveData) {
          setResetKey((key) => key + 1);
        }
      } catch (cause) {
        if (options.preserveData) {
          setStatus(STATUS.success);
          return;
        }

        setStatus(STATUS.error);
        setError(cause instanceof Error ? cause.message : TEXT.searchFailed);
      }
    },
    [reviewLang],
  );

  async function handleSearch(query: string, nextRegion: string, steam?: string) {
    await executeSearch(query, nextRegion as SearchRegion, steam, reviewLang);
  }

  function handleReviewLangChange(nextReviewLang: ReviewLang) {
    setReviewLang(nextReviewLang);
    if (!searchContext || status === STATUS.loading) {
      return;
    }

    void executeSearch(
      searchContext.query,
      region,
      searchContext.steam,
      nextReviewLang,
      { preserveData: true },
    );
  }

  const reviewsLoading = status === STATUS.loading && data !== null;

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
