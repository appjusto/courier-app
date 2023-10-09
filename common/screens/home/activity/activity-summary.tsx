import { EntriesSummary } from '@/api/ledger/useEntriesSummary';
import { OrdersSummary } from '@/api/orders/useOrdersSummary';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { Skeleton } from 'moti/skeleton';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  title: string;
  entriesSummary: EntriesSummary;
  ordersSummary: OrdersSummary;
}

export const ActivitySummary = ({
  title,
  entriesSummary,
  ordersSummary,
  style,
  ...props
}: Props) => {
  // UI
  const total =
    entriesSummary.total !== undefined ? formatCurrency(entriesSummary.total) : 'R$ 00,00';
  const numberOfOrders = entriesSummary.orders !== undefined ? entriesSummary.orders.length : '0';
  const distance =
    ordersSummary.distance !== undefined ? formatDistance(ordersSummary.distance) : '00';
  const time = ordersSummary.time ? Dayjs.duration(ordersSummary.time, 's').humanize() : '0h';
  const loading = entriesSummary.total === undefined || ordersSummary.distance === undefined;
  return (
    <View
      style={[
        {
          ...borders.default,
          borderColor: colors.neutral100,
          padding: paddings.lg,
        },
        style,
      ]}
      {...props}
    >
      <DefaultText size="lg">{title}</DefaultText>
      <Skeleton.Group show={loading}>
        <View style={{ marginTop: paddings.lg, flexDirection: 'row' }}>
          <View>
            <DefaultText size="xs" style={{ minWidth: 100 }}>
              Seus ganhos
            </DefaultText>
            <Skeleton colors={[colors.neutral50, colors.neutral100]} width={90}>
              <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
                {total}
              </DefaultText>
            </Skeleton>
          </View>
          <View style={{ marginLeft: paddings['2xl'] }}>
            <DefaultText size="xs">Total de corridas</DefaultText>
            <Skeleton colors={[colors.neutral50, colors.neutral100]} width={50}>
              <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
                {numberOfOrders}
              </DefaultText>
            </Skeleton>
          </View>
        </View>
        <View style={{ marginTop: paddings.lg, flexDirection: 'row' }}>
          <View>
            <DefaultText size="xs" style={{ minWidth: 100 }}>
              KM percorridos
            </DefaultText>
            <Skeleton colors={[colors.neutral50, colors.neutral100]} width={60}>
              <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
                {distance}
              </DefaultText>
            </Skeleton>
          </View>
          <View style={{ marginLeft: paddings['2xl'] }}>
            <DefaultText size="xs">Tempo em corridas</DefaultText>
            <Skeleton colors={[colors.neutral50, colors.neutral100]} width={70}>
              <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
                {time}
              </DefaultText>
            </Skeleton>
          </View>
        </View>
      </Skeleton.Group>
    </View>
  );
};
