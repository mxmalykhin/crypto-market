'use client';

import { createBreakpointListener } from '@/shared/styles';
import { UnifiedWalletProvider, WalletName } from '@jup-ag/wallet-adapter';
import { NextUIProvider } from '@nextui-org/react';

if (typeof window !== 'undefined') {
  createBreakpointListener();
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <UnifiedWalletProvider
        wallets={[]}
        config={{
          autoConnect: false,
          env: 'mainnet-beta',
          theme: 'dark',
          lang: 'en',
          metadata: {
            name: 'crypto.markets',
            description:
              'crypto.markets is a realtime DEX interface for Solana',
            url: 'https://crypto.markets',
            iconUrls: ['https://crypto.markets/favicon.ico'],
          },
          walletPrecedence: ['Phantom' as WalletName, 'Solflare' as WalletName],
        }}
      >
        {/* <UnifiedWalletButton /> */}
        {children}
      </UnifiedWalletProvider>
    </NextUIProvider>
  );
}
