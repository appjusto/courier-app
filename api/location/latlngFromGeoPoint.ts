import { LatLng } from '@appjusto/types';
import { GeoPoint } from '@appjusto/types/external/firebase';
import crashlytics from '@react-native-firebase/crashlytics';

export const latlngFromGeopoint = (geopoint: GeoPoint) => {
  try {
    return { latitude: geopoint.latitude, longitude: geopoint.longitude } as LatLng;
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
    throw error;
  }
};
