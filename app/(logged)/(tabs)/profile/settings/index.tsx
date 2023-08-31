import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ConfirmModal } from '@/common/components/modals/confirm-modal';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { Bell, ChevronRight, HardHat, XCircle } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function ProfileSettings() {
  // context
  // const api = useContextApi();
  const router = useRouter();
  // state
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  // UI
  return (
    <View style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Configurações' }} />
      <ConfirmModal
        visible={deleteAccountModalVisible}
        text="Tem certeza que deseja excluir sua conta?"
        cancelButtonLabel="Não, quero manter a conta"
        onConfirm={() => {
          // api.auth().deleteAccount({});
          // TODO: move to new screen
          setDeleteAccountModalVisible(false);
        }}
        onCancel={() => setDeleteAccountModalVisible(false)}
      />
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
        <DefaultListItem
          title="Excluir conta"
          subtitles={['Apagar sua conta e seu histórico de corridas']}
          leftView={<XCircle color={colors.black} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => setDeleteAccountModalVisible(true)}
        />
      </View>
    </View>
  );
}
