import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { FeedbackHeader } from '@/common/components/views/feedback-header';
import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
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
  const title = () => {
    if (search.justSubmitted) {
      return 'Cadastro enviado com sucesso';
    } else {
      return 'O seu cadastro está em análise';
    }
  };
  const text = () => {
    if (search.justSubmitted) {
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
