import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        console.log('ProfileLayout', route.name, route.params);
        return {
          // headerShown: true,
          // headerShown: route.name === 'index',
          // headerShown: false,
          headerShown: route.name !== 'howitworks',
        };
      }}
    />
  );
  // return <Stack />;
}
