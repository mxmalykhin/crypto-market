import SettingsIcon from '@/shared/icons/SettingsIcon';

type TButtonProps = {
  onClick?: () => void;
};

export default function Button({ onClick }: TButtonProps) {
  return (
    <div
      className="cursor-pointer rounded-full bg-middle-bg p-2 transition-opacity hover:opacity-70"
      onClick={onClick}
    >
      <SettingsIcon />
    </div>
  );
}
