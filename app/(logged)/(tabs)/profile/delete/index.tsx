import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextUserId } from '@/common/auth/AuthContext';
import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { DeleteAccountPayload } from '@appjusto/types';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function ProfileDelete() {
  // context
  const api = useContextApi();
  const accountId = useContextUserId();
  const showToast = useShowToast();
  // tracking
  useTrackScreenView('Sua conta: Excluir');
  // state
  const [survey, setSurvey] = useState({
    accountId,
    notWorkingOnMyRegion: false,
    didntFindWhatINeeded: false,
    pricesHigherThanAlternatives: false,
    didntLikeApp: false,
    didntFeelSafe: false,
    ratherUseAnotherApp: false,
  } as DeleteAccountPayload);
  // handlers
  const deleteAccount = () => {
    api
      .auth()
      .deleteAccount(survey)
      .then(() => {
        router.replace('/welcome/');
      })
      .catch((error) => {
        showToast('Não foi possível excluir sua conta. Tente novamente', 'error');
        console.error(error);
      });
  };
  // UI
  const title = 'Excluir conta';
  return (
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="lg">Tem certeza que deseja excluir sua conta?</DefaultText>
      <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.sm }} color="neutral700">
        Todos os seus dados serão apagados do nosso sistema, juntamente com seu histórico de
        pedidos, e você terá que criar um novo cadastro para usar o AppJusto.
      </DefaultText>
      <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.sm }} color="neutral700">
        Se você estiver certo disso, pode contar para a gente por que está excluindo sua conta?
      </DefaultText>
      <View style={{ marginTop: paddings.xl }}>
        <CheckButton
          checked={Boolean(survey.notWorkingOnMyRegion)}
          title="Não atende na minha região"
          onPress={() =>
            setSurvey({ ...survey, notWorkingOnMyRegion: !survey.notWorkingOnMyRegion })
          }
        />
        <CheckButton
          style={{ marginTop: paddings.md }}
          checked={Boolean(survey.didntLikeApp)}
          title="Não gostei do app"
          onPress={() => setSurvey({ ...survey, didntLikeApp: !survey.didntLikeApp })}
        />
        <CheckButton
          style={{ marginTop: paddings.md }}
          checked={Boolean(survey.didntFeelSafe)}
          title="Não me senti seguro"
          onPress={() => setSurvey({ ...survey, didntFeelSafe: !survey.didntFeelSafe })}
        />
        <CheckButton
          style={{ marginTop: paddings.md }}
          checked={Boolean(survey.ratherUseAnotherApp)}
          title="Prefiro usar outro app"
          onPress={() => setSurvey({ ...survey, ratherUseAnotherApp: !survey.ratherUseAnotherApp })}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View>
        <DefaultButton title="Excluir conta" variant="destructive" onPress={deleteAccount} />
        <LinkButton style={{ alignSelf: 'center' }} variant="ghost" onPress={() => router.back()}>
          Cancelar
        </LinkButton>
      </View>
    </DefaultScrollView>
  );
}
