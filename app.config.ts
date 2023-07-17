import { Environment } from '@appjusto/types';
import { ConfigContext, ExpoConfig } from 'expo/config';
import { Extra } from './extra/types';
import { version, versionCode } from './version.json';

const env = process.env.EXPO_PUBLIC_ENV as Environment;
const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
const domain = `${env === 'live' ? '' : `${env}.`}appjusto.com.br`;

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
    googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES_PLIST,
    associatedDomains: [`applinks:${domain}`, 'appjusto.ngrok.io'],
  },
  android: {
    package: appBundlePackage(),
    versionCode,
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES_JSON,
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: domain,
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'appjusto.ngrok.io',
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  plugins: [
    'expo-router',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        android: {
          enableProguardInReleaseBuilds: false,
        },
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
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
    env,
    firebase: {
      emulator: {
        host: process.env.EXPO_PUBLIC_FIREBASE_EMULATOR,
      },
      region: 'southamerica-east1',
    },
    eas: {
      projectId,
    },
  } as Extra,
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
