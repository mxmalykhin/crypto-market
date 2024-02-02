import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig, {
  type Colors,
  type DefaultColors,
} from '../../tailwind.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

const tw = resolveConfig(tailwindConfig);
export const breakpoints = tw.theme.screens;

export type BreakpointsKeys = keyof typeof breakpoints;

// @see: https://github.com/tailwindlabs/tailwindcss/discussions/11895#discussioncomment-6839589
const { theme } = tw as unknown as {
  theme: (typeof tw)['theme'] & { colors: DefaultColors & Colors };
};

let activeBreakpoint: BreakpointsKeys | null = null;
let listeners: Array<() => void> = [];

const createBreakpointListener = () => {
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    ([, a], [, b]) => parseInt(b, 10) - parseInt(a, 10),
  );

  const updateActiveBreakpoint = () => {
    const matchedBreakpoint = sortedBreakpoints.find(([, value]) => {
      const query = window.matchMedia(`(min-width: ${value})`);
      return query.matches;
    });
    activeBreakpoint = matchedBreakpoint
      ? (matchedBreakpoint[0] as BreakpointsKeys)
      : null;
    listeners.forEach((listener) => listener());
  };

  sortedBreakpoints.forEach(([, value]) => {
    const query = window.matchMedia(`(min-width: ${value})`);
    query.addEventListener('change', updateActiveBreakpoint);
  });

  updateActiveBreakpoint();
};

const subscribeToBreakpointChange = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getActiveBreakpoint = () => activeBreakpoint;

export {
  theme,
  createBreakpointListener,
  subscribeToBreakpointChange,
  getActiveBreakpoint,
};
