import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import {
  URL_APPJUSTO_FAIRWORK_SITE,
  URL_APPJUSTO_FRESHDESK_COURIERS,
} from '@/common/constants/urls';
import { HelmetIcon } from '@/common/icons/helmet';
import colors from '@/common/styles/colors';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight, HelpCircle, Laptop, MessageCircle } from 'lucide-react-native';
import { Linking } from 'react-native';

export default function HelpScreen() {
  // context
  const router = useRouter();
  // tracking
  useTrackScreenView('Ajuda');
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Ajuda' }} />
      <DefaultListItem
        title="Como funciona o AppJusto"
        subtitles={[
          'Aprovação, pagamento, frotas, bloqueios, segurança e tudo mais que você precisa saber',
        ]}
        leftView={<HelmetIcon />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => router.push('/profile/howitworks/')}
      />
      <DefaultListItem
        title="Trabalho decente"
        subtitles={['Veja nossas iniciativas em prol do trabalho decente']}
        leftView={<Laptop color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_FAIRWORK_SITE)}
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
        onPress={() => openWhatsAppSupportURL('Perfil > Ajuda')}
      />
    </DefaultScrollView>
  );
}
