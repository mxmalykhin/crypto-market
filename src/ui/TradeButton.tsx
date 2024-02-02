import { cn } from '@/shared/styles';
import connectWallet from '@/shared/utils/connectWallet';
import isAuthorizeTrade from '@/shared/utils/isAuthorizeTrade';
import { TradeAction } from '@/types/TradeAction';

import ConnectWalletButton from './ConnectWalletButton';

type TTradeButtonProps = {
  action: TradeAction;
  symbol?: string;
  onClick?: () => void;
};

function getText(action: TradeAction) {
  switch (action) {
    case TradeAction.BUY:
      return 'Buy';
    case TradeAction.SELL:
      return 'Sell';
  }
}

export default function TradeButton({
  action,
  symbol,
  onClick,
}: TTradeButtonProps) {
  const name = getText(action);
  const authorizedTrade = isAuthorizeTrade();

  const handleConnectWallet = () => {
    connectWallet();
  };

  if (!authorizedTrade) {
    return <ConnectWalletButton onClick={handleConnectWallet} />;
  }

  return (
    <button
      className={cn(
        'mr-1 grow rounded-lg p-3 text-center leading-none transition-opacity last:mr-0 hover:opacity-70',
        {
          'bg-red-bg': action === TradeAction.SELL,
          'bg-green': action === TradeAction.BUY,
        },
      )}
      onClick={onClick}
    >
      {name} {symbol}
    </button>
  );
}
