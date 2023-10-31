import { useContextLocation } from '@/api/location/context/LocationContext';
import { LatLng } from '@appjusto/types';
import { RefObject, forwardRef, useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import MapView, { MapViewProps, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { decodeRoutePolyline } from './decodeRoutePolyline';
import { CourierMarker } from './markers/courier-marker';
import { DestinationMarker } from './markers/destination-marker';
import { PackageMarker } from './markers/package-marker';
import { NavigationIcons } from './navigation-icons/navigation-icons';

interface Props extends MapViewProps {
  origin?: LatLng | null;
  destination?: LatLng | null;
  polyline?: string;
  navigationTo?: LatLng | null;
}

export const DefaultMap = forwardRef(
  (
    { origin, destination, polyline, navigationTo, style, children, ...props }: Props,
    externalRef
  ) => {
    // context
    const location = useContextLocation();
    // refs
    const internalRef = useRef<MapView>(null);
    const ref = (externalRef as RefObject<MapView>) || internalRef;
    // state
    const [mapReady, setMapReady] = useState(false);
    const [coordinates, setCoordinates] = useState<LatLng[]>();
    // side effects
    useEffect(() => {
      setCoordinates(decodeRoutePolyline(polyline));
    }, [mapReady, polyline]);
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
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref}
          style={[{ flex: 1, minHeight: 30, minWidth: 30 }, style]}
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
          {location ? (
            <Marker key="location" coordinate={location} tracksViewChanges={false}>
              <CourierMarker />
            </Marker>
          ) : null}
          {origin ? (
            <Marker key="origin" coordinate={origin} tracksViewChanges={false}>
              <PackageMarker />
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
        {navigationTo ? <NavigationIcons to={navigationTo} /> : null}
      </View>
    );
  }
);
