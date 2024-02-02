import { Market as OpenBookMarket } from '@openbook-dex/openbook';
import {
  LIQUIDITY_STATE_LAYOUT_V4,
  Liquidity,
  MAINNET_PROGRAM_ID,
  MARKET_STATE_LAYOUT_V3,
  Percent,
  SPL_ACCOUNT_LAYOUT,
  TOKEN_PROGRAM_ID,
  Token,
  TokenAmount,
  TxVersion,
  parseBigNumberish,
  type BigNumberish,
  type LiquidityPoolInfo,
  type LiquidityPoolKeys,
  type TokenAccount,
} from '@raydium-io/raydium-sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { privateSolanaConnection, publicSolanaConnetion } from './solana';

export class RaydiumApi {
  constructor(private connection: Connection) {}

  async findRaydiumPool(baseToken: PublicKey, quoteToken: PublicKey) {
    const marketId = await this.findMarketId(baseToken, quoteToken);
    const poolId = Liquidity.getAssociatedId({
      programId: MAINNET_PROGRAM_ID.AmmV4,
      marketId: marketId,
    });
    return {
      poolId,
      marketId,
    };
  }

  async fetchRaydiumPoolsLiquidity({
    marketId,
    poolId,
  }: {
    marketId: PublicKey;
    poolId: PublicKey;
  }) {
    const baseLp = Liquidity.getAssociatedBaseVault({
      programId: MAINNET_PROGRAM_ID.AmmV4,
      marketId: marketId,
    });

    const quoteLp = Liquidity.getAssociatedQuoteVault({
      programId: MAINNET_PROGRAM_ID.AmmV4,
      marketId: marketId,
    });

    const [base, quote] = await Promise.all([
      this.connection.getTokenAccountBalance(baseLp),
      this.connection.getTokenAccountBalance(quoteLp),
    ]);

    return {
      poolId: poolId,
      marketId: marketId,
      baseLpId: baseLp,
      quoteLpId: quoteLp,
      baseAmount: base.value,
      quoteAmount: quote.value,
    };
  }

  async composeSwapIx(
    owner: PublicKey,
    tokenInMint: PublicKey,
    tokenOutMint: PublicKey,
    amountIn: BigNumberish,
    slippage: Percent,
  ) {
    const { poolId } = await this.findRaydiumPool(tokenInMint, tokenOutMint);

    const poolKeys = await this.fetchPoolKeys(poolId);

    const [baseTokenAmount, quoteTokenAmount] = await Promise.all([
      this.connection.getTokenAccountBalance(poolKeys.baseVault),
      this.connection.getTokenAccountBalance(poolKeys.quoteVault),
    ]);

    const tokenAmountIn = new TokenAmount(
      new Token(TOKEN_PROGRAM_ID, tokenInMint, baseTokenAmount.value.decimals),
      amountIn,
    );

    const amountOut = Liquidity.computeAmountOut({
      amountIn: tokenAmountIn,
      currencyOut: new Token(
        TOKEN_PROGRAM_ID,
        tokenOutMint,
        quoteTokenAmount.value.decimals,
      ),
      poolKeys: poolKeys,
      poolInfo: {
        baseReserve: parseBigNumberish(baseTokenAmount.value.amount),
        quoteReserve: parseBigNumberish(quoteTokenAmount.value.amount),
        // other fields are unused, so I omit and cast it to full type
      } as LiquidityPoolInfo,
      slippage: slippage,
    });

    console.log(
      'amount out',
      amountOut.amountOut.toSignificant(),
      'current price',
      amountOut.currentPrice.toSignificant(),
      'execution price',
      amountOut.executionPrice?.toSignificant(),
      'fee',
      amountOut.fee.toSignificant(),
      'min amount out',
      amountOut.minAmountOut.toSignificant(),
      'price impact',
      amountOut.priceImpact.toSignificant(),
    );

    const tokenAccounts = await fetchWalletTokenAccounts(
      this.connection,
      owner,
    );

    const swapTx = await Liquidity.makeSwapInstructionSimple({
      amountIn: tokenAmountIn,
      amountOut: amountOut.minAmountOut,
      poolKeys,
      userKeys: {
        owner,
        tokenAccounts: tokenAccounts,
      },
      fixedSide: 'in',
      connection: this.connection,
      makeTxVersion: TxVersion.V0,
    });

    if (swapTx.innerTransactions.length !== 1) {
      throw new Error('should never happen...');
    }

    return swapTx.innerTransactions[0];
  }

