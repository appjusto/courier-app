import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfilePersonalImages from '@/common/screens/profile/images';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function ProfilePersonalImagesScreen() {
  // UI
  const title = 'Selfie e documento';
  return (
    <DefaultView style={{ ...screens.profile }}>
      <Stack.Screen options={{ title }} />
      <ProfilePersonalImages />
    </DefaultView>
  );
}
