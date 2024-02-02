import useBreakpoint from '@/shared/hooks/useBreakpoint';

import DesktopListSuggestions from './Desktop';
import MobileListSuggestions from './Mobile';

export default function ListSuggestions() {
  const activeBreakpoint = useBreakpoint();

  return (
    <>
      {activeBreakpoint === null || activeBreakpoint == 'sm' ? (
        <MobileListSuggestions />
      ) : (
        <DesktopListSuggestions />
      )}
    </>
  );
}