  private async findMarketId(
    baseToken: PublicKey,
    quoteToken: PublicKey,
  ): Promise<PublicKey> {
    const accounts = await OpenBookMarket.findAccountsByMints(
      this.connection,
      baseToken,
      quoteToken,
      MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
    );

    if (!accounts.length) {
      throw new Error(
        `Market not found for ${baseToken.toString()} and ${quoteToken.toString()}`,
      );
    }
    return accounts[0].publicKey;
  }

  private async fetchPoolKeys(poolId: PublicKey): Promise<LiquidityPoolKeys> {
    const account = await this.connection.getAccountInfo(poolId);
    const fields = LIQUIDITY_STATE_LAYOUT_V4.decode(account!.data);
    const {
      // status,
      baseMint,
      quoteMint,
      lpMint,
      openOrders,
      targetOrders,
      baseVault,
      quoteVault,
      marketId,
      baseDecimal,
      quoteDecimal,
    } = fields;

    let withdrawQueue, lpVault;
    if (Liquidity.isV4(fields)) {
      withdrawQueue = fields.withdrawQueue;
      lpVault = fields.lpVault;
    } else {
      withdrawQueue = PublicKey.default;
      lpVault = PublicKey.default;
    }

    // uninitialized
    // if (status.isZero()) {
    //   return ;
    // }

    const associatedPoolKeys = Liquidity.getAssociatedPoolKeys({
      version: 4,
      marketId,
      baseMint: baseMint,
      quoteMint: quoteMint,
      baseDecimals: baseDecimal,
      quoteDecimals: quoteDecimal,
      programId: MAINNET_PROGRAM_ID.AmmV4,
      marketProgramId: MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
      marketVersion: 3,
    });

    const poolKeys = {
      id: poolId,
      baseMint,
      quoteMint,
      lpMint,
      version: 4 as const,
      programId: MAINNET_PROGRAM_ID.AmmV4,

      authority: associatedPoolKeys.authority,
      openOrders,
      targetOrders,
      baseVault,
      quoteVault,
      withdrawQueue,
      lpVault,
      marketVersion: 3 as const,
      marketProgramId: MAINNET_PROGRAM_ID.OPENBOOK_MARKET,
      marketId,
      marketAuthority: associatedPoolKeys.marketAuthority,
    };

    const marketInfo = await this.connection.getAccountInfo(marketId);
    const market = MARKET_STATE_LAYOUT_V3.decode(marketInfo!.data);

    const {
      baseVault: marketBaseVault,
      quoteVault: marketQuoteVault,
      bids: marketBids,
      asks: marketAsks,
      eventQueue: marketEventQueue,
    } = market;

    return {
      ...poolKeys,
      ...{
        marketBaseVault,
        marketQuoteVault,
        marketBids,
        marketAsks,
        marketEventQueue,
      },
      baseDecimals: baseDecimal,
      quoteDecimals: quoteDecimal,
      lookupTableAccount: associatedPoolKeys.lookupTableAccount,
      lpDecimals: associatedPoolKeys.lpDecimals,
    };
  }
}

export const privateRaydiumApi = new RaydiumApi(privateSolanaConnection);
export const publicRaydiumApi = new RaydiumApi(publicSolanaConnetion);

async function fetchWalletTokenAccounts(
  connection: Connection,
  wallet: PublicKey,
): Promise<TokenAccount[]> {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
}
