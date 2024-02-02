import { IncomeStatement } from '@/types/IncomeStatement';

import Row from './Row';

export default function List() {
  return (
    <div>
      <Row incomeStatement={IncomeStatement.POSITIVE} />
      <Row incomeStatement={IncomeStatement.NEGATIVE} />
      <Row incomeStatement={IncomeStatement.POSITIVE} />
      <Row incomeStatement={IncomeStatement.NEGATIVE} />
      <Row incomeStatement={IncomeStatement.POSITIVE} />
    </div>
  );
}
