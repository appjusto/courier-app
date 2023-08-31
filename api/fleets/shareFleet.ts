import { getDomain } from '@/common/constants/urls';
import { Fleet, WithId } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { Share } from 'react-native';

export const shareFleet = async (fleet: WithId<Fleet>) => {
  try {
    const fleetDeeplink = `https://${getDomain()}/f/${fleet.id}`;
    Share.share({
      message: `Eu faço parte da ${fleet.name} no AppJusto, app criado para combater a exploração dos entregadores. Faça parte dessa frota também: ${fleetDeeplink}`,
      title: 'AppJusto',
      url: fleetDeeplink,
    });
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
};
