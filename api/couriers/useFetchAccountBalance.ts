import { useToast } from '@/common/components/views/toast/ToastContext';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useContextApi } from '../ApiContext';

export const useFetchAccountBalance = () => {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // state
  const [balance, setBalance] = useState<number>();
  // callbacks
  const fetchBalance = useCallback(() => {
    console.log('fetchBalance');
    api
      .couriers()
      .fetchAccountInformation()
      .then((info) => {
        const value = parseInt(info.balance_available_for_withdraw.replace(/[^0-9]/g, ''), 10);
        setBalance(value);
      })
      .catch((error: unknown) => {
        console.info(error);
        setBalance(0);
        showToast('Não foi possível obter seu saldo. Tente novamente mais tarde.', 'error');
      });
  }, [api, showToast]);
  // side effects
  useFocusEffect(fetchBalance);
  // result
  return balance;
};
