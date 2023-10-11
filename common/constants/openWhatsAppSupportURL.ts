import { trackEvent } from '@/api/analytics/track';
import { Linking } from 'react-native';
import { URL_APPJUSTO_WHATSAPP } from './urls';

export const openWhatsAppSupportURL = (from: string) => {
  Linking.openURL(URL_APPJUSTO_WHATSAPP);
  trackEvent('Inicou suporte', { from });
};
