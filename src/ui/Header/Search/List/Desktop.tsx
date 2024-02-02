import { useMemo } from 'react';
import SimpleBar from 'simplebar-react';

import SearchIcon from '@/shared/icons/SearchIcon';
import { cn, theme } from '@/shared/styles';
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from '@nextui-org/react';

import { useSearchContext } from '../../store';
import Item from '../Item';
import useSearch from '../useSearch';

export default function DesktopListSuggestions() {
  const {
    isOpen,
    toggleOpen,
    search,
    searchTyping,
    searchFetching,
    searchResults,
  } = useSearchContext((s) => s);

  const { onChangeSearch } = useSearch({
    autoClose: false,
  });

  const visibleSearchResults = useMemo(() => {
    return (
      !searchTyping && !searchFetching && search && searchResults.length > 0
    );
  }, [search, searchFetching, searchResults.length, searchTyping]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={toggleOpen}
      size="3xl"
      classNames={{
        wrapper: 'overflow-hidden',
        header: ['m-0', 'p-0', 'shadow-none'],
        body: ['m-0 p-0 mt-[0.9375rem]', 'overflow-hidden', 'h-full'],
      }}
      scrollBehavior="inside"
      hideCloseButton
    >
      <ModalContent className="flex h-full bg-transparent">
        <div className="flex h-full max-h-full flex-col">
          <ModalHeader>
            <Input
              autoFocus
              classNames={{
                innerWrapper: ['text-center'],
                input: ['text-sm', 'placeholder:text-secondary-text'],
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
              onChange={onChangeSearch}
            />
          </ModalHeader>

          <ModalBody>
            <SimpleBar
              className="h-full max-h-full gap-3 rounded-2xl bg-tertiary-bg p-3"
              classNames={{
                contentEl: 'simplebar-content h-full',
              }}
            >
              <div className="flex h-full flex-col gap-3">
                <div
                  className={cn(
                    'flex h-full items-center justify-center text-secondary-text',
                    {
                      hidden: visibleSearchResults,
                    },
                  )}
                >
                  {searchFetching ? (
                    <div>
                      <Spinner size="lg" />
                    </div>
                  ) : null}
                  {searchTyping ? (
                    <div>Finish typing to start search</div>
                  ) : null}
                  {!search && !searchTyping ? (
                    <div>Type to find tokens</div>
                  ) : null}
                </div>

                {visibleSearchResults
                  ? searchResults.map((item) => (
                      <Item key={item.symbol} token={item} />
                    ))
                  : null}

                <div className="pt-3" />
              </div>
            </SimpleBar>
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
  );
}
