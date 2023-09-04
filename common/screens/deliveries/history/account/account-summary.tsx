import { useFetchAccountBalance } from '@/api/couriers/useFetchAccountBalance';
import { useFetchPlatformParams } from '@/api/platform/params/useFetchPlatformParams';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const AccountSummary = ({ style, ...props }: Props) => {
  // state
  const balance = useFetchAccountBalance();
  const platformParams = useFetchPlatformParams();
  // UI
  const minWithdrawValue = platformParams
    ? formatCurrency(platformParams.marketplace.minWithdrawValue)
    : '-';
  return (
    <View
      style={[
        {
          padding: paddings.lg,
          ...borders.default,
          borderColor: colors.success300,
          backgroundColor: colors.success100,
        },
        style,
      ]}
      {...props}
    >
      <DefaultText size="lg">Disponível para transferência</DefaultText>
      <DefaultText
        style={{ marginTop: paddings.xs }}
      >{`Valor mínimo de ${minWithdrawValue} para transferência`}</DefaultText>
      <DefaultText style={{ marginTop: paddings.lg }} size="lg" color="black">
        {balance !== undefined ? formatCurrency(balance) : '-'}
      </DefaultText>
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        title="Transferir para conta"
        onPress={() => null}
      />
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        variant="outline"
        title="Ver histórico de transferências"
        onPress={() => null}
      />
    </View>
  );
};
