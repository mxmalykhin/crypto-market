'use client';

import { useCallback } from 'react';

import useBreakpoint from '@/shared/hooks/useBreakpoint';
import SearchIcon from '@/shared/icons/SearchIcon';
import { theme } from '@/shared/styles';
import { Input } from '@nextui-org/react';

import { useSearchContext } from '../store';
import ListSuggestions from './List';
import useSearch from './useSearch';

type TSearchProps = {
  searchWritable: boolean;
};

export default function Search(props: TSearchProps) {
  const { searchWritable } = props;
  const { reset, setOpen } = useSearchContext((s) => s);
  const activeBreakpoint = useBreakpoint();

  const { onChangeSearch } = useSearch({
    autoClose:
      activeBreakpoint === 'sm' || activeBreakpoint === null ? true : false,
  });

  const handleInputClick = useCallback(() => {
    if (!searchWritable) {
      reset();
      setOpen(true);
    }
  }, [reset, searchWritable, setOpen]);

  return (
    <>
      <div onClick={handleInputClick}>
        <Input
          autoFocus={searchWritable}
          classNames={{
            base: 'md:w-[15.5rem]',
            inputWrapper: [
              'bg-secondary-bg',
              'h-10',
              !searchWritable && '!cursor-pointer',
            ],
            innerWrapper: ['text-center'],
            input: [
              'text-sm',
              'placeholder:text-secondary-text',
              !searchWritable && 'cursor-pointer',
            ],
          }}
          size="sm"
          startContent={
            <SearchIcon
              className="h-3 w-3"
              color={theme.colors['secondary-text']}
            />
          }
          radius="sm"
          placeholder="Search for tokens"
          isReadOnly={!searchWritable}
          onChange={searchWritable ? onChangeSearch : undefined}
        />
      </div>

      {searchWritable ? null : <ListSuggestions />}
    </>
  );
}
