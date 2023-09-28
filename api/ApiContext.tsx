import { useDeeplink } from '@/common/deeplink/useDeeplink';
import React from 'react';
import Api, { api } from './Api';

const ApiContext = React.createContext<Value>({ api });

interface Props {
  children: React.ReactNode;
  url?: string | null;
}

interface Value {
  api: Api;
  url?: string | null;
  deeplink?: string | null;
}

export const ApiProvider = ({ url, children }: Props) => {
  // state
  const deeplink = useDeeplink(url);
  // result
  return <ApiContext.Provider value={{ api, deeplink }}>{children}</ApiContext.Provider>;
};

export const useContextApi = () => {
  const value = React.useContext(ApiContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.api;
};

export const useContextDeeplink = () => {
  const value = React.useContext(ApiContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.deeplink;
};
