import { PlatformFees, PlatformParams } from '@appjusto/types';
import React, { useContext } from 'react';
import { useFetchPlatformFees } from '../fees/useFetchPlatformFees';
import { useFetchPlatformParams } from '../params/useFetchPlatformParams';
import { useServerTime } from '../time/useServerTime';

interface Props {
  children: React.ReactNode;
}

interface Value {
  getServerTime?: () => Date;
  platformParams?: PlatformParams | null;
  platformFees?: PlatformFees | null;
}

const PlatformContext = React.createContext<Value>({});

export const PlatformProvider = (props: Props) => {
  // state
  const platformParams = useFetchPlatformParams();
  const platformFees = useFetchPlatformFees();
  const getServerTime = useServerTime();
  const value = { platformParams, platformFees, getServerTime };
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

export const useContextPlatformFees = () => {
  const value = useContext(PlatformContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.platformFees;
};
