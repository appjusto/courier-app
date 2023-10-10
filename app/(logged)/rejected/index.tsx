import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { URL_APPJUSTO_WHATSAPP } from '@/common/constants/urls';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack } from 'expo-router';
import { Linking, View } from 'react-native';

export default function SubmittedIndex() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  const profile = useContextProfile();
  let issues = (profile?.profileIssues ?? []).map((value) =>
    typeof value === 'string' ? value : value.title
  );
  if (profile?.profileIssuesMessage) issues = [...issues, profile.profileIssuesMessage];
  if (!issues?.length) issues = ['Entre em contato com nosso suporte'];
  // state
  // track
  useTrackScreenView('Cadastro reprovado', { issues }, profile?.situation === 'rejected');
  // handlers
  const fixProfile = () => {
    api
      .profile()
      .fixProfile()
      .catch((error: unknown) => {
        console.error(error);
        if (error instanceof Error) crashlytics().recordError(error);
        showToast(
          'Não foi possível alterar seu cadastro. Entre em contato com nosso suporte.',
          'error'
        );
      });
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <DefaultScrollView>
        <FeedbackHeader title="Seu cadastro precisa de correções" text={issues} variant="error" />
        <View
          style={{
            flex: 1,
            paddingVertical: paddings['2xl'],
            paddingHorizontal: paddings.lg,
            backgroundColor: colors.neutral50,
          }}
        >
          <DefaultText size="lg">Bora tentar de novo?</DefaultText>
          <DefaultText style={{ marginTop: paddings.sm, ...lineHeight.md }} size="md">
            Você pode resolver as pendências, fazer alterações neste mesmo cadastro, reenviá-lo e
            então ele será novamente analisado.
          </DefaultText>
          <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
            Se você tiver dúvidas, nosso time de atendimento está aqui pra te ajudar!
          </DefaultText>
          <View style={{ flex: 1 }} />
          <DefaultButton title="Alterar cadastro" onPress={fixProfile} />
          <DefaultButton
            style={{ marginTop: paddings.md }}
            variant="outline"
            title="Falar com o suporte"
            onPress={() => Linking.openURL(URL_APPJUSTO_WHATSAPP)}
          />
        </View>
      </DefaultScrollView>
    </View>
  );
}
