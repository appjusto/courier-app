import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { formatCurrency } from '@/common/formatters/currency';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View, ViewProps } from 'react-native';
import { LedgerEntryStatusBadge } from '../../deliveries/ledger/ledger-status-badge';

interface Props extends ViewProps {
  total: number;
}

export const CreditsApprovedSummary = ({ total, style, ...props }: Props) => {
  // UI
  return (
    <View
      style={[
        {
          padding: paddings.lg,
          backgroundColor: colors.white,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.neutral100,
        },
        style,
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{}}>
          <DefaultText color="neutral700">Créditos disponíveis</DefaultText>
          <DefaultText style={{ marginTop: paddings.xs }} size="md">
            {formatCurrency(total)}
          </DefaultText>
        </View>
        <LedgerEntryStatusBadge status="paid" />
      </View>
      <MessageBox style={{ marginTop: paddings.md }}>
        Os créditos são liberados em até 30 dias após o pedido entregue.
      </MessageBox>
    </View>
  );
};
