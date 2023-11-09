import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useContextProfile } from '@/common/auth/AuthContext';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { RoundedView } from '@/common/components/containers/RoundedView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { ShowToast } from '@/common/components/toast/Toast';
import { HR } from '@/common/components/views/HR';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { onSimulator } from '@/common/version/device';
import { CourierStatus } from '@appjusto/types';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import { router } from 'expo-router';
import { ArrowUpRight } from 'lucide-react-native';
import { Pressable, Switch, View } from 'react-native';
import Selfie from '../../profile/images/selfie';
import { ProfileStatusBadge } from './status-badge';

export const HomeHeader = () => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
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
    <View>
      <View
        style={{
          padding: paddings.lg,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          delayLongPress={2000}
          onPress={() => router.push('/profile/public')}
          onLongPress={() => {
            trackEvent('LongPressAnalytics');
            inAppMessaging()
              .triggerEvent('LongPressTrigger')
              .then(() => {
                ShowToast('LongPress!');
              })
              .catch((error) => {
                ShowToast(JSON.stringify(error));
              });
          }}
        >
          <View>
            <Selfie />
            <RoundedView
              style={{
                position: 'absolute',
                width: 16,
                height: 16,
                right: 0,
                bottom: 0,
                backgroundColor: colors.white,
                borderColor: colors.neutral200,
                borderWidth: 1,
              }}
            >
              <ArrowUpRight size={10} color={colors.black} />
            </RoundedView>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/profile/public')}>
          <View style={{ marginLeft: paddings.md, flexDirection: 'column' }}>
            <DefaultText size="md">{profile.name}</DefaultText>
            <LinkButton
              size="xxs"
              onPress={() => router.push('/profile/public')}
              style={{ padding: 0 }}
            >
              Ver Perfil
            </LinkButton>
            <DefaultText
              style={{ marginTop: paddings['2xs'] }}
              size="xxs"
              color="neutral700"
            >{`#${profile.code}`}</DefaultText>
          </View>
        </Pressable>
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
      <HR
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      />
    </View>
  );
};
