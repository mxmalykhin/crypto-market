'use client';

import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';

import { Token, TokenMarketOverview } from '@/types/Token';

interface MarketProps {
  token: Token;
  market: TokenMarketOverview;
  pool: { id: string; marketId: string };
}

interface MarketState extends MarketProps {
  setToken: (token: Token) => void;
  reset: () => void;
}

type MarketStore = ReturnType<typeof createMarketStore>;

export const createMarketStore = (initProps: MarketProps) => {
  const DEFAULT_PROPS: Partial<MarketProps> = {
    // token: null,
    // market: null,
    // pool: null,
  };

  const initStoreData = {
    ...DEFAULT_PROPS,
    ...initProps,
  };

  const store = createStore<MarketState>()((set) => ({
    ...initStoreData,
    setToken: (token) => set({ token }),
    reset: () => set(initStoreData),
  }));

  return store;
};

export const MarketContext = createContext<MarketStore | null>(null);

export function useMarketContext<T>(selector: (state: MarketState) => T): T {
  const store = useContext(MarketContext);
  if (!store) throw new Error('Missing Context.Provider in the tree');

  return useStore(store, selector);
}
