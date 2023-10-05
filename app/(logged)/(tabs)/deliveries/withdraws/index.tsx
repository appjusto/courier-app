import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useFetchWithdraws } from '@/api/couriers/withdraws/useFetchWithdraws';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { getEndOfDay, getStartOfDay } from '@/common/date';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import { WithdrawItem } from '@/common/screens/deliveries/withdraws/item';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { isEqual } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

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
      if (!isEqual(to, to)) {
        setTo(_to);
      }
    },
    [from, to]
  );
  // console.log('withdraws', withdraws);
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        <PeriodControl onChange={changeHandler} />
        {withdraws ? (
          <View style={{ marginTop: paddings.lg }}>
            {withdraws.map((withdraw) => (
              <Pressable
                key={withdraw.id}
                onPress={() => {
                  router.push({
                    pathname: '/(logged)/(tabs)/deliveries/withdraws/[id]/',
                    params: { id: withdraw.id },
                  });
                }}
              >
                <WithdrawItem withdraw={withdraw} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </DefaultView>
    </DefaultScrollView>
  );
}
