import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useContextLocation } from '@/api/location/context/LocationContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { ShowToast } from '@/common/components/toast/Toast';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { getAppVersion } from '@/common/version';
import { onSimulator } from '@/common/version/device';
import { CourierStatus } from '@appjusto/types';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { Pressable, Switch, View } from 'react-native';
import Selfie from '../../profile/images/selfie';
import { ProfileStatusBadge } from './status-badge';

export const HomeHeader = () => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const location = useContextLocation();
  const status = profile?.status;
  const working = status === 'available' || status === 'dispatching';
  const showToast = useShowToast();
  // handlers
  const toggleWorking = () => {
    if (!profile) return;
    if (status === 'inactive') return;
    if (status === 'dispatching') {
      showToast('Você precisa finalizar a entrega antes de parar de trabalhar.', 'warning');
      return;
    }
    const newStatus: CourierStatus = status === 'available' ? 'unavailable' : 'available';
    trackEvent(newStatus === 'available' ? 'Ficou disponível' : 'Ficou indisponível');
    api
      .profile()
      .updateProfile({ status: newStatus })
      .catch((error) => {
        const message = handleErrorMessage(error);
        showToast(message, 'error');
      });
    if (!onSimulator() && !profile.notificationToken) {
      // TODO: notificar
    }
  };
  // UI
  if (!profile) return null;
  return (
    <View style={{ padding: paddings.lg, flexDirection: 'row', alignItems: 'center' }}>
      <Pressable
        delayLongPress={1000}
        onLongPress={() => {
          inAppMessaging()
            .triggerEvent('Disponibilidade')
            .then(() => {
              ShowToast('triggerEvent: purchase');
            })
            .catch((error) => {
              ShowToast(JSON.stringify(error));
            });
        }}
      >
        <Selfie />
      </Pressable>
      <View style={{ marginLeft: paddings.md, flexDirection: 'column' }}>
        <DefaultText size="md">{profile.name}</DefaultText>
        <View>
          <DefaultText size="xxs" color="neutral700">{`ID #${profile.code}`}</DefaultText>
          <DefaultText size="xxs" color="neutral700">{`V${getAppVersion()}`}</DefaultText>
          <DefaultText size="xxs" color="neutral700">
            {location
              ? `${location.latitude.toFixed(6)},${location.longitude.toFixed(6)}`
              : 'sem localização'}
          </DefaultText>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <Switch
        trackColor={{ false: colors.neutral200, true: colors.black }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.white}
        onValueChange={toggleWorking}
        value={working}
      />
      <ProfileStatusBadge style={{ marginLeft: paddings.xs }} />
    </View>
  );
};
