import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, router } from 'expo-router';
import { View } from 'react-native';

export default function SubmittedIndex() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  const profile = useContextProfile();
  let issues = (profile?.profileIssues ?? []).map((value) =>
    typeof value === 'string' ? value : value.title
  );
  const rejectedDuePrevious = Boolean(
    profile?.profileIssues?.find(
      (issue) =>
        typeof issue === 'object' && issue.id === 'courier-profile-invalid-phone-already-in-use'
    )
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
            {!rejectedDuePrevious
              ? 'Você pode resolver as pendências, fazer alterações neste mesmo cadastro, reenviá-lo e então ele será novamente analisado. '
              : 'Para você acessar seu cadastro anterior associado a esse telefone, será preciso refazer o login.'}
          </DefaultText>
          <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
            Se você tiver dúvidas, nosso time de atendimento está aqui pra te ajudar!
          </DefaultText>

          <View style={{ flex: 1 }} />
          {!rejectedDuePrevious ? (
            <DefaultButton
              style={{ marginTop: paddings.lg }}
              title="Alterar cadastro"
              onPress={fixProfile}
            />
          ) : (
            <DefaultButton
              style={{ marginTop: paddings.lg }}
              title="Refazer login"
              onPress={() => router.replace('/welcome/')}
            />
          )}
          <DefaultButton
            style={{ marginTop: paddings.md }}
            variant="outline"
            title="Falar com o suporte"
            onPress={() => openWhatsAppSupportURL('Cadastro reprovado')}
          />
        </View>
      </DefaultScrollView>
    </View>
  );
}
