import { OrdersSummary } from '@/api/orders/useOrdersSummary';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { Eye, EyeOff } from 'lucide-react-native';
import { Skeleton } from 'moti/skeleton';
import { useState } from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  title: string;
  // entriesSummary: EntriesSummary;
  ordersSummary: OrdersSummary;
}

export const ActivitySummary = ({
  title,
  // entriesSummary,
  ordersSummary,
  style,
  ...props
}: Props) => {
  // state
  const [shown, setShown] = useState(true);
  // UI
  const revenue =
    ordersSummary.revenue !== undefined ? formatCurrency(ordersSummary.revenue) : 'R$ 00,00';
  const numberOfOrders = ordersSummary.total ?? 0;
  const distance =
    ordersSummary.distance !== undefined ? formatDistance(ordersSummary.distance) : '00';
  const time = ordersSummary.time
    ? Dayjs.duration(ordersSummary.time, 's').asMinutes().toFixed(0) + 'mins'
    : '0mins';
  const loading = ordersSummary.distance === undefined;
  return (
    <View
      style={[
        {
          ...borders.default,
          borderColor: colors.neutral100,
          padding: paddings.lg,
          paddingTop: paddings.md,
        },
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <DefaultText size="lg">{title}</DefaultText>
        <OnlyIconButton
          icon={
            shown ? (
              <EyeOff size={24} color={colors.neutral900} />
            ) : (
              <Eye size={24} color={colors.neutral900} />
            )
          }
          iconStyle={{ borderWidth: 0 }}
          onPress={() => setShown((value) => !value)}
        />
      </View>
      <Skeleton.Group show={loading || !shown}>
        <View style={{ marginTop: paddings.lg, flexDirection: 'row' }}>
          <View>
            <DefaultText size="xs" style={{ minWidth: 100 }}>
              Seus ganhos
            </DefaultText>
            <Skeleton colors={[colors.neutral50, colors.neutral100]} width={100}>
              <DefaultText size="lg" color="black" style={{ marginTop: paddings.xs }}>
                {revenue}
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
