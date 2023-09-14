import { useContextUser } from '@/common/auth/AuthContext';
import { Dayjs } from '@appjusto/dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useContextApi } from '../../ApiContext';

interface DeltaInfo {
  delta: number;
  updatedAt: Date;
}
const KEY = 'server-time';
const THRESHOLD = Dayjs.duration({ days: 7 }).asMilliseconds();

const retrieve = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    if (value) {
      const info = JSON.parse(value) as DeltaInfo;
      return { ...info, updatedAt: new Date(info.updatedAt) } as DeltaInfo;
    }
  } catch (error: unknown) {
    console.info(error);
  }
  return null;
};

const store = async (delta: number) => {
  try {
    const now = new Date();
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({
        delta,
        updatedAt: now,
      } as DeltaInfo)
    );
  } catch (error: unknown) {
    console.info(error);
  }
};

const expired = (info: DeltaInfo | null) => {
  if (!info) return true;
  const now = new Date();
  return now.getTime() - info.updatedAt.getTime() > THRESHOLD;
};

export const useServerTime = () => {
  // context
  const api = useContextApi();
  const logged = Boolean(useContextUser());
  // state
  const [delta, setDelta] = React.useState<number>(0);
  // side effects
  useEffect(() => {
    (async () => {
      if (!logged) return;
      const info = await retrieve();
      if (info && !expired(info)) setDelta(info.delta);
      else {
        const serverTime = await api.platform().getServerTime();
        const newDelta = serverTime - new Date().getTime();
        console.log('Atualizando o sever time com delta de ', newDelta);
        await store(newDelta);
        setDelta(newDelta);
      }
    })();
  }, [api, logged]);
  return () => new Date(new Date().getTime() + delta);
};
