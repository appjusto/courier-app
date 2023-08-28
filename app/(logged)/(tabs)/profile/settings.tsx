import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { Bell, ChevronRight, HardHat } from 'lucide-react-native';
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
          leftView={<HardHat color={colors.black} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/fleets/')}
        />
        <DefaultListItem
          title="Notificações"
          subtitles={['Escolha as notificações que você quer receber']}
          leftView={<Bell color={colors.black} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/notifications')}
        />
      </View>
    </View>
  );
}
