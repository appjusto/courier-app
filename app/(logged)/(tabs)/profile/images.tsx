import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfilePersonalImages from '@/common/screens/profile/images';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function ProfilePersonalImagesScreen() {
  // UI
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Selfie e documento' }} />
      <ProfilePersonalImages />
    </DefaultView>
  );
}
