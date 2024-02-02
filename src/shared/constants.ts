import { Token } from '@/types/Token';
import { PublicKey } from '@solana/web3.js';

export const TOKEN_SOL: Token = {
  name: 'Solana',
  symbol: 'SOL',
  address: 'So11111111111111111111111111111111111111112', // WSOL?
  logoUrl: '/solana-icon.png',
};

export const TOKEN_WSOL_ADDRESS = new PublicKey(TOKEN_SOL.address);

export const DEMO_TOKEN: Token = {
  name: 'BONK',
  symbol: 'BONK',
  address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  logoUrl: '/bonk-icon.jpg',
};
