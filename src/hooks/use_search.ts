import { useCallback, useState } from "react";

import { searchGames, SearchResponse } from "&network";
import { DEFAULT_REVIEW_LANG, DEFAULT_SEARCH_REGION, ReviewLang, SearchRegion, STATUS, Status, TEXT } from "&constants";

type SearchContext = {
    query: string;
    steam?: string;
  };

export const useSearch = () => {
    const [resetKey, setResetKey] = useState<number>(0);
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

    return {
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
    }
};