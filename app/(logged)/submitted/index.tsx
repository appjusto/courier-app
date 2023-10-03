import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import HowAppJustoWorksContent, {
  HowAppJustoWorksContentType,
} from '@/common/screens/profile/howitworks';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function SubmittedIndex() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // state
  const justSubmitted = api.profile().justSubmitted;
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
          variant={justSubmitted ? 'success' : 'warning'}
        />
        <HowAppJustoWorksContent
          title="Enquanto espera o retorno, que tal saber mais sobre como a gente funciona?"
          onSelect={onSelectHandler}
        />
      </DefaultScrollView>
    </View>
  );
}
