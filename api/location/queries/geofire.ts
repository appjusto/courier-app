import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as geofire from 'geofire-common';
import { LatLng } from 'react-native-maps';
import Geohash from './Geohash';
import { GeofirePoint } from './types';

interface Options {
  location: LatLng;
  getQuery: (
    startAt: string,
    endAt: string
  ) => FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;
}

export async function getDocumentsAround({ location, getQuery }: Options) {
  try {
    // Find business within 7km of user
    const center = [location.latitude, location.longitude] as GeofirePoint;
    const radiusInM = 10 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = getQuery(b[0], b[1]);
      promises.push(q.get());
    }

    // Collect all the query results together into a single list
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const geohash: string = doc.get('g.geohash');
        const { lat, lng } = Geohash.decode(geohash);

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  } catch (error) {
    console.log('getDocumentsAround error: ', error);
    return [];
  }
}
