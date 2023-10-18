import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function ComplaintFeedbackScreen() {
  // tracking
  useTrackScreenView('Denuncia enviada');
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Denúncia enviada' }} />
      <FeedbackHeader
        title="Denúncia enviada!"
        text={['Iremos analisar o seu caso e entraremos em contato em breve.']}
        variant="success"
      />
      <View style={{ flex: 1, padding: paddings.lg }}>
        <View style={{ flex: 1 }} />
        <Pressable onPress={() => openWhatsAppSupportURL('Denúncia enviada')}>
          <DefaultCard
            style={{ marginTop: paddings.lg }}
            icon={<DefaultCardIcon iconName="chat" />}
            title="Suporte AppJusto"
            subtitle="Fale com a gente através do nosso WhatsApp"
          />
        </Pressable>
        <DefaultButton
          style={{ marginVertical: paddings.xl }}
          title="Voltar"
          onPress={() => router.back()}
        />
      </View>
    </DefaultScrollView>
  );
}
