'use client';

import { useCallback, useState } from 'react';

import CloseIcon from '@/shared/icons/CloseIcon';
import { cn, theme } from '@/shared/styles';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useModalContext,
} from '@nextui-org/react';

import Button from './Button';

function CloseButton() {
  const modalContext = useModalContext();
  const props = modalContext.getCloseButtonProps();

  return (
    <button
      {...props}
      className={cn(
        props.className,
        'top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-middle-bg p-0',
      )}
    >
      <CloseIcon color={theme.colors['secondary-text']} className="h-4 w-4" />
    </button>
  );
}

export default function Settings() {
  const [isOpen, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className="mr-3">
      <Button onClick={onOpen} />

      <Modal
        size={'sm'}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: ['bg-tertiary-bg border-middle-bg rounded-2xl mx-3 my-2'],
          header: ['py-4 px-0 mx-4 border-b border-middle-bg relative'],
          body: ['p-4'],
        }}
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader>
              Settings
              <CloseButton />
            </ModalHeader>

            <ModalBody>
              <p>settings...</p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
