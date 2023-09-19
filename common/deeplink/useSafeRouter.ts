import { useRootNavigationState, useRouter } from 'expo-router';

export const useSafeRouter = () => {
  const router = useRouter();
  const mounted = Boolean(useRootNavigationState()?.key);
  return mounted ? router : null;
};
