'use client';

import type { PropsWithChildren } from 'react';

import { cn } from '@/shared/styles';

function Chip({
  children,
  active,
  onClick,
}: PropsWithChildren<{ active: boolean; onClick: () => void }>) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer select-none rounded bg-secondary-bg-lighter px-2 py-1 text-xs text-white transition-opacity hover:opacity-70',
        {
          'bg-white': active,
          'text-black': active,
          'shadow-ui-1': active,
        },
      )}
    >
      {children}
    </div>
  );
}

export default function SeriesTypes({
  type,
  onClick,
}: {
  type: 'candle' | 'line';
  onClick: (type: 'candle' | 'line') => void;
}) {
  return (
    <div className="absolute right-4 top-4 z-10 flex gap-[0.3125rem]">
      <Chip active={type === 'candle'} onClick={() => onClick('candle')}>
        Candles
      </Chip>
      <Chip active={type === 'line'} onClick={() => onClick('line')}>
        Lines
      </Chip>
    </div>
  );
}
