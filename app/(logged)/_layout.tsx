import {
  useContextDeeplink,
  useContextSetDeeplink,
} from '@/common/notifications/context/NotificationContext';
import { useNotifications } from '@/common/notifications/useNotifications';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function LoggedLayout() {
  // context
  const deeplink = useContextDeeplink();
  const setDeeplink = useContextSetDeeplink();
  // side effects
  useEffect(() => {
    if (deeplink) {
      // @ts-ignore
      router.push(deeplink);
      setDeeplink(undefined);
    }
  }, [deeplink, setDeeplink]);
  useNotifications();
  // UI
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
