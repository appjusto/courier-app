import { useContextInitialLocation } from '@/api/location/context/useContextInitialLocation';
import { LatLng, RouteDetails } from '@appjusto/types';
import { RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import MapView, { MapViewProps, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { decodeRoutePolyline } from './decodeRoutePolyline';
import { DestinationMarker } from './destination-marker';
import { OriginMarker } from './origin-marker';

interface Props extends MapViewProps {
  origin?: LatLng;
  destination?: LatLng;
  route?: RouteDetails;
}

export const DefaultMap = forwardRef(
  ({ origin, destination, route, style, children, ...props }: Props, externalRef) => {
    // context
    const location = useContextInitialLocation();
    // refs
    const internalRef = useRef<MapView>(null);
    const ref = (externalRef as RefObject<MapView>) || internalRef;
    // state
    const [mapReady, setMapReady] = useState(false);
    const [coordinates, setCoordinates] = useState<LatLng[]>();
    // side effects
    useEffect(() => {
      setCoordinates(decodeRoutePolyline(route?.polyline));
    }, [mapReady, route]);
    useEffect(() => {
      if (!mapReady) return;
      // const coordinates = decodeRoutePolyline(route?.polyline);
      // const coords = coordinates.concat(origin ?? []).concat(destination ?? []);
      const coords = ([] as LatLng[])
        .concat(origin ?? [])
        .concat(destination ?? [])
        .concat(location ?? []);
      ref.current?.fitToCoordinates(coords, {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }, [ref, origin, destination, mapReady, location]);
    // UI
    return (
      <MapView
        ref={ref}
        style={[{ flex: 1 }, style]}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          origin
            ? {
                ...origin,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }
            : undefined
        }
        onMapReady={() => setMapReady(true)}
        {...props}
      >
        {children}
        {/* https://github.com/react-native-maps/react-native-maps/issues/3823 */}
        {origin ? (
          <Marker key="origin" coordinate={origin} tracksViewChanges={false}>
            <OriginMarker />
          </Marker>
        ) : null}
        {destination ? (
          <Marker key="destination" coordinate={destination} tracksViewChanges={false}>
            <DestinationMarker />
          </Marker>
        ) : null}
        {coordinates && Platform.OS === 'android' ? (
          <Polyline coordinates={coordinates} lineCap="square" lineDashPattern={[1]} />
        ) : null}
        {coordinates && Platform.OS === 'ios' ? <Polyline coordinates={coordinates} /> : null}
      </MapView>
    );
  }
);
