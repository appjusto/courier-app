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
    // refs
    const internalRef = useRef<MapView>(null);
    const ref = (externalRef as RefObject<MapView>) || internalRef;
    // state
    const [mapReady, setMapReady] = useState(false);
    const [coordinates, setCoordinates] = useState<LatLng[] | null>();
    // side effects
    useEffect(() => {
      setCoordinates(decodeRoutePolyline(route?.polyline));
    }, [mapReady, route]);
    useEffect(() => {
      if (!coordinates) return;
      ref.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 150,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }, [coordinates, ref]);
    // UI
    return (
      <MapView
        ref={ref}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => setMapReady(true)}
        style={[{ flex: 1 }, style]}
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
          <Polyline coordinates={coordinates} lineDashPattern={[1]} />
        ) : null}
        {coordinates && Platform.OS === 'ios' ? <Polyline coordinates={coordinates} /> : null}
      </MapView>
    );
  }
);
