import { useCallback, useEffect, useRef, useState } from "react";

import { searchGames, SearchResponse } from "&network";
import { DEFAULT_REVIEW_LANG, DEFAULT_SEARCH_REGION, isSearchRegion, ReviewLang, SearchRegion, STATUS, Status, TEXT } from "&constants";

type SearchContext = {
    query: string;
    steam?: string;
  };

function regionFromUrl(params: URLSearchParams): SearchRegion {
    const region = params.get("region")?.trim().toLowerCase();
    return region && isSearchRegion(region) ? region : DEFAULT_SEARCH_REGION;
}

export const useSearch = () => {
    const [resetKey, setResetKey] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<Status>(STATUS.idle);
    const [data, setData] = useState<SearchResponse | null>(null);
    const [region, setRegion] = useState<SearchRegion>(() =>
        regionFromUrl(new URLSearchParams(window.location.search)),
    );
    const [reviewLang, setReviewLang] = useState<ReviewLang>(DEFAULT_REVIEW_LANG);
    const [searchContext, setSearchContext] = useState<SearchContext | null>(null);
    const [query, setQuery] = useState(
        () => new URLSearchParams(window.location.search).get("game")?.trim() ?? '',
    );
    const startedFromUrl = useRef(false);

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

    useEffect(() => {
        if (startedFromUrl.current) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const game = params.get("game")?.trim();
        const hasRegion = Boolean(params.get("region")?.trim());
        if (!game && !hasRegion) {
            return;
        }

        startedFromUrl.current = true;
        const regionFromQuery = regionFromUrl(params);
        setRegion(regionFromQuery);
        if (!game) {
            return;
        }

        setQuery(game);
        executeSearch(game, regionFromQuery, undefined, DEFAULT_REVIEW_LANG);
    }, [executeSearch]);

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

    function handleReset() {
        if (status === STATUS.loading) {
          return;
        }

        setStatus(STATUS.idle);
        setData(null);
        setError(null);
        setSearchContext(null);
        setRegion(DEFAULT_SEARCH_REGION);
        setReviewLang(DEFAULT_REVIEW_LANG);
        setQuery("");
        setResetKey((key) => key + 1);
    }

    return {
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
    }
};