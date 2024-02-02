type TConnectWalletButtonProps = {
  onClick?: () => void;
};

export default function ConnectWalletButton(props: TConnectWalletButtonProps) {
  const { onClick } = props;

  return (
    <button
      className="grow rounded-lg bg-gradient-wallet px-6 py-3 text-sm leading-4"
      onClick={onClick}
    >
      Connect Wallet
    </button>
  );
}
