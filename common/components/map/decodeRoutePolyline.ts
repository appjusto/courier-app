import { LatLng } from '@appjusto/types';
import polyline from '@mapbox/polyline';
import crashlytics from '@react-native-firebase/crashlytics';

export const decodeRoutePolyline = (value?: string) => {
  if (!value) return [];
  try {
    return polyline.decode(value).map((pair) => {
      return { latitude: pair[0], longitude: pair[1] } as LatLng;
    });
  } catch (error: unknown) {
    if (error instanceof Error) crashlytics().recordError(error);
  }
  return [];
};
