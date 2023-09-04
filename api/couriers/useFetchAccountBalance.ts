import { useToast } from '@/common/components/views/toast/ToastContext';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';

export const useFetchAccountBalance = () => {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // state
  const [balance, setBalance] = useState<number>();
  // callbacks
  const fetchBalance = useCallback(() => {
    // console.log('fetchBalance');
    api
      .couriers()
      .fetchAccountInformation()
      .then((info) => {
        const value = parseInt(info.balance_available_for_withdraw.replace(/[^0-9]/g, ''), 10);
        setBalance(value);
      })
      .catch((error: Error) => {
        setBalance(0);
        showToast(error.message, 'error');
      });
  }, [api, showToast]);
  // side effects
  useFocusEffect(fetchBalance);
  useEffect(fetchBalance, [fetchBalance]);
  // result
  return balance;
};
