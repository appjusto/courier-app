import { PlatformParams } from '@appjusto/types';
import React, { useContext } from 'react';
import { useFetchPlatformParams } from '../params/useFetchPlatformParams';
import { useServerTime } from '../time/useServerTime';

interface Props {
  children: React.ReactNode;
}

interface Value {
  getServerTime?: () => Date;
  platformParams?: PlatformParams | null;
}

const PlatformContext = React.createContext<Value>({});

export const PlatformProvider = (props: Props) => {
  // state
  const platformParams = useFetchPlatformParams();
  const getServerTime = useServerTime();
  const value = { platformParams, getServerTime };
  // result
  return <PlatformContext.Provider value={value}>{props.children}</PlatformContext.Provider>;
};

export const useContextGetServerTime = () => {
  const value = useContext(PlatformContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.getServerTime ?? (() => new Date());
};

export const useContextPlatformParams = () => {
  const value = useContext(PlatformContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.platformParams;
};
