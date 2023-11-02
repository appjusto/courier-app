import { LatLng } from '@appjusto/types';
import firebase from '@react-native-firebase/firestore';
import { hash } from 'geokit';

export const geolocationFromLatLng = (latlng: LatLng) => {
  const location = new firebase.GeoPoint(latlng.latitude, latlng.longitude);
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
