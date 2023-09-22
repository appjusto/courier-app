import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import ProfileHome from '@/common/screens/profile/home';
import screens from '@/common/styles/screens';

export default function ProfileScreen() {
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <ProfileHome />
    </DefaultScrollView>
  );
}
