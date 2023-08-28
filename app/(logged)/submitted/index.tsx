import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
import { SituationHeader } from '@/common/screens/profile/situation-header';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function SubmittedIndex() {
  const router = useRouter();
  // params
  // @ts-expect-error
  const search = useLocalSearchParams<{ justSubmitted: boolean }>();
  // handler
  const onSelectHandler = (screen: HowAppJustoWorksContentType) => {
    router.push(`/submitted/howitworks/${screen}`);
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <DefaultScrollView>
        <SituationHeader variant={search.justSubmitted ? 'success' : 'warning'} />
        <HowAppJustoWorksContent onSelect={onSelectHandler} />
      </DefaultScrollView>
    </View>
  );
}
