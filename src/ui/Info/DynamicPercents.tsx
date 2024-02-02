import React from 'react';

import { cn } from '@/shared/styles';
import { FrameTime } from '@/types/FrameTime';
import { IncomeStatement } from '@/types/IncomeStatement';

type TDynamicPercentsProps = {
  frameTime: FrameTime;
  value: number;
};

export default function DynamicPercents({
  value,
  frameTime,
}: React.PropsWithChildren<TDynamicPercentsProps>) {
  const incomeStatement =
    value > 0 ? IncomeStatement.POSITIVE : IncomeStatement.NEGATIVE;

  return (
    <div className="mr-2 inline-flex last:mr-0">
      <div
        className={cn(
          'flex h-10 w-[3.75rem] flex-col items-center justify-center rounded p-2',
          {
            'bg-red-bg-opacity-10':
              incomeStatement === IncomeStatement.NEGATIVE,
            'bg-green-bg-opacity-10':
              incomeStatement === IncomeStatement.POSITIVE,
          },
        )}
      >
        <span
          className={cn('text-xs', {
            'text-green-text': incomeStatement === IncomeStatement.POSITIVE,
            'text-red-text': incomeStatement === IncomeStatement.NEGATIVE,
          })}
        >
          {incomeStatement === IncomeStatement.POSITIVE && '+'}
          {value}%
        </span>
        <span className="text-[0.625rem] opacity-70">
          {FrameTime[frameTime]}
        </span>
      </div>
    </div>
  );
}
