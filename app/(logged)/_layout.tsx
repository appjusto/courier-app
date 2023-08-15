import { useNotifications } from '@/common/notifications/useNotifications';
import { Stack } from 'expo-router';

export default function LoggedLayout() {
  // side effects
  // notifications
  useNotifications();
  // UI
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
