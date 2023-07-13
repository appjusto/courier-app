import { ConfigContext, ExpoConfig } from 'expo/config';
import { version, versionCode } from './version.json';

const env = process.env.EXPO_PUBLIC_ENV;
const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;

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
    bundleIdentifier: appBundlePackage(),
    buildNumber: `${versionCode}`,
    supportsTablet: false,
  },
  android: {
    package: appBundlePackage(),
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
  updates: {
    url: `https://u.expo.dev/${projectId}`,
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  extra: {
    eas: {
      projectId,
    },
  },
});

const name = () => {
  const name = 'AppJusto Entregador';
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

const appBundlePackage = () => {
  return `br.com.appjusto.courier.${env}`;
};
