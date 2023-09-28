import { LatLng } from '@appjusto/types';

export const getGoogleMapsNavigationLink = (location: LatLng | undefined) =>
  location
    ? `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&dir_action=navigate`
    : 'https://www.google.com/maps/search/?api=1';

export const getWazeNavigationLink = (location: LatLng | undefined) =>
  location
    ? `https://www.waze.com/ul?ll=${location.latitude}%2C${location.longitude}&navigate=yes&zoom=17`
    : 'https://waze.com/ul';
