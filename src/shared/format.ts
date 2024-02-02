import { PublicKey } from '@solana/web3.js';

const subscripts = {
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  10: '₁₀',
  11: '₁₁',
  12: '₁₂',
  13: '₁₃',
  14: '₁₄',
  15: '₁₅',
  16: '₁₆',
};

export function formatTokenPrice(price: number | string) {
  const strPrice = price.toString();

  const [major, minor] = strPrice.split('.');

  let significantsZero = 0;
  for (let i = 0; i < minor.length; i++) {
    if (minor[i] === '0') {
      significantsZero++;
    } else {
      break;
    }
  }

  if (significantsZero >= 3) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return `${major}.0${subscripts[significantsZero]}${minor.slice(
      significantsZero,
      significantsZero + 5,
    )}`;
  }

  return strPrice;
}

export function formatPercent(percent: number) {
  return `${percent.toFixed(2)}%`;
}

export function formatPublicKey(key: string | PublicKey) {
  const str = key.toString();
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  compactDisplay: 'short',
  notation: 'compact',
});

export function formatPrice(price: number) {
  return formatter.format(price);
}
