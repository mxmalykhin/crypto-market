'use client';

import { useRef } from 'react';

import { cn } from '@/shared/styles';

import ConnectWalletButton from '../ConnectWalletButton';
import Search from './Search';
import Settings from './Settings';
import { SearchContext, createSearchStore } from './store';

type THeaderProps = {
  searchWritable?: boolean;
  wrapperClassName?: string;
};

export default function HeaderWithContext(props: THeaderProps) {
  const store = useRef(createSearchStore()).current;

  return (
    <SearchContext.Provider value={store}>
      <Header {...props} />
    </SearchContext.Provider>
  );
}

export function Header(props: THeaderProps) {
  const { searchWritable = false, wrapperClassName } = props;

  return (
    <div
      className={cn(
        'my-2 flex h-10 items-center justify-between md:my-6',
        wrapperClassName,
      )}
    >
      <div className="flex w-full md:w-auto">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary-bg text-sm">
          CM
        </div>

        <div className="ml-2 grow">
          <Search searchWritable={searchWritable} />
        </div>

        {/* <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary-bg">
          <BurgerIcon />
        </div>
      </div> */}
      </div>

      <div className="hidden md:flex">
        <Settings />
        <ConnectWalletButton />
      </div>
    </div>
  );
}
