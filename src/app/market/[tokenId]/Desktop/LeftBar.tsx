'use client';

import { DEMO_TOKEN, TOKEN_SOL } from '@/shared/constants';
import { formatPrice } from '@/shared/format';
import { FrameTime } from '@/types/FrameTime';
import ExchangePricePreview from '@/ui/ExchangePricePreview';
import DynamicPercents from '@/ui/Info/DynamicPercents';
import TetraArea from '@/ui/Info/Tetrahedral/Area';
import PairBreadcrumbs from '@/ui/PairBreadcrumbs';

import PairInfo from '../PairInfo';
import { useMarketContext } from '../store';

export default function LeftBar() {
  const { market } = useMarketContext((s) => s);

  return (
    <>
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
          <div className="flex flex-col">
            <div>
              <div className="mb-2 md:mb-3">
                <PairBreadcrumbs
                  targetCoin={DEMO_TOKEN}
                  paymentCoin={TOKEN_SOL}
                />
              </div>

              <div className="mb-2 md:mb-2">
                <ExchangePricePreview
                  targetCoin={DEMO_TOKEN}
                  paymentCoin={TOKEN_SOL}
                  fiatPrice="0.00007575"
                />
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </TetraArea>
      </div>

      <div>
        <PairInfo />
      </div>
    </>
  );
}
