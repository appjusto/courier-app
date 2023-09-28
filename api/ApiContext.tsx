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
}

export const ApiProvider = ({ url, children }: Props) => {
  // result
  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

export const useContextApi = () => {
  const value = React.useContext(ApiContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.api;
};
