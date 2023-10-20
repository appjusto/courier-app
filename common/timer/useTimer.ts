import { useEffect, useState } from 'react';

export const useTimer = (seconds: number) => {
  // state
  const [tick, setTick] = useState(seconds);
  // side effects
  useEffect(() => {
    if (tick > 0) {
      const timeout = setTimeout(() => {
        setTick((value) => value - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [tick]);
  return tick;
};
