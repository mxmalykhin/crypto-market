import { cn } from '@/shared/styles';
import { IncomeStatement } from '@/types/IncomeStatement';
import { AnyToken } from '@/types/Token';
import CoinCircleImage from '@/ui/CoinCircleImage';

type TCoinProps = {
  value: string;
  incomeStatement: IncomeStatement;
  align?: 'left' | 'right';
} & Pick<AnyToken, 'symbol'> &
  Pick<Partial<AnyToken>, 'logoUrl'>;

export default function Coin({
  symbol,
  value,
  logoUrl,
  incomeStatement,
  align = 'left',
}: TCoinProps) {
  return (
    <div
      className={cn('flex items-center', {
        'flex-row-reverse': align === 'right',
      })}
    >
      <div
        className={cn('flex items-center justify-center', {
          'mr-2': align === 'left',
          'ml-2': align === 'right',
        })}
      >
        <CoinCircleImage symbol={symbol} logoUrl={logoUrl} size={32} />
      </div>

      <div
        className={cn({
          'text-right': align === 'right',
        })}
      >
        <div
          className={cn('text-sm leading-4', {
            'text-green-text': incomeStatement === IncomeStatement.POSITIVE,
            'text-red-text-precise-1':
              incomeStatement === IncomeStatement.NEGATIVE,
          })}
        >
          {value}
        </div>
        <div className="text-xs text-secondary-text">{symbol}</div>
      </div>
    </div>
  );
}
