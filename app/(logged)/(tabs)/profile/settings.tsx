import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';

export default function ProfileSettings() {
  // context
  const router = useRouter();
  // UI
  return (
    <View style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Configurações' }} />
      <View style={{ flex: 1 }}>
        <DefaultListItem
          title="Escolha sua frota"
          subtitles={['Na frota é onde as condições de participação são definidas']}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => null}
        />
        <DefaultListItem
          title="Notificações"
          subtitles={['Escolha as notificações que você quer receber']}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/notifications')}
        />
      </View>
    </View>
  );
}
