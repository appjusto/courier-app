import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { HomeActivity } from '@/common/screens/home/activity/home-activity';
import { HomeFleet } from '@/common/screens/home/fleet/home-fleet';
import { HomeHeader } from '@/common/screens/home/header/home-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={screens.headless}>
        <HomeHeader />
        <View style={{ padding: paddings.lg }}>
          <HomeFleet />
          <HomeActivity style={{ marginTop: paddings.lg }} />
        </View>
      </DefaultView>
    </DefaultScrollView>
  );
}
