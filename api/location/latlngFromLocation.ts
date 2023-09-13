import { LatLng } from '@appjusto/types';
import { Location } from 'react-native-background-geolocation';

export const latlngFromLocation = (location: Location): LatLng => {
  return { latitude: location.coords.latitude, longitude: location.coords.longitude };
};
