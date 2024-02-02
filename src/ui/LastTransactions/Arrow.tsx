import ArrowIcon from '@/shared/icons/ArrowIcon';
import { theme } from '@/shared/styles';
import { IncomeStatement } from '@/types/IncomeStatement';

type TArrowProps = {
  incomeStatement: IncomeStatement;
};

export default function Arrow({ incomeStatement }: TArrowProps) {
  const color =
    incomeStatement === IncomeStatement.POSITIVE
      ? theme.colors['green-text']
      : theme.colors['red-text-precise-1'];

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-base-lower">
      <ArrowIcon color={color} />
    </div>
  );
}
