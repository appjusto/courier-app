import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function UnloggedLayout() {
  // side effects
  // UI
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="phone-verification"
        options={{ presentation: 'modal', title: 'Verificação' }}
      />
    </Stack>
  );
}
