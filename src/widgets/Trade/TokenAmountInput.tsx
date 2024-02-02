'use client';

import {
  RefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cn } from '@/shared/styles';

type TTokenAmountInputProps = {
  amount: number;
  editable: boolean;
};

export type TTokenAmountInputRef = {
  handleFocus: () => void;
  wrapperRef: RefObject<HTMLDivElement>;
};

const TokenAmountInput = forwardRef<
  TTokenAmountInputRef,
  TTokenAmountInputProps
>((props, componentRef) => {
  const { amount, editable } = props;

  const [value, setValue] = useState(String(amount));
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const setCaretToEnd = useCallback(() => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputRef.current!);
    range.collapse(false);
    selection!.removeAllRanges();
    selection!.addRange(range);
  }, []);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const nextValue = e.currentTarget.innerText;

      if (/^[\d]*\.?[\d]*$/.test(nextValue) && !isNaN(Number(nextValue))) {
        setValue(nextValue);
      } else {
        e.currentTarget.innerText = value;
        setCaretToEnd();
      }
    },
    [setCaretToEnd, value],
  );

  const handleFocus = useCallback(() => {
    setCaretToEnd();
    setIsFocused(true);
  }, [setCaretToEnd]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useImperativeHandle(
    componentRef,
    () => ({
      handleFocus: () => {
        handleFocus();
      },
      wrapperRef,
    }),
    [handleFocus],
  );

  return (
    <div className="z-5 relative" ref={wrapperRef}>
      <div
        className={cn(
          'z-5 absolute -bottom-1 -left-2 -right-2 -top-1 rounded-lg transition-background',
          {
            'bg-secondary-bg-light': isFocused || isHovered,
            hidden: !editable,
          },
        )}
      />

      <div
        contentEditable={editable ? 'true' : 'false'}
        onInput={handleInput}
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 cursor-text outline-none"
        role="textbox"
        tabIndex={0}
        ref={inputRef}
      >
        {amount}
      </div>
    </div>
  );
});

TokenAmountInput.displayName = 'TokenAmountInput';

export default TokenAmountInput;
