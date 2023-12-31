// import * as Application from 'expo-application';
import { version } from '../../version.json';

export const getAppVersion = () => {
  return version;
};

// export const getNativeAndManifestVersion = () => {
//   return `${Application.nativeApplicationVersion ?? ''} / ${getAppVersion()}`;
// };

export const isCurrentVersionAllowed = (minVersion: string) => {
  return (
    getAppVersion().localeCompare(minVersion, undefined, {
      numeric: true,
      sensitivity: 'base',
    }) >= 0
  );
};
