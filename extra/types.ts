import { Environment } from '@appjusto/types';

export interface AlgoliaConfig {
  appId: string;
  apiKey: string;
}
export interface Extra {
  env: Environment;
  firebase: {
    region: string;
    emulator: {
      host?: string;
    };
    appCheckAndroidDebugToken?: string;
    appCheckIosDebugToken?: string;
  };
  algolia: AlgoliaConfig;
  eas: {
    projectId: string;
  };
  location: {
    secret: string;
  };
}
