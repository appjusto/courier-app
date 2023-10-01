import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function SubmittedIndex() {
  const router = useRouter();
  // params
  // @ts-expect-error
  const search = useLocalSearchParams<{ justSubmitted: boolean }>();
  const { justSubmitted } = search;
  // track
  useTrackScreenView('Cadastro enviado', { justSubmitted });
  // handler
  const onSelectHandler = (screen: HowAppJustoWorksContentType) => {
    router.push(`/submitted/howitworks/${screen}`);
  };
  // UI
  const title = () => {
    if (justSubmitted) {
      return 'Cadastro enviado com sucesso';
    } else {
      return 'O seu cadastro está em análise';
    }
  };
  const text = () => {
    if (justSubmitted) {
      return ['Enquanto seu cadastro não é aprovado, conheça mais sobre o Appjusto.'];
    } else {
      return [
        'Falta pouco para você começar a entregar com o AppJusto! Enquanto isso, conheça mais sobre a nossa proposta.',
      ];
    }
  };
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <DefaultScrollView>
        <FeedbackHeader
          title={title()}
          text={text()}
          variant={search.justSubmitted ? 'success' : 'warning'}
        />
        <HowAppJustoWorksContent onSelect={onSelectHandler} />
      </DefaultScrollView>
    </View>
  );
}
