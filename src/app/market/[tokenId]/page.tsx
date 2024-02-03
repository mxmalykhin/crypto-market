import ClientMarketTokenPage from './ClientMarketTokenPage';

type TMarketTokenPageData = {
  params: {
    tokenId: string;
  };
};

const demoTokenOverview = {
  token: {
    name: 'Bonk',
    symbol: 'Bonk',
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    logoUrl:
      'https://img.fotofolio.xyz/?url=https%3A%2F%2Farweave.net%2FhQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I',
  },
  market: {
    price: 0.000010584534732127663,
    liquidity: 20401917.170172162,
    marketCap: 981678974.0732346,
    priceChangesPercent: {
      30: -0.26,
      60: -0.83,
      360: 0.03,
      1440: -2.47,
    },
  },
};

const demoFetchedPool = {
  poolId: 'HVNwzt7Pxfu76KHCMQPTLuTCLTm6WnQ1esLv4eizseSv',
  marketId: 'Hs97TCZeuYiJxooo3U73qEHXg3dKpRL4uYKYRryEK9CF',
};

export default async function MarketTokenPageServer({
  params,
}: TMarketTokenPageData) {
  // eslint-disable-next-line
  const { tokenId } = params;

  // const { token, market } = await birdeyeApi.fetchTokenOverview({
  //   address: tokenId,
  // });
  const { token, market } = demoTokenOverview;

  // const { poolId, marketId } = await privateRaydiumApi.findRaydiumPool(
  //   new PublicKey(token.address),
  //   TOKEN_WSOL_ADDRESS,
  // );
  const { poolId, marketId } = demoFetchedPool;

  return (
    <ClientMarketTokenPage
      token={token}
      market={market}
      pool={{ id: poolId.toString(), marketId: marketId.toString() }}
    />
  );
}
