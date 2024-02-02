'use client';

import { debounce } from 'lodash';
import { useCallback, useRef } from 'react';
import useSWRMutation from 'swr/mutation';

import { DEMO_TOKEN, TOKEN_SOL } from '@/shared/constants';

import { useSearchContext } from '../store';

const DEBOUNCE_SEARCH_TIME = 500;
const DEBOUNCE_SEARCH_EMPTY_TIME = 700;

type TUseSearchArgs = {
  autoClose?: boolean;
};

export default function useSearch({ autoClose }: TUseSearchArgs = {}) {
  const {
    setSearchValue,
    setOpen,
    setSearchTyping,
    setSearchFetching,
    setSearchResults,
    reset,
  } = useSearchContext((s) => s);

  const { trigger: runSearch } = useSWRMutation(
    'https://fakestoreapi.com/users',
    (url, { arg }) =>
      fetch(`${url}?search=${arg}`, {
        signal: abortControllerRef.current.signal,
      }),
    {
      onSuccess: () => {
        const res = [
          DEMO_TOKEN,
          TOKEN_SOL,
          DEMO_TOKEN,
          TOKEN_SOL,
          DEMO_TOKEN,
          TOKEN_SOL,
          DEMO_TOKEN,
          TOKEN_SOL,
        ];

        setSearchResults(res);
        setSearchFetching(false);
      },
      onError: () => {
        setSearchResults([]);
        setSearchFetching(false);
      },
    },
  );

  const delayedCloseRef = useRef<ReturnType<typeof debounce>>();
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const debounceCloseSearch = useCallback(
    debounce(() => {
      reset();
      if (autoClose) setOpen(false);
    }, DEBOUNCE_SEARCH_EMPTY_TIME),
    [autoClose],
  );

  const debounceChangeSearch = useCallback(
    debounce((search) => {
      setSearchValue(search);
      setSearchTyping(false);

      if (search.length >= 1) {
        setSearchFetching(true);
        runSearch(search);
      }

      if (autoClose && !search) {
        delayedCloseRef.current = debounceCloseSearch;
        delayedCloseRef.current();
      }
    }, DEBOUNCE_SEARCH_TIME),
    [setSearchValue, setSearchTyping],
  );

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Abort previous request
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      // Cancel delayed close
      if (delayedCloseRef.current) {
        delayedCloseRef.current.cancel();
      }

      setSearchFetching(false);
      setSearchTyping(true);

      const search = e.target.value;

      if (autoClose) {
        if (search) {
          debounceChangeSearch(search);
        } else {
          debounceChangeSearch.cancel();
          delayedCloseRef.current = debounceCloseSearch;
          delayedCloseRef.current();
        }
      } else {
        debounceChangeSearch(search);
      }
    },
    [
      autoClose,
      debounceChangeSearch,
      debounceCloseSearch,
      setSearchFetching,
      setSearchTyping,
    ],
  );

  return { onChangeSearch: handleChangeSearch };
}
