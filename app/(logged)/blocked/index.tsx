import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function BlockedIndex() {
  // context
  const profile = useContextProfile();
  // track
  useTrackScreenView('Cadastro bloqueado', profile?.situation === 'blocked');
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <DefaultScrollView>
        <FeedbackHeader title="Seu cadastro está desabilitado" text={[]} variant="error" />
        <View
          style={{
            flex: 1,
            paddingVertical: paddings['2xl'],
            paddingHorizontal: paddings.lg,
            backgroundColor: colors.neutral50,
          }}
        >
          <DefaultText size="lg">Acredita que houve uma falha?</DefaultText>
          <DefaultText style={{ marginTop: paddings.sm, ...lineHeight.md }} size="md">
            Se você acredita que houve uma falha, entre em contato com nosso suporte.
          </DefaultText>
          <View style={{ flex: 1 }} />
          <DefaultButton
            title="Falar com o suporte"
            onPress={() => openWhatsAppSupportURL('Cadastro bloqueado')}
          />
        </View>
      </DefaultScrollView>
    </View>
  );
}
