import { useMemo } from 'react';

import {
  STATUS,
  TEXT,
} from '&constants';
import { SearchForm } from '&containers/search-form';
import { RatingSidebar } from '&containers/rating-sidebar';
import { SearchResults } from '&containers/search-results';
import { SiteFooter } from '&containers/site-footer';
import { SiteNav } from '&containers/site-nav';

import { useSearch } from '../../hooks';
import * as styles from './root.page.module.css';

export function RootPage() {
  const { 
    inputs: {
      setRegion,
      handleSearch,
      handleReviewLangChange,
      handleReset,
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
    <div className={styles.layout}>
      <main className={styles.page}>
      <section className={styles.main} aria-labelledby="app-title">
        <header className={styles.header}>
          <p className={styles.kicker}>{TEXT.brand}</p>
          <h1 id="app-title" className={styles.title}>
            {TEXT.title}
          </h1>
          <SiteNav className={styles.siteNav} />
        </header>

        <section className={styles.searchSection} aria-labelledby="search-heading">
          <h2 id="search-heading" className={styles.sectionHeading}>
            {TEXT.searchFormHeading}
          </h2>
          <SearchForm
            disabled={status === STATUS.loading}
            region={region}
            resetKey={resetKey}
            onRegionChange={setRegion}
            onSubmit={handleSearch}
          />
        </section>

        <SearchResults
          status={status}
          data={data}
          error={error}
          region={region}
          onRegionChange={setRegion}
          onReset={handleReset}
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

      <SiteFooter />
    </div>
  );
}
