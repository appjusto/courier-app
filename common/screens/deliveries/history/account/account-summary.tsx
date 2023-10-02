import { useFetchAccountBalance } from '@/api/couriers/account/useFetchAccountBalance';
import {
  useContextPlatformFees,
  useContextPlatformParams,
} from '@/api/platform/context/PlatformContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { onSimulator } from '@/common/version/device';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const AccountSummary = ({ style, ...props }: Props) => {
  // context
  const router = useRouter();
  // state
  const minWithdrawValue = useContextPlatformParams()?.marketplace.minWithdrawValue;
  const withdrawFee = useContextPlatformFees()?.processing.iugu.withdraw;
  const balance = useFetchAccountBalance();
  const withdrawValue =
    balance !== undefined && withdrawFee !== undefined ? balance - withdrawFee : 0;
  const canWithdraw =
    onSimulator() || (withdrawFee && balance && minWithdrawValue && balance > minWithdrawValue);
  // UI
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
      {minWithdrawValue ? (
        <DefaultText style={{ marginTop: paddings.xs }}>{`Valor mínimo de ${formatCurrency(
          minWithdrawValue
        )} para transferência`}</DefaultText>
      ) : null}
      {balance !== undefined ? (
        <DefaultText style={{ marginTop: paddings.lg }} size="lg" color="black">
          {formatCurrency(balance)}
        </DefaultText>
      ) : (
        <View style={{ marginTop: paddings.lg }}>
          <ActivityIndicator color={colors.black} />
        </View>
      )}
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        title="Transferir para conta"
        disabled={!canWithdraw}
        onPress={() => {
          router.push({
            pathname: '/deliveries/withdraws/request',
            params: {
              balance: `${balance}`,
              fee: `${withdrawFee}`,
              value: `${withdrawValue}`,
            },
          });
        }}
      />
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        variant="outline"
        title="Ver histórico de transferências"
        onPress={() => router.push('/deliveries/withdraws')}
      />
    </View>
  );
};
