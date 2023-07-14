import React from 'react';
import Api, { api } from './Api';

const ApiContext = React.createContext<Api>(api);

interface Props {
  children: React.ReactNode;
}

export const ApiProvider = (props: Props) => {
  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
};

export const useContextApi = () => {
  const value = React.useContext(ApiContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value;
};
