import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import { CourierMode, LatLng, QueryGoogleMapsPayload, RouteDetails } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';

// functions
const region = getFirebaseRegion();
const queryGoogleMaps = firebase.app().functions(region).httpsCallable('queryGoogleMaps');

export default class MapsApi {
  // async googlePlacesAutocomplete(input: string, sessionToken: string, coords?: LatLng) {
  //   const payload: QueryGoogleMapsPayload = {
  //     operation: 'autocomplete',
  //     flavor: 'courier',
  //     input,
  //     sessionToken,
  //     coords,
  //     meta: { version: getAppVersion() },
  //   };
  //   try {
  //     console.warn('MapsApi.googlePlacesAutocomplete: ', input, coords);
  //     return (await queryGoogleMaps(payload)).data as Address[];
  //   } catch (error: any) {
  // if (error instanceof Error) crashlytics().recordError(error);
  // throw new Error('Não foi possível obter sua localização.');
  //   }
  // }

  // async googleGeocode(address: string) {
  //   const payload: QueryGoogleMapsPayload = {
  //     operation: 'geocode',
  //     flavor: 'courier',
  //     address,
  //     meta: { version: getAppVersion() },
  //   };
  //   try {
  //     console.warn('MapsApi.googleGeocode: ', address);
  //     return (await queryGoogleMaps(payload)).data as LatLng;
  //   } catch (error: any) {
  //     console.warn(error);
  //     return null;
  //   }
  // }

  // async googleReverseGeocode(coords: LatLng) {
  //   const payload: QueryGoogleMapsPayload = {
  //     operation: 'reverse-geocode',
  //     flavor: 'courier',
  //     coords,
  //     meta: { version: getAppVersion() },
  //   };
  //   try {
  //     console.warn('MapsApi.googleReverseGeocode: ', coords);
  //     return (await queryGoogleMaps(payload)).data as Address;
  //   } catch (error: any) {
  //     console.warn(error);
  //     return null;
  //   }
  // }

  async googleDirections(
    origin: string | LatLng,
    destination: string | LatLng,
    mode: CourierMode = 'motorcycle'
  ) {
    const payload: QueryGoogleMapsPayload = {
      operation: 'directions',
      flavor: 'courier',
      origin,
      destination,
      mode,
      meta: { version: getAppVersion() },
    };
    console.warn('MapsApi.googleDirections: ', origin, destination);
    try {
      const result = await queryGoogleMaps(payload);
      return result.data as RouteDetails;
    } catch (error: any) {
      if (error instanceof Error) crashlytics().recordError(error);
      throw new Error('Não foi possível traçar a rota.');
    }
  }
}
