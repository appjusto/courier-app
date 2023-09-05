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
    infoPlist: {
      UIBackgroundModes: ['remote-notification', 'location', 'audio', 'fetch', 'processing'],
      BGTaskSchedulerPermittedIdentifiers: [
        'com.transistorsoft.fetch',
        'com.transistorsoft.customtask',
      ],
      NSUserTrackingUsageDescription:
        'Precisamos da sua localização para enviar corridas próximas e monitorar a entrega.',
      NSLocationWhenInUseUsageDescription:
        'Precisamos da sua localização para enviar corridas próximas e monitorar a entrega.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Precisamos da sua localização para enviar corridas próximas e monitorar a entrega.',
      NSMotionUsageDescription:
        'Usamos detecção de movimentos para identificar seu meio de locomoção.',
    },
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
    'expo-localization',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/crashlytics',
    [
      'expo-image-picker',
      {
        photosPermission: 'Para o envio de selfie e documento',
        cameraPermission: 'Para o envio de selfie e documento',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/images/notification-icon.png',
        sounds: ['./assets/sounds/order_request.wav'],
      },
    ],
    'react-native-background-geolocation',
    [
      'expo-gradle-ext-vars',
      {
        googlePlayServicesLocationVersion: '20.0.0',
        appCompatVersion: '1.4.2',
      },
    ],
    'react-native-background-fetch',
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
    algolia: {
      appId: process.env.EXPO_PUBLIC_ALGOLIA_APPID,
      apiKey: process.env.EXPO_PUBLIC_ALGOLIA_APIKEY,
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
