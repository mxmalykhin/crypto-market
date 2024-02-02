import { cn } from '@/shared/styles';

type TBadgeProps = {
  color?: string;
  textColor?: string;
  onClick?: () => void;
};

export default function Badge({
  children,
  color,
  textColor,
  onClick,
}: React.PropsWithChildren<TBadgeProps>) {
  return (
    <div
      className={cn(
        color || 'bg-green',
        textColor || 'text-white',
        'py-[0.3125rem]',
        'px-2',
        'rounded-[6.25rem]',
        'inline-flex',
        'text-center',
        'text-[0.625rem]',
        'leading-none',
        'hover:opacity-60',
        'transition-opacity',
        'cursor-pointer',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
