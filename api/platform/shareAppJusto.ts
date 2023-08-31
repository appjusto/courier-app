import { URL_APPJUSTO_SITE } from '@/common/constants/urls';
import crashlytics from '@react-native-firebase/crashlytics';
import { Share } from 'react-native';

export const shareAppJusto = async () => {
  try {
    Share.share({
      message: `O AppJusto é um app de entregas open-source que cobra menos dos restaurantes e dá autonomia a entregadores/as. Faça parte desse movimento! Saiba mais em: ${URL_APPJUSTO_SITE}`,
      title: 'AppJusto',
      url: URL_APPJUSTO_SITE,
    });
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
};
