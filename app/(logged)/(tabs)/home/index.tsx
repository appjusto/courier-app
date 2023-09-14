import { shareAppJusto } from '@/api/platform/shareAppJusto';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { HomeActivity } from '@/common/screens/home/activity/home-activity';
import { ActiveRequestsCards } from '@/common/screens/home/cards/active-requests-cards';
import { OngoingOrdersCards } from '@/common/screens/home/cards/ongoing-orders-cards';
import { HomeFleet } from '@/common/screens/home/fleet/home-fleet';
import { HomeHeader } from '@/common/screens/home/header/home-header';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function HomeScreen() {
  // context
  const router = useRouter();
  // side effects
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={screens.headless}>
        <HomeHeader />
        <View style={{ padding: paddings.lg }}>
          <HomeFleet />
          <HomeActivity style={{ marginTop: paddings.lg }} />
        </View>
        <View style={{ flex: 1, padding: paddings.lg, backgroundColor: colors.neutral50 }}>
          <OngoingOrdersCards />
          <ActiveRequestsCards />
          <Pressable onPress={() => router.push('/profile/howitworks/')}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="file" />}
              title="Como funciona o AppJusto"
              subtitle="Conheça as vantagens e entenda os benefícios que temos para você"
            />
          </Pressable>
          <Pressable style={{ marginTop: paddings.lg }} onPress={() => shareAppJusto()}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="chat" />}
              title="Divulgue o AppJusto"
              subtitle="Compartilhe esse movimento por uma economia mais justa"
            />
          </Pressable>
          <Pressable style={{ marginTop: paddings.lg }} onPress={() => null}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="alert" variant="warning" />}
              title="Preciso de ajuda"
              subtitle="Fale com nosso time ou faça uma denúncia"
            />
          </Pressable>
        </View>
      </DefaultView>
    </DefaultScrollView>
  );
}
