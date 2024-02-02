import { useMemo } from 'react';

import { cn } from '@/shared/styles';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from '@nextui-org/react';

import { useSearchContext } from '../../store';
import { Header } from '../..';
import Item from '../Item';

export default function MobileListSuggestions() {
  const {
    isOpen,
    toggleOpen,
    search,
    searchTyping,
    searchFetching,
    searchResults,
  } = useSearchContext((s) => s);

  const visibleSearchResults = useMemo(() => {
    return (
      !searchTyping && !searchFetching && search && searchResults.length > 0
    );
  }, [search, searchFetching, searchResults.length, searchTyping]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={toggleOpen}
      size="full"
      classNames={{
        base: 'bg-black max-h-screen h-screen',
        body: 'm-0 p-0 px-3 mt-5 overflow-y-scroll',
        header: ['m-0', 'p-0', 'px-3', 'overflow-y-scroll'],
      }}
      backdrop="transparent"
      scrollBehavior="inside"
      disableAnimation
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader>
          <Header searchWritable wrapperClassName={cn('grow')} />
        </ModalHeader>

        <ModalBody>
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
            {searchTyping ? <div>Finish typing to start search</div> : null}
            {!search && !searchTyping ? <div>Type to find tokens</div> : null}
          </div>

          {visibleSearchResults
            ? searchResults.map((item) => (
                <Item key={item.symbol} token={item} />
              ))
            : null}

          <div className="mb-2" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
