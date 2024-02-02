import Image from 'next/image';

import { cn } from '@/shared/styles';
import { AnyToken } from '@/types/Token';
import { PickWithOptional } from '@/types/helpers/PickWithOptional';

type TCoinCircleImageProps = {
  size: 24 | 32;
  circleColor?: string;
} & PickWithOptional<AnyToken, 'symbol', 'logoUrl'>;

export default function CoinCircleImage({
  logoUrl,
  symbol,
  size,
  circleColor = 'bg-secondary-bg',
}: TCoinCircleImageProps) {
  return (
    <div
      className={cn('flex items-center justify-center rounded-full', {
        'h-6 w-6': size === 24,
        'h-8 w-8': size === 32,
        [circleColor]: true,
      })}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={symbol}
          width="0"
          height="0"
          sizes="100vw"
          className="h-5 w-5 rounded-full"
        />
      ) : (
        <span>{symbol[0]}</span>
      )}
    </div>
  );
}
