import { ConfigContext, ExpoConfig } from 'expo/config';
import { version, versionCode } from './version.json';

const env = process.env.EXPO_PUBLIC_ENV;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'appjusto',
  privacy: 'hidden',
  name: name(),
  slug: slug(),
  version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: scheme(),
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#9ce592',
  },
  assetBundlePatterns: ['**/*'],
  notification: {
    icon: './assets/images/notification-icon.png',
  },
  ios: {
    buildNumber: `${versionCode}`,
    supportsTablet: false,
  },
  android: {
    versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: ['expo-router'],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
});

const name = () => {
  const name = 'Entregas';
  if (!env || env === 'live') return name;
  return `(${env.charAt(0).toUpperCase()}) ${name}`;
};

const slug = () => {
  const slug = `app-justo-courier`;
  if (!env || env === 'live') return slug;
  return `${slug}-${env}`;
};

const scheme = () => {
  const scheme = 'appjustocourier';
  if (!env || env === 'live') return scheme;
  return `${scheme}${env}`;
};
