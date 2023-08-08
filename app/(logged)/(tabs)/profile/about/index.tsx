import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { IconVersion } from '@/common/components/profile/about/version-icon';
import DefaultCard from '@/common/components/views/DefaultCard';
import {
  URL_APPJUSTO_FRESHDESK_COURIERS,
  URL_APPJUSTO_GITHUB,
  URL_APPJUSTO_INSTAGRAM,
  URL_APPJUSTO_SITE,
  URL_APPJUSTO_WHATSAPP,
} from '@/common/constants/urls';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { getAppVersion } from '@/common/version';
import { getDeviceVersion } from '@/common/version/device';
import { Stack, useRouter } from 'expo-router';
import { Linking, View } from 'react-native';

export default function ProfileAbout() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView style={{ ...screens.profile }}>
      <Stack.Screen options={{ title: 'Sobre o AppJusto' }} />
      <DefaultListItem
        title="Como funciona o AppJusto"
        subtitles={[
          'Aprovação, pagamento, frotas, bloqueios, segurança e tudo mais que você precisa saber',
        ]}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/howitworks/')}
      />
      <DefaultListItem
        title="Central de Ajuda"
        subtitles={['Página com artigos sobre a plataforma']}
        rightView={<ArrowRightIcon />}
        onPress={() => Linking.openURL(URL_APPJUSTO_FRESHDESK_COURIERS)}
      />
      <DefaultListItem
        title="Contato com o suporte"
        subtitles={['Entre em contato com nosso suporte via WhatsApp']}
        rightView={<ArrowRightIcon />}
        onPress={() => Linking.openURL(URL_APPJUSTO_WHATSAPP)}
      />
      <DefaultListItem
        title="Site oficial"
        subtitles={['Acesse nosso site']}
        rightView={<ArrowRightIcon />}
        onPress={() => Linking.openURL(URL_APPJUSTO_SITE)}
      />
      <DefaultListItem
        title="Instagram"
        subtitles={['Acesse nosso perfil no Instagram']}
        rightView={<ArrowRightIcon />}
        onPress={() => Linking.openURL(URL_APPJUSTO_INSTAGRAM)}
      />
      <DefaultListItem
        title="Termos de uso"
        subtitles={['Leia os termos de uso da plataforma']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/about/terms')}
      />
      <DefaultListItem
        title="Política de privacidade"
        subtitles={['Leia nossa política de privacidade']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/about/privacy')}
      />
      <DefaultListItem
        title="Código-fonte"
        subtitles={['Sabia que o código do aplicativo é público? Confira!']}
        rightView={<ArrowRightIcon />}
        onPress={() => Linking.openURL(URL_APPJUSTO_GITHUB)}
      />
      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultCard
          icon={<IconVersion />}
          title={`Versão: ${getAppVersion()}`}
          subtitle={getDeviceVersion()}
        />
      </View>
    </DefaultScrollView>
  );
}
