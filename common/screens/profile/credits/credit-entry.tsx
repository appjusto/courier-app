import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { formatCurrency } from '@/common/formatters/currency';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { LedgerEntry, WithId } from '@appjusto/types';
import { View, ViewProps } from 'react-native';
import { LedgerEntryStatusBadge } from '../../deliveries/ledger/ledger-status-badge';

interface Props extends ViewProps {
  entry: WithId<LedgerEntry>;
}

export const CreditEntry = ({ entry, style, ...props }: Props) => {
  const { value, operation, status, createdOn, orderCode } = entry;
  // UI
  const label = (() => {
    if (operation === 'marketing-credit') return 'Crédito de indicação';
    if (operation === 'finders-fee') return 'Comissão';
    return '';
  })();
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
        <View>
          <DefaultText color="neutral700">{label}</DefaultText>
          <DefaultText size="md">{formatCurrency(value)}</DefaultText>
        </View>
        <LedgerEntryStatusBadge status={status} />
      </View>
      <HR style={{ marginVertical: paddings.md }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <DefaultText color="neutral700">Criado em</DefaultText>
          <DefaultText size="md">{Dayjs(createdOn.toDate()).format('DD/MM/YY')}</DefaultText>
        </View>
        <View>
          <DefaultText color="neutral700">Liberação</DefaultText>
          <DefaultText size="md">
            {Dayjs(createdOn.toDate()).add(30, 'days').format('DD/MM/YY')}
          </DefaultText>
        </View>
        <View>
          <DefaultText color="neutral700">Pedido</DefaultText>
          <DefaultText size="md">{orderCode}</DefaultText>
        </View>
      </View>
    </View>
  );
};
