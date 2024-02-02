'use client';

import Link from 'next/link';
import { useCallback } from 'react';

import HelpCircle from '@/shared/icons/HelpCircle';
import SwapIcon from '@/shared/icons/SwapIcon';
import { PaymentToken, TargetToken } from '@/types/Token';
import { TradeAction } from '@/types/TradeAction';
import { Tooltip } from '@nextui-org/react';

import Badge from '../../ui/Badge';
import TradeButton from '../../ui/TradeButton';
import Token from './Token';

type TTradeProps = {
  tradeAction: TradeAction;
  targetToken: TargetToken;
  paymentToken: PaymentToken;
  onSwitch?: () => void;
};

export default function Trade(props: TTradeProps) {
  const { tradeAction, targetToken, paymentToken, onSwitch } = props;

  const handleHalf = useCallback(() => {
    alert('set half');
  }, []);

  const handleMax = useCallback(() => {
    alert('set max');
  }, []);

  return (
    <div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-secondary-text">
          <div>You're selling</div>

          <div className="flex items-center">
            <div className="mr-1">
              55122
              {tradeAction === TradeAction.BUY
                ? paymentToken.symbol
                : targetToken.symbol}
            </div>

            <div className="flex">
              <div className="mr-1">
                <Badge color="bg-secondary-bg" onClick={handleHalf}>
                  Half
                </Badge>
              </div>

              <div className="mr-1 last:mr-0">
                <Badge color="bg-secondary-bg" onClick={handleMax}>
                  Max
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          {tradeAction === TradeAction.BUY ? (
            <Token
              token={paymentToken}
              amount={512251.51}
              dollars={1250.1}
              editable
            />
          ) : (
            <Token
              token={targetToken}
              amount={512251.51}
              dollars={1250.1}
              editable
            />
          )}
        </div>

        <div className="relative my-3 flex select-none items-center justify-center">
          <div className="z-5 absolute left-0 right-0 top-1/2 h-px bg-[#161616]" />
          <div
            className="z-10 inline-flex h-[1.625rem] w-[1.625rem] cursor-pointer select-none items-center justify-center rounded-full border border-[#232323] bg-[#161616] transition-opacity hover:opacity-70"
            onClick={onSwitch}
          >
            <SwapIcon className="rotate-90" />
          </div>
        </div>

        <div className="mb-1 flex items-center justify-between text-xs text-secondary-text">
          <div>You're buying</div>
        </div>

        <div className="mb-4">
          {tradeAction === TradeAction.BUY ? (
            <Token token={targetToken} amount={512251.51} dollars={1250.1} />
          ) : (
            <Token token={paymentToken} amount={512251.51} dollars={1250.1} />
          )}
        </div>

        <div className="mb-4 text-sm text-secondary-text">
          <div className="mb-1">
            Platform fee: <span className="text-green">0.1%</span>
          </div>

          {/* FIXME: set dynamic content in tooltip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-1">Slippage Tolerance</span>

              <Tooltip showArrow content="I am a tooltip" size="sm">
                <div>
                  <HelpCircle className="text-secondary-text" />
                </div>
              </Tooltip>
            </div>

            <div className="rounded bg-secondary-bg px-3 py-1 text-xs text-white">
              1%
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-[#0F0F0F] p-3 text-[0.625rem] text-secondary-text">
          CryptoMarkets aggregates and checks the entire Solana network for
          available on-chain liquidity. If there is insufficient liquidity
          on-chain when the market price reaches your limit prices, your order
          may not be filled exactly as specified.{' '}
          <Link href="/" className="underline">
            Learn more
          </Link>
        </div>

        <div className="flex">
          <TradeButton action={tradeAction} symbol={targetToken.symbol} />
        </div>
      </div>
    </div>
  );
}
