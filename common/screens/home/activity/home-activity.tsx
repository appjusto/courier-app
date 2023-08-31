import { useApprovedEntriesSummary } from '@/api/ledger/useApprovedEntriesSummary';
import { useTodaysOrdersSummary } from '@/api/orders/useTodaysOrdersSummary';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const HomeActivity = ({ style, ...props }: Props) => {
  // state
  const revenueSummary = useApprovedEntriesSummary();
  const ordersOrders = useTodaysOrdersSummary();
  // UI
  const total = revenueSummary.total !== undefined ? formatCurrency(revenueSummary.total) : '-';
  const numberOfOrders =
    revenueSummary.numberOfOrders !== undefined ? revenueSummary.numberOfOrders : '-';
  const distance =
    ordersOrders.distance !== undefined ? formatDistance(ordersOrders.distance) : '-';
  const time = ordersOrders.time ? Dayjs.duration(ordersOrders.time, 's').humanize() : '-';
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
      <DefaultText size="lg">Sua atividade hoje</DefaultText>
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
