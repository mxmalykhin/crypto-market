import { useEffect, useState } from 'react';

import {
  BreakpointsKeys,
  getActiveBreakpoint,
  subscribeToBreakpointChange,
} from '../styles';

// "null" is always as mobile
const useBreakpoint = (): BreakpointsKeys | null => {
  const [activeBreakpoint, setActiveBreakpoint] =
    useState<BreakpointsKeys | null>(getActiveBreakpoint());

  useEffect(() => {
    const unsubscribe = subscribeToBreakpointChange(() => {
      setActiveBreakpoint(getActiveBreakpoint());
    });

    return unsubscribe;
  }, []);

  return activeBreakpoint;
};

export default useBreakpoint;
