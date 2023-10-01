import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useFetchWithdraws } from '@/api/couriers/withdraws/useFetchWithdraws';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import { WithdrawItem } from '@/common/screens/deliveries/withdraws/item';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

export default function WithdrawsScreen() {
  // context
  const router = useRouter();
  // state
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const withdraws = useFetchWithdraws(from, to);
  // tracking
  useTrackScreenView('Transferências');
  // handlers
  const changeHandler = useCallback((from: Date, to: Date) => {
    // console.log('onChange', from, to);
    setFrom(from);
    setTo(to);
  }, []);
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
                    pathname: '/(logged)/(tabs)/deliveries/withdraws/[id]',
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
