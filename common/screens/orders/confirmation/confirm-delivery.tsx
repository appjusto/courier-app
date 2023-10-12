import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CodeInput } from '@/common/components/inputs/code-input/CodeInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const ConfirmDelivery = ({ order, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const orderId = order.id;
  const { dispatchingState } = order;
  // state
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  // handlers
  const confirmHandler = useCallback(() => {
    if (code.length !== 3) {
      showToast('Preencha o código de confirmação para finalizar a entrega', 'error');
      return;
    }
    setLoading(true);
    api
      .orders()
      .completeDelivery({ orderId, handshakeResponse: code })
      .catch((error: unknown) => {
        setLoading(false);
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  }, [orderId, code, api, showToast]);

  // UI
  if (dispatchingState !== 'arrived-destination') return null;
  return (
    <View
      style={[{ flex: 1, padding: paddings.xl, backgroundColor: colors.neutral50 }, style]}
      {...props}
    >
      <View style={{ padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}>
        <DefaultText size="lg">Código de confirmação</DefaultText>
        <DefaultText style={{ marginTop: paddings.xs }}>
          O código deve ser informado pelo cliente no momento da entrega do pedido:
        </DefaultText>
        <CodeInput
          style={{ marginTop: paddings.lg, justifyContent: 'flex-start' }}
          digitStyle={{ marginRight: paddings.lg }}
          value={code}
          onChange={setCode}
        />
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          title="Confirmar entrega"
          disabled={code.length !== 3 || loading}
          loading={loading}
          onPress={confirmHandler}
        />
      </View>
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginBottom: paddings.lg }}
        title="Confirmar entrega sem código"
        variant="outline"
        onPress={() => {
          router.push({
            pathname: '/(logged)/order/[id]/confirm-without-code',
            params: { id: orderId },
          });
        }}
      />
    </View>
    // </DefaultKeyboardAwareScrollView>
  );
};
