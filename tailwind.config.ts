import type { Config } from 'tailwindcss';
import defaultColors from 'tailwindcss/colors';
import { nextui } from '@nextui-org/react';

export type DefaultColors = typeof defaultColors;

const extendedColors = {
  'secondary-text': '#585858',
  'secondary-bg': '#1A1A1A',
  'secondary-bg-light': '#262626',
  'secondary-bg-lighter': '#1F1F1F',
  'tertiary-bg': '#0A0A0A',
  green: '#6DD176',
  'green-text': '#A7F6AF',
  'red-text': '#FF8B85',
  'red-text-precise-1': '#FA6F67',
  'green-bg-opacity-10': 'rgba(109, 209, 118, 0.08)',
  'red-bg-opacity-10': 'rgba(195, 70, 63, 0.08)',
  'red-bg': '#FF7B74',
  'base-lower': '#0D0D0D',
  'middle-bg': '#161616',
} as const;

export type Colors = typeof extendedColors;

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: extendedColors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-wallet':
          'linear-gradient(95deg, #6E16E1 0.31%, #AA6CFC 100%)',
      },
      boxShadow: {
        'ui-1': '0px 4px 12px -6px rgba(255, 255, 255, 0.40)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(), require('@tailwindcss/typography')],
} satisfies Config;
