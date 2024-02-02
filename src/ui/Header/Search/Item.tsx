import Link from 'next/link';

import { TOKEN_SOL } from '@/shared/constants';
import { Token } from '@/types/Token';
import ExchangePricePreview from '@/ui/ExchangePricePreview';
import TetraArea from '@/ui/Info/Tetrahedral/Area';
import PairBreadcrumbs from '@/ui/PairBreadcrumbs';

type TItemProps = {
  token: Token;
};

export default function Item(props: TItemProps) {
  const { token } = props;
  // const {} = token;

  return (
    <Link href={`/market/${token.address}`}>
      <TetraArea
        data={[
          {
            property: 'Liquidity',
            // value: formatPrice(market.liquidity),
            value: '$23.66K',
          },
          {
            property: 'Market Cap',
            // value: formatPrice(market.marketCap),
            value: '$75.95M',
          },
          { property: 'Fully Diluted Valuation', value: '$75.95M' },
          { property: '24h Volume', value: '$2.32M' },
        ]}
      >
        <div className="flex w-full flex-col">
          <div className="mb-3">
            <PairBreadcrumbs targetCoin={token} paymentCoin={TOKEN_SOL} />
          </div>

          <ExchangePricePreview
            targetCoin={token}
            paymentCoin={TOKEN_SOL}
            fiatPrice="0.00007575"
          />
        </div>
      </TetraArea>
    </Link>
  );
}
