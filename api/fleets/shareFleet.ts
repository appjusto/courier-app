import { getDomain } from '@/common/constants/urls';
import crashlytics from '@react-native-firebase/crashlytics';
import { Share } from 'react-native';

export const shareFleet = async (fleetId: string, fleetName: string) => {
  try {
    const fleetDeeplink = `https://${getDomain()}/fleets/${fleetId}`;
    Share.share({
      message: `Eu faço parte da ${fleetName} no AppJusto, app criado para combater a exploração dos entregadores. Faça parte dessa frota também: ${fleetDeeplink}`,
      title: 'AppJusto',
      url: fleetDeeplink,
    });
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
};
