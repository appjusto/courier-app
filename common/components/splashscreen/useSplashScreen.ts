import { getEnv } from '@/extra';
import { useEffect, useState } from 'react';

export const useSplashScreen = (duration = 3000) => {
  // state
  const [shown, setShown] = useState(true);
  // effects
  useEffect(() => {
    const timeout = setTimeout(() => setShown(false), getEnv() === 'live' ? duration : 1);
    return () => clearTimeout(timeout);
  }, [duration]);
  // result
  return shown;
};
