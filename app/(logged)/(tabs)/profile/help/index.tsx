import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { URL_APPJUSTO_FRESHDESK_COURIERS, URL_APPJUSTO_WHATSAPP } from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight, HardHat, HelpCircle, MessageCircle } from 'lucide-react-native';
import { Linking } from 'react-native';

export default function HelpScreen() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Ajuda' }} />
      <DefaultListItem
        title="Como funciona o AppJusto"
        subtitles={[
          'Aprovação, pagamento, frotas, bloqueios, segurança e tudo mais que você precisa saber',
        ]}
        leftView={<HardHat color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => router.push('/profile/howitworks/')}
      />
      <DefaultListItem
        title="Central de Ajuda"
        subtitles={['Página com artigos sobre a plataforma']}
        leftView={<HelpCircle color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_FRESHDESK_COURIERS)}
      />
      <DefaultListItem
        title="Contato com o suporte"
        subtitles={['Entre em contato via WhatsApp']}
        leftView={<MessageCircle color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_WHATSAPP)}
      />
    </DefaultScrollView>
  );
}
