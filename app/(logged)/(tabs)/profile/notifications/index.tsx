import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { optionalChannels } from '@/common/notifications/channels';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { NotificationChannel } from '@appjusto/types';
import { Stack } from 'expo-router';
import { without } from 'lodash';
import { View } from 'react-native';

export default function ProfileNotifications() {
  // context
  const api = useContextApi();
  // state
  const profile = useProfile();
  // handlers
  const toggleNotificationPreference = (channel: NotificationChannel) => {
    if (!profile?.id) return;
    const { notificationPreferences = [] } = profile;
    api
      .getProfile()
      .updateProfile(profile.id, {
        notificationPreferences: notificationPreferences.includes(channel)
          ? without(notificationPreferences, channel)
          : [...notificationPreferences, channel],
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // UI
  const title = 'Notificações';
  if (!profile) return <Loading title={title} />;
  return (
    <DefaultScrollView style={{ ...screens.profile, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="2xl">Escolha as notificações que recebe do AppJusto</DefaultText>
      <DefaultText style={{ marginTop: paddings.sm }} size="sm" color="gray700">
        Para garantir a melhor experiência, as mensagens durante o pedido sempre são enviadas.
      </DefaultText>
      <View style={{ marginTop: paddings.xl }}>
        {optionalChannels.map(({ id, name, description }) => (
          <View key={id} style={{ marginBottom: paddings.lg }}>
            <CheckButton
              checked={profile?.notificationPreferences?.includes(id) === true}
              title={name}
              onPress={() => toggleNotificationPreference(id)}
            />
            <DefaultText size="xs" color="green700" style={{ marginTop: paddings.xs }}>
              {description}
            </DefaultText>
          </View>
        ))}
      </View>
    </DefaultScrollView>
  );
}
