'use client';

import { useCallback, useEffect, useState } from 'react';

import CopyIcon from '@/shared/icons/CopyIcon';
import SuccessIcon from '@/shared/icons/SuccessIcon';
import { cn, theme } from '@/shared/styles';

type TCopyButtonProps = {
  copyIconProps?: React.ComponentProps<typeof CopyIcon>;
  successIconProps?: React.ComponentProps<typeof SuccessIcon>;
  value: string;
};

export default function CopyButton({
  copyIconProps,
  successIconProps,
  value,
}: TCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClickCopyPublicKey = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  }, [value]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000); // ms to show copied icon

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <button onClick={handleClickCopyPublicKey}>
      <CopyIcon
        {...copyIconProps}
        className={cn(
          'transition-opacity',
          'hover:opacity-50',
          'h-3',
          'w-3',
          {
            hidden: copied,
          },
          copyIconProps?.className,
        )}
      />

      <SuccessIcon
        color={theme.colors.green}
        {...copyIconProps}
        className={cn(
          'h-3',
          'w-3',
          {
            hidden: !copied,
          },
          successIconProps?.className,
        )}
      />
    </button>
  );
}
