import { useMemo } from 'react';

import {
  STATUS,
  TEXT,
} from '&constants';
import { BestOffer } from '&containers/best-offer';
import { SearchForm } from '&containers/search-form';
import { RatingSidebar } from '&containers/rating-sidebar';
import { SearchResults } from '&containers/search-results';
import { SiteFooter } from '&containers/site-footer';
import { SiteNav } from '&containers/site-nav';

import { useCopyGameLink, useSearch } from '../../hooks';
import * as styles from './root.page.module.css';

export function RootPage() {
  const { 
    inputs: {
      setRegion,
      setQuery,
      handleSearch,
      handleReviewLangChange,
      handleReset,
    },
    outputs: {
      data,
      error,
      status,
      region,
      query,
      resetKey,
      reviewLang,
    }
  } = useSearch();

  const reviewsLoading = useMemo(() => status === STATUS.loading && data !== null, [status, data]);
  const { copied, copyGameLink } = useCopyGameLink(region);
  const bestOffer =
    status === STATUS.success && data ? data.best : null;

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
            query={query}
            region={region}
            resetKey={resetKey}
            onQueryChange={setQuery}
            onRegionChange={setRegion}
            onSubmit={handleSearch}
          />
        </section>

        {bestOffer && (
          <BestOffer
            offer={bestOffer}
            requirements={data?.requirements ?? null}
            copied={copied}
            onShare={copyGameLink}
          />
        )}

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

      <SiteFooter nav={<SiteNav />} />
    </div>
  );
}
