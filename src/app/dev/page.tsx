'use client';

import { Suspense, useMemo, useState } from 'react';
import useSWR from 'swr';

import { RaydiumApi } from '@/shared/api/raydium';
import { publicSolanaConnetion } from '@/shared/api/solana';
import { DEMO_TOKEN, TOKEN_SOL } from '@/shared/constants';
import { formatTokenPrice } from '@/shared/format';
import { TradeAction } from '@/types/TradeAction';
import TradeModal from '@/widgets/Trade/Modal';
import { useWallet } from '@jup-ag/wallet-adapter';
import { Button } from '@nextui-org/react';
import {
  Currency,
  Liquidity,
  MAINNET_PROGRAM_ID,
  Price,
} from '@raydium-io/raydium-sdk';
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';

const DevBuyTest = ({}) => {
  const wallet = useWallet();

  const tokenId = 'FuvFLtx68uGjhr4GWET8JTskC7s3R7MM4Feg8toyzFvf';
  const marketId = 'FGVpVMcZ9sYaYnajF7MmNBsoqyeNCKzsZ5tBTkcCogW6';
  // const poolId = Liquidity.getAssociatedId({
  //   programId: MAINNET_PROGRAM_ID.AmmV4,
  //   marketId: new PublicKey(marketId),
  // });

  const [baseVault, quoteVault] = useMemo(
    () => [
      Liquidity.getAssociatedBaseVault({
        programId: MAINNET_PROGRAM_ID.AmmV4,
        marketId: new PublicKey(marketId),
      }),
      Liquidity.getAssociatedQuoteVault({
        programId: MAINNET_PROGRAM_ID.AmmV4,
        marketId: new PublicKey(marketId),
      }),
    ],
    [marketId],
  );

  // console.log(poolId.toString(), baseVault.toString(), quoteVault.toString());

  const { data, isLoading } = useSWR(`accBaseVault`, async () => {
    const [baseBalance, quoteBalance] = await Promise.all([
      publicSolanaConnetion.getTokenAccountBalance(baseVault),
      publicSolanaConnetion.getTokenAccountBalance(quoteVault),
    ]);

    return {
      baseBalance: baseBalance.value!,
      quoteBalance: quoteBalance.value!,
    };
  });

  if (isLoading) {
    return null;
  }

  const price = new Price(
    new Currency(data!.baseBalance.decimals),
    data?.baseBalance.amount,
    new Currency(data!.quoteBalance.decimals),
    data?.quoteBalance.amount,
  );

  const buy = async () => {
    // const buyIx = await RaydiumApi.composeSwapTx(
    //   'buy',
    //   wallet.publicKey!,
    //   10,
    //   new PublicKey(tokenId),
    //   1,
    // );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buyIx = {} as any;

    const blockhash = await publicSolanaConnetion.getLatestBlockhash();
    const msg = new TransactionMessage({
      recentBlockhash: blockhash.blockhash,
      instructions: buyIx.instructions,
      payerKey: wallet.publicKey!,
    }).compileToV0Message();
    const tx = new VersionedTransaction(msg);

    const signedTx = await wallet.signTransaction!(tx);

    const txId = await publicSolanaConnetion.sendTransaction(signedTx, {
      skipPreflight: true,
    });
    console.log(txId);

    const status = await publicSolanaConnetion.confirmTransaction({
      signature: txId,
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
    });

    console.log(status);
  };

  const sell = async () => {
    // const buyIx = await RaydiumApi.composeSwapTx(
    //   'sell',
    //   wallet.publicKey!,
    //   100,
    //   new PublicKey(tokenId),
    //   1, // % or what?
    // );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buyIx = {} as any;

    const blockhash = await publicSolanaConnetion.getLatestBlockhash();
    const msg = new TransactionMessage({
      recentBlockhash: blockhash.blockhash,
      instructions: buyIx.instructions,
      payerKey: wallet.publicKey!,
    }).compileToV0Message();

    const tx = new VersionedTransaction(msg);

    const signedTx = await wallet.signTransaction!(tx);

    const txId = await publicSolanaConnetion.sendTransaction(signedTx, {
      skipPreflight: true,
    });
    console.log(txId);

    const status = await publicSolanaConnetion.confirmTransaction({
      signature: txId,
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
    });

    console.log(status);
  };

  return (
    <div>
      <div>baseBalance: {data?.baseBalance.amount}</div>
      <div>quoteBalance: {data?.quoteBalance.amount}</div>
      <div>price: {formatTokenPrice(price.toSignificant(5))}</div>
      <button onClick={buy}>Buy 1</button>
      <br />
      <button onClick={sell}>Sell 1</button>
    </div>
  );
};

export default function DevPage() {
  const [isOpen, setOpen] = useState(false);
  const [tradeAction, setTradeAction] = useState(TradeAction.SELL);

  const handleSellBtn = () => {
    setOpen(true);
    setTradeAction(TradeAction.SELL);
  };

  const handleBuyBtn = () => {
    setOpen(true);
    setTradeAction(TradeAction.BUY);
  };

  const handleSwitch = () => {
    setTradeAction(
      tradeAction === TradeAction.BUY ? TradeAction.SELL : TradeAction.BUY,
    );
  };

  return (
    <div>
      <Suspense fallback={null}>
        <DevBuyTest />
      </Suspense>
      <Button onClick={handleSellBtn}>click like sell btn</Button>
      <Button onClick={handleBuyBtn}>click like buy btn</Button>

      <TradeModal
        isOpen={isOpen}
        onOpenChange={() => setOpen(!isOpen)}
        targetToken={DEMO_TOKEN}
        paymentToken={TOKEN_SOL}
        tradeAction={tradeAction}
        onSwitch={handleSwitch}
      />
    </div>
  );
}
