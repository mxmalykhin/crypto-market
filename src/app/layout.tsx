import 'simplebar-react/dist/simplebar.min.css';

import './globals.css';

import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Crypto Market',
  description: 'Crypto Market',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="theme-dark touch-manipulation text-[100%] dark 2xl:text-[112.5%]"
    >
      <body
        className={clsx(
          inter.className,
          'flex min-h-screen flex-col bg-black px-3 font-medium text-white md:px-6',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
