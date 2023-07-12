import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function LoggedLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
