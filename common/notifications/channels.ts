import { NotificationChannel } from '@appjusto/types';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import colors from '../styles/colors';

export const optionalChannels = [
  {
    id: 'status' as NotificationChannel,
    name: 'Comunicações operacionais',
    description: 'Para saber sobre atualizações do App e questões operacionais',
    sound: undefined,
    bypassDnd: false,
  },
  {
    id: 'general' as NotificationChannel,
    name: 'Comunicações institucionais',
    description:
      'Para conhecer mais sobre o AppJusto: propósito, impacto, crescimento, financiamento e mais',
    sound: undefined,
    bypassDnd: false,
  },
  {
    id: 'marketing' as NotificationChannel,
    name: 'Promoções e ofertas',
    description: 'Para avisar quando houver alguma promoção ou oferta disponível para você',
    sound: undefined,
    bypassDnd: false,
  },
];

const requiredChannels = [
  {
    id: 'order-request' as NotificationChannel,
    name: 'Novas corridas',
    sound: 'order_request.wav',
    bypassDnd: true,
  },
  {
    id: 'order-update' as NotificationChannel,
    name: 'Atualizações do pedido',
    sound: undefined,
    bypassDnd: true,
  },
  {
    id: 'order-chat' as NotificationChannel,
    name: 'Chat durante a entrega',
    sound: undefined,
    bypassDnd: true,
  },
  {
    id: 'profile-update' as NotificationChannel,
    name: 'Atualizações de perfil',
    sound: undefined,
    bypassDnd: true,
  },
];

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export const setupChannels = async () => {
  if (Platform.OS === 'android') {
    await [...optionalChannels, ...requiredChannels].reduce(
      async (p, { id, name, sound, bypassDnd }) => {
        await p;
        const config: Notifications.NotificationChannelInput = {
          name,
          sound,
          bypassDnd,
          enableVibrate: true,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: colors.green100,
          importance: Notifications.AndroidImportance.MAX,
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        };
        await Notifications.setNotificationChannelAsync(id, config);
      },
      Promise.resolve()
    );
  }
};
