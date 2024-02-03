import HelpCircle from '@/shared/icons/HelpCircle';
import { CurrencySymbol } from '@/types/CurrencySymbol';
import { PaymentToken, TargetToken } from '@/types/Token';
import Badge from '@/ui/Badge';
// import { Tooltip } from '@nextui-org/react';

type TExchangePricePreviewProps = {
  targetCoin: TargetToken;
  paymentCoin: PaymentToken;
  fiatPrice: string;
  fiatSymbol?: CurrencySymbol; // default: CurrencySymbol['$']
};

export default function ExchangePricePreview({
  fiatSymbol,
  fiatPrice,
  paymentCoin,
  targetCoin,
}: Readonly<TExchangePricePreviewProps>) {
  return (
    <div className="flex w-full flex-col rounded-lg bg-secondary-bg p-3 md:p-4">
      <div className="flex items-center text-xs text-secondary-text">
        <span className="mr-1">
          {targetCoin.name} Price ({targetCoin.symbol})
        </span>

        {/* FIXME: set dynamic content */}
        {/* <Tooltip showArrow content="I am a tooltip" size="sm"> */}
        <HelpCircle />
        {/* </Tooltip> */}
      </div>

      <div className="mt-2">
        <div className="mb-0.5 flex items-center">
          <div className="mr-2 text-lg leading-none md:text-xl">
            666 {paymentCoin.name}
          </div>

          <div className="flex">
            <Badge>3.21k%</Badge>
          </div>
        </div>

        <div className="text-xs text-secondary-text">
          {fiatSymbol ?? CurrencySymbol['$']}
          {fiatPrice}
        </div>
      </div>
    </div>
  );
}
