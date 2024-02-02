'use client';

import Link from 'next/link';
import useSWR from 'swr';

import { publicRaydiumApi } from '@/shared/api/raydium';
import SolscanIcon from '@/shared/icons/SolscanIcon';
import InfoArea from '@/ui/Info/Column/Area';
import Column from '@/ui/Info/Column/Column';
import Property from '@/ui/Info/Column/Property';
import TruncatedAddress from '@/ui/TruncatedAddress';
import { PublicKey } from '@solana/web3.js';

import { useMarketContext } from './store';

export default function PairInfo() {
  const { token, pool } = useMarketContext((s) => s);
  const { id: poolId, marketId } = pool;

  const { data } = useSWR(
    [marketId, 'baseAmount', 'quoteAmount'],
    ([marketId]) => {
      return publicRaydiumApi.fetchRaydiumPoolsLiquidity({
        marketId: new PublicKey(marketId),
        poolId: new PublicKey(poolId),
      });
    },
  );

  return (
    <InfoArea
      data={[
        //TODO: format lamports, do we need decimals?
        {
          property: `Pooled ${token.symbol}`,
          value: data?.baseAmount?.uiAmountString,
        },
        { property: 'Pooled SOL', value: data?.quoteAmount?.uiAmountString },
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
