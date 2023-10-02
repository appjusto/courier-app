import React, { useCallback, useState } from 'react';
import Toast, { ToastType } from './Toast';

const ToastContext = React.createContext<Value | null>(null);

interface Props {
  children: React.ReactNode;
}

interface Value {
  showToast: (value: string, type: ToastType) => void;
}

export const ToastProvider = (props: Props) => {
  // state
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  // handlers
  const showToast = useCallback((message: string, type: ToastType) => {
    setMessage(message);
    setType(type);
  }, []);
  const onHide = useCallback(() => {
    setMessage('');
  }, []);
  // UI
  return (
    <ToastContext.Provider value={{ showToast }}>
      <>
        {props.children}
        <Toast message={message} type={type} onHide={onHide} />
      </>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const value = React.useContext(ToastContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value;
};

export const useShowToast = () => {
  const value = React.useContext(ToastContext);
  if (!value) throw new Error('Api fora de contexto.');
  return value.showToast;
};
