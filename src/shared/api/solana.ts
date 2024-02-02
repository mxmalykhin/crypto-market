import { Connection } from '@solana/web3.js';

export const publicSolanaConnetion = new Connection(
  process.env.NEXT_PUBLIC_RPC_URL!,
  'confirmed',
);
export const privateSolanaConnection = new Connection(
  process.env.RPC_URL! || process.env.NEXT_PUBLIC_RPC_URL!,
  'confirmed',
);
