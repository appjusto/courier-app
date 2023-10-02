import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { AccountWithdraw, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../../ApiContext';

export const useFetchWithdraws = (from: Date | undefined, to: Date | undefined) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // state
  const [withdraws, setWithdraws] = useState<WithId<AccountWithdraw>[] | null>();
  // side effects
  useEffect(() => {
    // console.log('useFetchWithdraws', from, to);
    if (!from || !to) return;
    api
      .couriers()
      .fetchWithdraws(from, to)
      .then((result) => {
        // console.log('fetchWithdraws', result);
        setWithdraws(result);
      })
      .catch((error: Error) => {
        // console.log('fetchWithdraws', error);
        setWithdraws(null);
        showToast(error.message, 'error');
      });
  }, [api, showToast, from, to]);
  // result
  return withdraws;
};
