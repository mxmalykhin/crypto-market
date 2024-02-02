import { birdeyeApi } from '@/shared/api/birdeye';
import { privateRaydiumApi } from '@/shared/api/raydium';
import { TOKEN_WSOL_ADDRESS } from '@/shared/constants';
import { PublicKey } from '@solana/web3.js';

import ClientMarketTokenPage from './ClientMarketTokenPage';

type TMarketTokenPageData = {
  params: {
    tokenId: string;
  };
};

export default async function MarketTokenPageServer({
  params,
}: TMarketTokenPageData) {
  const { tokenId } = params;

  const { token, market } = await birdeyeApi.fetchTokenOverview({
    address: tokenId,
  });

  const { poolId, marketId } = await privateRaydiumApi.findRaydiumPool(
    new PublicKey(token.address),
    TOKEN_WSOL_ADDRESS,
  );

  return (
    <ClientMarketTokenPage
      token={token}
      market={market}
      pool={{ id: poolId.toString(), marketId: marketId.toString() }}
    />
  );
}
