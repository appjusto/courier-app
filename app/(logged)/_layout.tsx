import { useNotificationHandler } from '@/common/notifications/useNotificationHandler';
import { useNotifications } from '@/common/notifications/useNotifications';
import { Stack } from 'expo-router';

export default function LoggedLayout() {
  // side effects
  // notifications
  useNotifications();
  useNotificationHandler();
  // UI
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="matching" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
