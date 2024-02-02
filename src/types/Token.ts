import { FrameTime } from './FrameTime';

export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly address: string;
  readonly logoUrl?: string | null;
}

export interface PaymentToken extends Token {}
export interface TargetToken extends Token {}

export type AnyToken = PaymentToken | TargetToken;

export interface TokenAmount {
  readonly token: Token;
  readonly amount: string;
}

export interface TokenMarketOverview {
  readonly price: number;
  readonly liquidity: number;
  readonly marketCap: number;
  readonly priceChangesPercent: {
    [key in FrameTime]: number;
  };
}
