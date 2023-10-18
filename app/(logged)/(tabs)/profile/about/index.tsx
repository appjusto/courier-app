import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import {
  URL_APPJUSTO_GITHUB,
  URL_APPJUSTO_INSTAGRAM,
  URL_APPJUSTO_SITE,
} from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { getAppVersion } from '@/common/version';
import { getDeviceVersion } from '@/common/version/device';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight, FileText, Instagram, Laptop, SquareCode } from 'lucide-react-native';
import { Linking, View } from 'react-native';

export default function ProfileAbout() {
  // context
  const router = useRouter();
  // tracking
  useTrackScreenView('Sobre');
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Sobre o AppJusto' }} />
      <DefaultListItem
        title="Site oficial"
        subtitles={['Acesse nosso site']}
        leftView={<Laptop color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_SITE)}
      />
      <DefaultListItem
        title="Instagram"
        subtitles={['Acesse nosso perfil no Instagram']}
        leftView={<Instagram color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_INSTAGRAM)}
      />
      <DefaultListItem
        title="Termos de uso"
        subtitles={['Leia os termos de uso da plataforma']}
        leftView={<FileText color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => router.push('/profile/about/terms')}
      />
      <DefaultListItem
        title="Política de privacidade"
        subtitles={['Leia nossa política de privacidade']}
        leftView={<FileText color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => router.push('/profile/about/privacy')}
      />
      <DefaultListItem
        title="Código-fonte"
        subtitles={['O código do nosso aplicativo é público']}
        leftView={<SquareCode color={colors.black} size={20} />}
        rightView={<ChevronRight size={16} color={colors.neutral800} />}
        onPress={() => Linking.openURL(URL_APPJUSTO_GITHUB)}
      />
      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="smartphone" />}
          title={`Versão: ${getAppVersion()}`}
          subtitle={getDeviceVersion()}
        />
      </View>
    </DefaultScrollView>
  );
}
