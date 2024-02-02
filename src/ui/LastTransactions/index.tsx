import List from './List';

export default function LastTransactions() {
  return (
    <div className="flex flex-col rounded-2xl border border-[#161616] bg-[#0A0A0A] p-4">
      <span className="mb-4 text-xs text-secondary-text">
        Last transactions
      </span>

      <List />
    </div>
  );
}
