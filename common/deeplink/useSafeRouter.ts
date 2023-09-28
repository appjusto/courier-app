import { useRootNavigationState, useRouter } from 'expo-router';

export const useSafeRouter = () => {
  // const routerRef = useRef(useRouter());
  const router = useRouter();
  const mounted = Boolean(useRootNavigationState()?.key);
  return mounted ? router : null;
};
