import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatTimestamp } from '@/common/formatters/timestamp';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { AccountWithdraw } from '@appjusto/types';
import { ChevronRight, CircleDollarSign } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { WithdrawStatusBadge } from './withdraw-status-badge';

interface Props extends ViewProps {
  withdraw: AccountWithdraw;
}

export const WithdrawItem = ({ withdraw, style, ...props }: Props) => {
  const time = formatTimestamp(withdraw.createdOn);
  const { status, amount } = withdraw;
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: paddings.md,
          paddingHorizontal: paddings.lg,
        },
        style,
      ]}
      {...props}
    >
      <CircleDollarSign size={20} color={colors.neutral800} />
      <View style={{ marginLeft: paddings.lg }}>
        <DefaultText>Transferência</DefaultText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: paddings.xs }}>
          <DefaultText size="xs" color="neutral800">
            {time}
          </DefaultText>
          <WithdrawStatusBadge status={status} style={{ marginLeft: paddings.lg }} />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <DefaultText color="black">{amount}</DefaultText>
      <ChevronRight size={16} color={colors.neutral800} style={{ marginLeft: paddings.sm }} />
    </View>
  );
};
