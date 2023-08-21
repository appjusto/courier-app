import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        return {
          headerShown: route.name !== 'howitworks',
        };
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Sua conta' }} />
    </Stack>
  );
}
