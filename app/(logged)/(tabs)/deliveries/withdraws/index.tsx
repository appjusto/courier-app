import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useFetchWithdraws } from '@/api/couriers/withdraws/useFetchWithdraws';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { getEndOfDay, getStartOfDay } from '@/common/date';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import { WithdrawList } from '@/common/screens/deliveries/withdraws/withdraws-list';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { isEqual } from 'lodash';
import { useCallback, useRef, useState } from 'react';

export default function WithdrawsScreen() {
  // context
  const router = useRouter();
  // state
  const startOfDay = useRef(getStartOfDay())?.current;
  const endOfDay = useRef(getEndOfDay())?.current;
  const [from, setFrom] = useState(startOfDay);
  const [to, setTo] = useState(endOfDay);
  const withdraws = useFetchWithdraws(from, to);
  // tracking
  useTrackScreenView('Transferências');
  // handlers
  const changeHandler = useCallback(
    (_from: Date, _to: Date) => {
      if (!isEqual(from, _from)) {
        setFrom(_from);
      }
      if (!isEqual(to, _to)) {
        setTo(_to);
      }
    },
    [from, to]
  );
  // UI
  if (!withdraws) return null;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        <PeriodControl onChange={changeHandler} />
        <WithdrawList
          style={{ marginTop: paddings.lg }}
          emptyText="Não encontramos nenhuma transferência neste período."
          withdraws={withdraws}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
