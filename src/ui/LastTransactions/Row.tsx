import { IncomeStatement } from '@/types/IncomeStatement';

import Arrow from './Arrow';
import Coin from './Coin';

type TRowProps = {
  incomeStatement: IncomeStatement;
};

export default function Row({ incomeStatement }: TRowProps) {
  return (
    <div className="mb-3 flex items-center justify-between last:mb-0">
      <Coin
        value="2.0213"
        symbol="SOL"
        logoUrl="/meta-icon.png"
        incomeStatement={incomeStatement}
      />

      <Arrow incomeStatement={incomeStatement} />

      <Coin
        value="2.0213"
        symbol="SOL"
        incomeStatement={incomeStatement}
        align="right"
      />
    </div>
  );
}
