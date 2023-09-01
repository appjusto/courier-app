import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function HomeLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
