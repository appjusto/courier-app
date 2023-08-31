import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { HomeHeader } from '@/common/screens/home/header/home-header';
import screens from '@/common/styles/screens';

export default function HomeScreen() {
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={screens.headless}>
        <HomeHeader />
      </DefaultView>
    </DefaultScrollView>
  );
}
