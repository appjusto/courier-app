import { LatLng } from '@appjusto/types';
import { Location } from 'react-native-background-geolocation';

export const latlngFromLocation = (location: Location) => {
  try {
    return { latitude: location.coords.latitude, longitude: location.coords.longitude } as LatLng;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
};
