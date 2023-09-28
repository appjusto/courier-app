import { processURL } from '@/common/deeplink/processURL';
import { PushMessageData } from '@appjusto/types';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { useNotificationHandler } from '../useNotificationHandler';

interface Props {
  children: React.ReactNode;
}

interface Value {
  deeplink?: string;
  setDeeplink?: (value: string | undefined) => void;
}

const NotificationContext = React.createContext<Value>({});

export const NotificationProvider = (props: Props) => {
  // state
  const url = Linking.useURL();
  const [deeplink, setDeeplink] = useState<string>();
  // side effects
  const notification = useNotificationHandler();
  const message = notification ? (notification.request.content.data as PushMessageData) : undefined;
  useEffect(() => {
    if (!message) return;
    if (message.action === 'navigate' || message.action === 'order-request') {
      setDeeplink(message.url);
    }
  }, [message]);
  useEffect(() => {
    if (url) setDeeplink(processURL(url));
  }, [url]);
  // result
  return (
    <NotificationContext.Provider value={{ deeplink, setDeeplink }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useContextDeeplink = () => {
  const value = React.useContext(NotificationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.deeplink;
};

export const useContextSetDeeplink = () => {
  const value = React.useContext(NotificationContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.setDeeplink!;
};
