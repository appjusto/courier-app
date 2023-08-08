import { HowAppJustoWorksContent } from '@/common/components/profile/howitworks/HowAppJustoWorksContent';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function HowAppJustoWorks() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Como funciona' }} />
      <HowAppJustoWorksContent />
    </ScrollView>
  );
}
