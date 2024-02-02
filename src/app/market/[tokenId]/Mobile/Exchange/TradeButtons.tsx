'use client';

import { useCallback, useState } from 'react';

import { DEMO_TOKEN, TOKEN_SOL } from '@/shared/constants';
import connectWallet from '@/shared/utils/connectWallet';
import isAuthorizeTrade from '@/shared/utils/isAuthorizeTrade';
import { TradeAction } from '@/types/TradeAction';
import ConnectWalletButton from '@/ui/ConnectWalletButton';
import TradeButton from '@/ui/TradeButton';
import TradeModal from '@/widgets/Trade/Modal';

import { useMarketContext } from '../../store';

export default function TradeButtons() {
  const { token } = useMarketContext((s) => s);

  const [isOpen, setOpen] = useState(false);
  const [tradeAction, setTradeAction] = useState(TradeAction.BUY);
  const authorizedTrade = isAuthorizeTrade();

  const handleSellButton = useCallback(() => {
    setOpen(true);
    setTradeAction(TradeAction.SELL);
  }, []);

  const handleBuyButton = useCallback(() => {
    setOpen(true);
    setTradeAction(TradeAction.BUY);
  }, []);

  const handleOpenChange = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const handleSwitch = useCallback(() => {
    setTradeAction(
      tradeAction === TradeAction.BUY ? TradeAction.SELL : TradeAction.BUY,
    );
  }, [tradeAction]);

  const handleConnectWallet = useCallback(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex">
      {authorizedTrade ? (
        <>
          <TradeButton
            action={TradeAction.BUY}
            symbol={token.symbol}
            onClick={handleBuyButton}
          />

          <TradeButton
            action={TradeAction.SELL}
            symbol={token.symbol}
            onClick={handleSellButton}
          />
        </>
      ) : (
        <ConnectWalletButton onClick={handleConnectWallet} />
      )}

      <TradeModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        targetToken={DEMO_TOKEN}
        paymentToken={TOKEN_SOL}
        tradeAction={tradeAction}
        onSwitch={handleSwitch}
      />
    </div>
  );
}
