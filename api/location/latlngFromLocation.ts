import { LatLng } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { Location } from 'react-native-background-geolocation';

export const latlngFromLocation = (location: Location) => {
  try {
    return { latitude: location.coords.latitude, longitude: location.coords.longitude } as LatLng;
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
    return undefined;
  }
};
