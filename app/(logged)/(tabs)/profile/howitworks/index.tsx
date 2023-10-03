import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
import { Stack, router } from 'expo-router';
import { ScrollView } from 'react-native';

export default function HowAppJustoWorks() {
  // tracking
  useTrackScreenView('Sua conta: Como funciona');
  // handler
  const onSelectHandler = (screen: HowAppJustoWorksContentType) => {
    router.push(`/profile/howitworks/${screen}`);
  };
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Como funciona' }} />
      <HowAppJustoWorksContent
        title="Tire suas dúvidas e entenda os principais benefícios do AppJusto para quem faz entregas"
        onSelect={onSelectHandler}
      />
    </ScrollView>
  );
}
