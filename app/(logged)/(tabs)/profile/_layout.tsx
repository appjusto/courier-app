import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Sua conta' }} />
    </Stack>
  );
}
