import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { optionalChannels } from '@/common/notifications/channels';
import lineHeight from '@/common/styles/lineHeight';
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
  const profile = useContextProfile();
  // tracking
  useTrackScreenView('Sua conta: Notificações');
  // handlers
  const toggleNotificationPreference = (channel: NotificationChannel) => {
    if (!profile) return;
    const { notificationPreferences = [] } = profile;
    api
      .profile()
      .updateProfile({
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
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="lg">Configure suas notificações</DefaultText>
      <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.sm }} color="neutral700">
        Para garantia de qualidade da operação, as notificações relacionadas aos pedidos sempre vão
        aparecer, ok?
      </DefaultText>
      <View style={{ marginTop: paddings.xl }}>
        {optionalChannels.map(({ id, name, description }) => (
          <View key={id} style={{ marginBottom: paddings.lg }}>
            <CheckButton
              checked={profile?.notificationPreferences?.includes(id) === true}
              title={name}
              onPress={() => toggleNotificationPreference(id)}
            />
            <DefaultText
              size="xs"
              style={{ marginTop: paddings.sm, ...lineHeight.xs, marginLeft: 27 }}
            >
              {description}
            </DefaultText>
          </View>
        ))}
      </View>
    </DefaultScrollView>
  );
}
