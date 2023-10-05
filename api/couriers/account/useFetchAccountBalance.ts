import { useToast } from '@/common/components/views/toast/ToastContext';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useContextApi } from '../../ApiContext';

export const useFetchAccountBalance = () => {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // state
  const [balance, setBalance] = useState<number>();
  // callbacks
  const fetchBalance = useCallback(() => {
    setBalance(undefined);
    api
      .couriers()
      .fetchAccountInformation()
      .then((info) => {
        if (!info) {
          setBalance(0);
          showToast('Não foi possível carregar seu saldo. Tente novamente mais tarde', 'error');
          return;
        }
        const value = parseInt(info.balance_available_for_withdraw.replace(/[^0-9]/g, ''), 10);
        setBalance(value);
      })
      .catch((error: Error) => {
        setBalance(0);
        showToast(error.message, 'error');
        if (error instanceof Error) crashlytics().recordError(error);
      });
  }, [api, showToast]);
  // side effects
  useFocusEffect(fetchBalance);
  // result
  return balance;
};
