import { FrameTime } from '@/types/FrameTime';
import { Token, TokenMarketOverview } from '@/types/Token';

const HEADERS = {
  'x-api-key': process.env.BIRDEYE_API_KEY!,
  'x-chain': 'solana',
};

class BirdeyeApi {
  constructor() {}

  async fetchTokenOverview({
    address,
  }: {
    address: string;
  }): Promise<{ token: Token; market: TokenMarketOverview }> {
    const { data, success, message } = await fetch(
      `https://public-api.birdeye.so/defi/token_overview?address=${address}`,
      {
        headers: HEADERS,
        cache: 'no-cache',
      },
    ).then((it) => it.json());
    if (!success) {
      throw new Error('Failed to fetch token overview', { cause: message });
    }

    return {
      token: {
        name: data.name,
        symbol: data.symbol,
        address: data.address,
        logoUrl: data.logoURI,
      },
      market: {
        price: data.price,
        liquidity: data.liquidity,
        marketCap: data.mc,
        priceChangesPercent: {
          [FrameTime['30min']]: data.priceChange30mPercent.toFixed(2),
          [FrameTime['1h']]: data.priceChange1hPercent.toFixed(2),
          [FrameTime['6h']]: data.priceChange6hPercent.toFixed(2),
          [FrameTime['24h']]: data.priceChange24hPercent.toFixed(2),
        },
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOHLCV(addr: string, from: number, to: number) {}
}

export const birdeyeApi = new BirdeyeApi();
