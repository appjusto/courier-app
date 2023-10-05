import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { LedgerEntry, WithId } from '@appjusto/types';
import { ChevronRight, Package } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { LedgerEntryStatusBadge } from './ledger-status-badge';

interface Props extends ViewProps {
  entry: WithId<LedgerEntry>;
}

export const LedgerEntryItem = ({ entry, style, ...props }: Props) => {
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: paddings.md,
          paddingHorizontal: paddings.sm,
        },
        style,
      ]}
      {...props}
    >
      {/* icon */}
      <Package size={20} color={colors.neutral800} />
      {/* info */}
      <View style={{ marginLeft: paddings.lg }}>
        {/* title */}
        <DefaultText>
          {entry.orderId
            ? `Corrida${entry.orderCode ? ` #${entry.orderCode}` : ''}`
            : 'Ganho extra'}
        </DefaultText>
        {/* subtitle */}
        <View style={{ flexDirection: 'row' }}>
          <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral800">
            {formatTimestamp(entry.updatedOn ?? entry.createdOn)}
          </DefaultText>
          <LedgerEntryStatusBadge status={entry.status} style={{ marginLeft: paddings.sm }} />
        </View>
      </View>
      <View style={{ flex: 1, marginTop: paddings.xs }} />
      <DefaultText size="md" color="black">
        {formatCurrency(entry.value)}
      </DefaultText>
      <ChevronRight size={16} color={colors.neutral800} style={{ marginLeft: paddings.sm }} />
    </View>
  );
};
