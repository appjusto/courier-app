import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import {
  getEndOfDay,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfDay,
  getStartOfMonth,
  getStartOfWeek,
} from '@/common/date';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { capitalize } from 'lodash';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { PeriodModal } from './period-modal';

export type Period = 'day' | 'week' | 'month' | 'custom';

interface Props extends ViewProps {
  initialFrom?: Date;
  initialPeriod?: Period;
  onChange: (from: Date, to: Date) => void;
}

export const PeriodControl = ({
  initialFrom = new Date(),
  initialPeriod = 'day',
  onChange,
}: Props) => {
  // state
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [from, setFrom] = useState(initialFrom.getTime());
  const [to, setTo] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  // side effects
  // update from according with period
  useEffect(() => {
    // console.log('effect peridod', period);
    if (period === 'day') {
      setFrom(getStartOfDay().getTime());
      setTo(getEndOfDay().getTime());
    } else if (period === 'week') {
      setFrom(getStartOfWeek().getTime());
      setTo(getEndOfWeek().getTime());
    } else if (period === 'month') {
      setFrom(getStartOfMonth().getTime());
      setTo(getEndOfMonth().getTime());
    }
  }, [period]);
  // update to according with from
  // useEffect(() => {
  //   console.log('from', period, new Date(from));
  //   if (period === 'day') {
  //     console.log('to', period, getEndOfDay(new Date(from)));
  //     setTo(getEndOfDay(new Date(from)).getTime());
  //   } else if (period === 'week') {
  //     setTo(getEndOfWeek(new Date(from)).getTime());
  //   } else if (period === 'month') {
  //     setTo(getEndOfMonth(new Date(from)).getTime());
  //   }
  // }, [period, from]);
  // handler
  useEffect(() => {
    if (!from || !to) return;
    onChange(new Date(from), new Date(to));
  }, [from, to, onChange]);
  // console.log('period control', from, to);
  if (!from || !to) return null;
  const nextEnabled = Dayjs(to).isBefore(new Date());
  // handlers
  const previousPeriod = () => {
    if (period !== 'custom') {
      setFrom(Dayjs(from).subtract(1, period).toDate().getTime());
      setTo(Dayjs(to).subtract(1, period).toDate().getTime());
    }
  };
  const nextPeriod = () => {
    if (!nextEnabled) return;
    if (period !== 'custom') {
      setFrom(Dayjs(from).add(1, period).toDate().getTime());
      setTo(Dayjs(to).add(1, period).toDate().getTime());
    }
  };
  // console.log(period, from, to);
  // UI
  const periodAsText = () => {
    if (Dayjs(to).isSame(from, 'day'))
      return capitalize(
        Dayjs(from).calendar(new Date(), {
          lastDay: '[Ontem]',
          sameDay: '[Hoje]',
          lastWeek: 'dddd',
          sameElse: 'DD [de] MMMM',
        })
      );
    return `${Dayjs(from).format('DD [de] MMMM')} a ${Dayjs(to).format('DD [de] MMMM')}`;
  };
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <PeriodModal
          visible={modalVisible}
          onSelectPeriod={(period) => {
            setModalVisible(false);
            setPeriod(period);
          }}
          onSelectDate={(date) => {
            setFrom(getStartOfDay(date).getTime());
            setModalVisible(false);
            // setPeriod('month')
          }}
          onCancel={() => setModalVisible(false)}
        />
        <OnlyIconButton
          icon={<ChevronLeft size={16} color={colors.neutral800} />}
          iconStyle={{ backgroundColor: colors.neutral50, borderColor: colors.neutral50 }}
          onPress={() => previousPeriod()}
        />
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(true)}>
          {({ pressed }) => (
            <View
              style={{
                flex: 1,
                ...borders.default,
                marginHorizontal: paddings.sm,
                backgroundColor: colors.neutral50,
                borderColor: colors.neutral50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DefaultText color="black">{periodAsText()}</DefaultText>
            </View>
          )}
        </Pressable>
        <OnlyIconButton
          icon={<ChevronRight size={16} color={colors.neutral800} />}
          iconStyle={{ backgroundColor: colors.neutral50, borderColor: colors.neutral50 }}
          disabled={!nextEnabled}
          onPress={() => nextPeriod()}
        />
      </View>
    </View>
  );
};
