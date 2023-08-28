import { SearchResponse } from '@algolia/client-search';
import { Fleet, WithId } from '@appjusto/types';
import { debounce } from 'lodash';
import React, { useCallback } from 'react';
import { useContextApi } from '../ApiContext';

export const useSearchFleets = (search?: string) => {
  // context
  const api = useContextApi();
  // state
  const [response, setResponse] = React.useState<SearchResponse<Fleet>>();
  const [fleets, setFleets] = React.useState<WithId<Fleet>[]>();
  const [isLoading, setLoading] = React.useState(false);
  // side effects
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce<(input: string, page?: number) => void>(async (input, page) => {
      setLoading(true);
      setResponse(await api.search().searchFleets(input, page));
      setLoading(false);
    }, 500),
    []
  );
  // debounce search when search input changes
  React.useEffect(() => {
    if (search === undefined) return;
    debouncedSearch(search);
  }, [debouncedSearch, search]);
  // update results when response changes
  React.useEffect(() => {
    if (!response) return;
    const hits = response.hits.map((r) => ({ ...r, id: r.objectID }) as WithId<Fleet>);
    if (response.page === 0) setFleets(hits);
    else setFleets([...(fleets ?? []), ...hits]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  // result
  const fetchNextPage = React.useCallback(() => {
    if (search === undefined) return;
    if (!response) return;
    const hasNextPage = response.page + 1 < response.nbPages;
    if (hasNextPage) debouncedSearch(search, response.page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, response]);
  const refetch = React.useCallback(() => {
    if (isLoading) return;
    setFleets([]);
    debouncedSearch(search ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isLoading]);
  return { fleets, isLoading, refetch, fetchNextPage };
};
