import { PaymentToken, TargetToken } from '@/types/Token';

import CoinCircleImage from './CoinCircleImage';
import CopyButton from './CopyButton';

type TPairBreadcrumbsProps = {
  targetCoin: TargetToken;
  paymentCoin: PaymentToken;
};

export default function PairBreadcrumbs({
  targetCoin,
  paymentCoin,
}: TPairBreadcrumbsProps) {
  return (
    <div className="flex justify-between text-xs">
      <div className="flex items-center">
        <div className="mr-2 flex">
          <div className="mr-0.5">
            <CoinCircleImage
              symbol={targetCoin.symbol}
              logoUrl={targetCoin.logoUrl}
              size={24}
            />
          </div>

          <div>
            <CoinCircleImage
              symbol={paymentCoin.symbol}
              logoUrl={paymentCoin.logoUrl}
              size={24}
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex">
            <span className="mr-1">{targetCoin.symbol}</span>
            <CopyButton value={targetCoin.symbol} />
          </div>

          <div className="mx-1">/</div>

          <div>{paymentCoin.symbol}</div>
        </div>
      </div>

      {/* <div className="flex items-center"> */}
      {/* TODO: Add modal */}
      {/* FIXME: Add modal */}
      {/* <SwapIcon className="cursor-pointer transition-opacity hover:opacity-70" /> */}
      {/* </div> */}
    </div>
  );
}
