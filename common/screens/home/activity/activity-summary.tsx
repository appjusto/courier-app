import { EntriesSummary } from '@/api/ledger/useEntriesSummary';
import { OrdersSummary } from '@/api/orders/useOrdersSummary';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
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
  const total = entriesSummary.total !== undefined ? formatCurrency(entriesSummary.total) : '-';
  const numberOfOrders = entriesSummary.orders !== undefined ? entriesSummary.orders.length : '-';
  const distance =
    ordersSummary.distance !== undefined ? formatDistance(ordersSummary.distance) : '-';
  const time = ordersSummary.time ? Dayjs.duration(ordersSummary.time, 's').humanize() : '-';
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
      <View style={{ marginTop: paddings.lg, flexDirection: 'row' }}>
        <View>
          <DefaultText size="xs" style={{ minWidth: 100 }}>
            Seus ganhos
          </DefaultText>
          <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
            {total}
          </DefaultText>
        </View>
        <View style={{ marginLeft: paddings['2xl'] }}>
          <DefaultText size="xs">Total de corridas</DefaultText>
          <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
            {numberOfOrders}
          </DefaultText>
        </View>
      </View>
      <View style={{ marginTop: paddings.lg, flexDirection: 'row' }}>
        <View>
          <DefaultText size="xs" style={{ minWidth: 100 }}>
            KM percorridos
          </DefaultText>
          <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
            {distance}
          </DefaultText>
        </View>
        <View style={{ marginLeft: paddings['2xl'] }}>
          <DefaultText size="xs">Tempo em corridas</DefaultText>
          <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
            {time}
          </DefaultText>
        </View>
      </View>
    </View>
  );
};
