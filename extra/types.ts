import { Environment } from '@appjusto/types';

export interface Extra {
  env: Environment;
  firebase: {
    region: string;
    emulator: {
      host?: string;
    };
  };
  eas: {
    projectId: string;
  };
}
