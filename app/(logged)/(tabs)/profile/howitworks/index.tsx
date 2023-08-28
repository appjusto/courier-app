import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
import { Stack, router } from 'expo-router';
import { ScrollView } from 'react-native';

export default function HowAppJustoWorks() {
  // handler
  const onSelectHandler = (screen: HowAppJustoWorksContentType) => {
    router.push(`/profile/howitworks/${screen}`);
  };
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Como funciona' }} />
      <HowAppJustoWorksContent onSelect={onSelectHandler} />
    </ScrollView>
  );
}
