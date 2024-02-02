'use client';

import { formatPrice } from '@/shared/format';
import { FrameTime } from '@/types/FrameTime';
import Footer from '@/ui/Footer';
import Header from '@/ui/Header';
import DynamicPercents from '@/ui/Info/DynamicPercents';
import TetraArea from '@/ui/Info/Tetrahedral/Area';
import LastTransactions from '@/ui/LastTransactions';

import LaunchChart from '../Chart';
import PairInfo from '../PairInfo';
import { useMarketContext } from '../store';
import ExchangeDetails from './Exchange';

export default async function MobileMarketTokenPage() {
  const { market } = useMarketContext((s) => s);

  return (
    <div>
      <div className="flex h-screen flex-col overflow-auto">
        <Header />

        <div className="relative mb-2 flex h-full flex-col">
          <div className="z-5 relative flex grow flex-col items-end justify-center rounded-2xl bg-secondary-bg">
            {/* <SeriesTypes /> */}
            <LaunchChart />
          </div>

          <div className="absolute bottom-2 left-2 right-2 z-10">
            <ExchangeDetails />
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-2">
          <PairInfo />
        </div>

        <div className="mb-2">
          <TetraArea
            data={[
              {
                property: 'Liquidity',
                value: formatPrice(market.liquidity),
              },
              {
                property: 'Market Cap',
                value: formatPrice(market.marketCap),
              },
            ]}
          >
            <DynamicPercents
              frameTime={FrameTime['30min']}
              value={market.priceChangesPercent[FrameTime['30min']]}
            />
            <DynamicPercents
              frameTime={FrameTime['1h']}
              value={market.priceChangesPercent[FrameTime['1h']]}
            />
            <DynamicPercents
              frameTime={FrameTime['6h']}
              value={market.priceChangesPercent[FrameTime['6h']]}
            />
            <DynamicPercents
              frameTime={FrameTime['24h']}
              value={market.priceChangesPercent[FrameTime['24h']]}
            />
          </TetraArea>
        </div>

        <LastTransactions />
      </div>

      <Footer />
    </div>
  );
}
