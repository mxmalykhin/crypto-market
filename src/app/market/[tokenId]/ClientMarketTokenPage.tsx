'use client';

import { useRef } from 'react';

import { Token, TokenMarketOverview } from '@/types/Token';

import DesktopMarketTokenPage from './Desktop';
import MobileMarketTokenPage from './Mobile';
import { MarketContext, createMarketStore } from './store';

type TClientMarketTokenPageProps = {
  token: Token;
  market: TokenMarketOverview;
  pool: { id: string; marketId: string };
};

export default function ClientMarketTokenPage(
  props: React.PropsWithChildren<TClientMarketTokenPageProps>,
) {
  const { token, market, pool } = props;
  const { id: poolId, marketId } = pool;

  const store = useRef(
    createMarketStore({
      token,
      market,
      pool: {
        id: poolId,
        marketId,
      },
    }),
  ).current;

  return (
    <MarketContext.Provider value={store}>
      <div className="md:hidden">
        <MobileMarketTokenPage />
      </div>

      <div className={'hidden md:flex'}>
        <DesktopMarketTokenPage />
      </div>
    </MarketContext.Provider>
  );
}
