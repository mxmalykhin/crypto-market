'use client';

import { TOKEN_SOL } from '@/shared/constants';
import ExchangePricePreview from '@/ui/ExchangePricePreview';
import PairBreadcrumbs from '@/ui/PairBreadcrumbs';

import { useMarketContext } from '../../store';
import TradeButtons from './TradeButtons';

// assuming pairs are always TOKEN/SOL
export default function ExchangeDetails() {
  const { token } = useMarketContext((s) => s);

  return (
    <div className="w-full rounded-xl bg-tertiary-bg p-2">
      <div className="mb-2">
        <PairBreadcrumbs targetCoin={token} paymentCoin={TOKEN_SOL} />
      </div>

      <div className="mb-2">
        <ExchangePricePreview
          targetCoin={token}
          paymentCoin={TOKEN_SOL}
          fiatPrice="0.00007575"
        />
      </div>

      <TradeButtons />
    </div>
  );
}
