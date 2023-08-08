import { NotificationChannel } from '@appjusto/types';

export const notificationChannels = [
  {
    channel: 'status' as NotificationChannel,
    title: 'Comunicações operacionais',
    description: 'Para saber sobre atualizações do App e questões operacionais',
  },
  {
    channel: 'general' as NotificationChannel,
    title: 'Comunicações institucionais',
    description:
      'Para conhecer mais sobre o AppJusto: propósito, impacto, crescimento, financiamento e mais',
  },
  {
    channel: 'marketing' as NotificationChannel,
    title: 'Promoções e ofertas',
    description: 'Para avisar quando houver alguma promoção ou oferta disponível para você',
  },
];
