import { useEffect, useState } from 'react';

export const useBreakpoints = () => {
  const [breakpoint, setBreakpoint] = useState<number>(0);
  const resize = () => {
    setBreakpoint(window.innerWidth);
  };

  useEffect(() => {
    setBreakpoint(window.innerWidth);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const isDesktop = () => {
    return breakpoint >= 1024;
  };

  const isTablet = () => {
    return breakpoint >= 450 && breakpoint < 768;
  };

  const isTabletDown = () => {
    return breakpoint < 768;
  };

  const isMobile = () => {
    return breakpoint < 450;
  };

  return {
    isDesktop,
    isTablet,
    isTabletDown,
    isMobile,
  };
};
