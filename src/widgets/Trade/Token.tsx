'use client';

import { useCallback, useRef } from 'react';

import { AnyToken } from '@/types/Token';

import CoinCircleImage from '../../ui/CoinCircleImage';
import TokenAmountInput, { TTokenAmountInputRef } from './TokenAmountInput';

type TTokenProps = {
  token: AnyToken;
  amount: number;
  dollars: number;
  editable?: boolean;
};

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

export default function Token(props: TTokenProps) {
  const { token, amount, dollars, editable = false } = props;

  const tokenInputAmount = useRef<TTokenAmountInputRef>(null);

  const handleFocusInput = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      assertIsNode(e.target);
      if (tokenInputAmount.current?.wrapperRef.current?.contains(e.target))
        return;
      tokenInputAmount.current?.handleFocus();
    },
    [],
  );

  return (
    <div
      className="flex cursor-pointer justify-between rounded-lg bg-secondary-bg px-3 py-2"
      onClick={handleFocusInput}
      role="widget"
    >
      <div className="flex items-center justify-center">
        <div className="mr-2">
          <CoinCircleImage
            logoUrl={token.logoUrl}
            size={32}
            symbol={token.symbol}
            circleColor={'bg-black'}
          />
        </div>

        <div className="text-sm leading-none">{token.symbol}</div>
      </div>

      <div className="flex flex-col justify-center text-right text-sm leading-4">
        <TokenAmountInput
          amount={amount}
          ref={tokenInputAmount}
          editable={editable}
        />
        <div className="relative z-10 text-[0.625rem] leading-4 text-secondary-text">
          ${dollars}
        </div>
      </div>
    </div>
  );
}
