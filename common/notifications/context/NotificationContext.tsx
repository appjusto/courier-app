import { trackEvent } from '@/api/analytics/track';
import { processURL } from '@/common/deeplink/processURL';
import { PushMessageData } from '@appjusto/types';
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
  const [deeplink, setDeeplink] = useState<string>();
  // side effects
  const notification = useNotificationHandler();
  const message = notification ? (notification.request.content.data as PushMessageData) : undefined;
  useEffect(() => {
    if (!message) return;
    if (
      message.action === 'navigate' ||
      message.action === 'order-request' ||
      message.action === 'order-chat'
    ) {
      trackEvent('Clicou no push', { url: message.url });
      const result = processURL(message.url);
      if (result) setDeeplink(result);
    }
  }, [message]);
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
