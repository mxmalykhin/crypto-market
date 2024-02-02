import CloseIcon from '@/shared/icons/CloseIcon';
import { cn, theme } from '@/shared/styles';
import { PaymentToken, TargetToken } from '@/types/Token';
import { TradeAction } from '@/types/TradeAction';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useModalContext,
} from '@nextui-org/react';

import Trade from './Trade';

type TTradeModalProps = {
  isOpen: boolean;
  targetToken: TargetToken;
  paymentToken: PaymentToken;
  tradeAction: TradeAction;
  onSwitch: () => void;
  onOpenChange: () => void;
};

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

export default function TradeModal(props: TTradeModalProps) {
  const {
    isOpen,
    onOpenChange,
    targetToken,
    tradeAction,
    paymentToken,
    onSwitch,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      backdrop="opaque"
      scrollBehavior="inside"
      classNames={{
        base: ['bg-tertiary-bg border-middle-bg rounded-2xl mx-3 my-2'],
        header: ['py-4 px-0 mx-4 border-b border-middle-bg relative'],
        body: ['p-4'],
      }}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader>
          {tradeAction === TradeAction.SELL ? 'Sell' : 'Buy'}{' '}
          {targetToken.symbol}
          <CloseButton />
        </ModalHeader>

        <ModalBody>
          <Trade
            onSwitch={onSwitch}
            tradeAction={tradeAction}
            paymentToken={paymentToken}
            targetToken={targetToken}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
