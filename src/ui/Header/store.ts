'use client';

import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

import { Token } from '@/types/Token';

interface SearchProps {
  search: string;
  searchResults: Token[];
  searchTyping: boolean;
  searchFetching: boolean;
  isOpen: boolean;
}

interface SearchState extends SearchProps {
  setSearchValue: (value: string) => void;
  toggleOpen: () => void;
  setOpen: (nextOpen: boolean) => void;
  setSearchTyping: (searchTyping: boolean) => void;
  setSearchFetching: (searchFetching: boolean) => void;
  setSearchResults: (searchResults: Token[]) => void;
  reset: () => void;
}

type SearchStore = ReturnType<typeof createSearchStore>;

export const createSearchStore = (initProps?: Partial<SearchProps>) => {
  const DEFAULT_PROPS: SearchProps = {
    search: '',
    searchResults: [],
    isOpen: false,
    searchTyping: false,
    searchFetching: false,
  };

  const store = createStore<SearchState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setSearchValue: (search) => set({ search }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (isOpen) => set({ isOpen }),
    setSearchFetching: (searchFetching: boolean) => set({ searchFetching }),
    setSearchTyping: (searchTyping: boolean) => set({ searchTyping }),
    setSearchResults: (searchResults) => set({ searchResults }),
    reset: () => set(DEFAULT_PROPS),
  }));

  let _previousIsOpen = DEFAULT_PROPS.isOpen;
  let _lastScrollPosition = 0;

  store.subscribe((state) => {
    const currentIsOpen = state.isOpen;

    if (currentIsOpen !== _previousIsOpen) {
      if (currentIsOpen) {
        _lastScrollPosition = window.scrollY;
      } else {
        setTimeout(() => window.scrollTo(0, _lastScrollPosition), 0);
      }

      _previousIsOpen = currentIsOpen;
    }
  });

  return store;
};

export const SearchContext = createContext<SearchStore | null>(null);

export function useSearchContext<T>(selector: (state: SearchState) => T): T {
  const store = useContext(SearchContext);
  if (!store) throw new Error('Missing Context.Provider in the tree');

  return useStore(store, selector);
}
