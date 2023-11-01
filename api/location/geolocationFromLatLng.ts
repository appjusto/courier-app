import { LatLng } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import { hash } from 'geokit';

export const geolocationFromLatLng = (latlng: LatLng) => {
  const location = new firestore.GeoPoint(latlng.latitude, latlng.longitude);
  return {
    coordinates: location,
    g: {
      geopoint: location,
      geohash: hash({
        lat: location.latitude,
        lng: location.longitude,
      }),
    },
  };
};
