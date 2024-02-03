'use client';

import Link from 'next/link';

import SolscanIcon from '@/shared/icons/SolscanIcon';
import InfoArea from '@/ui/Info/Column/Area';
import Column from '@/ui/Info/Column/Column';
import Property from '@/ui/Info/Column/Property';
import TruncatedAddress from '@/ui/TruncatedAddress';

import { useMarketContext } from './store';

export default function PairInfo() {
  const { token, pool } = useMarketContext((s) => s);
  // eslint-disable-next-line
  const { id: poolId, marketId } = pool;

  // const { data } = useSWR(
  //   [marketId, 'baseAmount', 'quoteAmount'],
  //   ([marketId]) => {
  //     return publicRaydiumApi.fetchRaydiumPoolsLiquidity({
  //       marketId: new PublicKey(marketId),
  //       poolId: new PublicKey(poolId),
  //     });
  //   },
  // );

  return (
    <InfoArea
      data={[
        //TODO: format lamports, do we need decimals?
        {
          property: `Pooled ${token.symbol}`,
          // value: data?.baseAmount?.uiAmountString,
          value: '3478368829.57055',
        },
        {
          property: 'Pooled SOL',
          // value: data?.quoteAmount?.uiAmountString,
          value: '364.783204211',
        },
      ]}
    >
      <Column>
        <Property>{token.symbol}</Property>

        <div className="flex items-center">
          <TruncatedAddress publicKey={token.address} />

          <Link
            href="https://solscan.io"
            target="_blank"
            className="ml-1 rounded bg-secondary-bg p-1 transition-opacity hover:opacity-70"
          >
            <SolscanIcon />
          </Link>
        </div>
      </Column>

      <Column>
        <Property>Pool</Property>

        <div className="flex items-center">
          <TruncatedAddress publicKey={poolId} />

          <Link
            href="https://solscan.io"
            target="_blank"
            className="ml-1 rounded bg-secondary-bg p-1 transition-opacity hover:opacity-70"
          >
            <SolscanIcon />
          </Link>
        </div>
      </Column>
    </InfoArea>
  );
}
