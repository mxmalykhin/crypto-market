import { formatPublicKey } from '@/shared/format';
import { PublicKey } from '@solana/web3.js';

import CopyButton from './CopyButton';

type TTruncatedAddressProps = {
  publicKey: string | PublicKey;
};

export default function TruncatedAddress({
  publicKey,
}: TTruncatedAddressProps) {
  const pkStr = publicKey.toString();
  return (
    <div className="flex items-center rounded bg-secondary-bg px-2 py-1 text-xs">
      <span className="mr-2">{formatPublicKey(pkStr)}</span>
      <CopyButton value={pkStr} />
    </div>
  );
}
