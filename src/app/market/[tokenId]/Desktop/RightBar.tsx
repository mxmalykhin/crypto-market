'use client';

import { useCallback, useState } from 'react';

import { DEMO_TOKEN, TOKEN_SOL } from '@/shared/constants';
import { TradeAction } from '@/types/TradeAction';
import LastTransactions from '@/ui/LastTransactions';
import Trade from '@/widgets/Trade/Trade';

export default function RightBar() {
  const [currentTradeAction, setCurrentTradeAction] = useState<TradeAction>(
    TradeAction.BUY,
  );

  const handleSwitchTradeAction = useCallback(() => {
    setCurrentTradeAction(
      currentTradeAction === TradeAction.BUY
        ? TradeAction.SELL
        : TradeAction.BUY,
    );
  }, [currentTradeAction]);

  return (
    <>
      <div className="mb-2 flex flex-col rounded-2xl border border-[#161616] bg-[#0A0A0A] p-[0.9375rem]">
        <Trade
          tradeAction={currentTradeAction}
          targetToken={DEMO_TOKEN}
          paymentToken={TOKEN_SOL}
          onSwitch={handleSwitchTradeAction}
        />
      </div>

      <LastTransactions />
    </>
  );
}
