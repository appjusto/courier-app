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
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { PeriodModal } from './period-modal';

export type Period = 'day' | 'week' | 'month' | 'custom';

interface Props extends ViewProps {
  onChange: (from: Date, to: Date) => void;
}

export const PeriodControl = ({ onChange }: Props) => {
  // state
  const [period, setPeriod] = useState<Period>('day');
  const [from, setFrom] = useState<Date>(getStartOfDay());
  const [to, setTo] = useState<Date>();
  const [modalVisible, setModalVisible] = useState(false);
  // side effects
  // update from according with period
  useEffect(() => {
    if (period === 'day') {
      setFrom(getStartOfDay());
    } else if (period === 'week') {
      setFrom(getStartOfWeek());
    } else if (period === 'month') {
      setFrom(getStartOfMonth());
    }
  }, [period]);
  // update to according with from
  useEffect(() => {
    if (period === 'day') {
      setTo(getEndOfDay());
    } else if (period === 'week') {
      setTo(getEndOfWeek(from));
    } else if (period === 'month') {
      setTo(getEndOfMonth(from));
    }
  }, [period, from]);
  // handler
  useEffect(() => {
    if (!from || !to) return;
    onChange(from, to);
  }, [from, to, onChange]);
  if (!from || !to) return;
  const nextEnabled = Dayjs(to).isBefore(new Date());
  // handlers
  const previousPeriod = () => {
    if (period !== 'custom') {
      setFrom(Dayjs(from).subtract(1, period).toDate());
      setTo(Dayjs(to).subtract(1, period).toDate());
    }
  };
  const nextPeriod = () => {
    if (!nextEnabled) return;
    if (period !== 'custom') {
      setFrom(Dayjs(from).add(1, period).toDate());
      setTo(Dayjs(to).add(1, period).toDate());
    }
  };
  // UI
  const periodAsText = () => {
    if (Dayjs(to).isSame(from, 'day'))
      return Dayjs(from).calendar(new Date(), {
        lastDay: '[Ontem]',
        sameDay: '[Hoje]',
        lastWeek: '[Última] dddd',
        sameElse: 'DD [de] MMMM',
      });
    return `${Dayjs(from).format('DD [de] MMMM')} a ${Dayjs(to).format('DD [de] MMMM')}`;
  };
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <PeriodModal
          visible={modalVisible}
          onConfirm={(period) => {
            setModalVisible(false);
            setPeriod(period);
          }}
          onSelectDate={(date) => {
            setFrom(date);
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
