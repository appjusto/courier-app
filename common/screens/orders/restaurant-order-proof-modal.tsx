import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { ModalHandle } from '@/common/components/modals/modal-handle';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { Package } from 'lucide-react-native';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  order: WithId<Order> | undefined | null;
  onDismiss: () => void;
  onConfirm: () => void;
}
export const RestaurantOrderProofModal = ({ order, onDismiss, onConfirm, ...props }: Props) => {
  if (!order) return null;
  const dispatchByCourier = order?.tags?.includes('dispatch-by-courier') === true;
  const canDismiss = dispatchByCourier || order.status === 'dispatching';
  // UI
  return (
    <Modal transparent animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View
              style={{
                flex: 0.85,
                alignItems: 'center',
                padding: paddings.xl,
                backgroundColor: colors.white,
              }}
            >
              <ModalHandle style={{ marginTop: paddings.xl }} />
              <View style={{ flex: 1 }} />
              {/* icon */}
              <CircledView
                style={{
                  backgroundColor: colors.primary100,
                  borderWidth: 0,
                }}
                size={84}
              >
                <Package size={46} color={colors.primary500} />
              </CircledView>
              {/* body */}
              <DefaultText
                style={{ marginTop: paddings.xl, textAlign: 'center' }}
                color="neutral800"
              >
                Aguardando retirada
              </DefaultText>
              <DefaultText
                style={{ marginTop: paddings.sm, textAlign: 'center' }}
                size="xl"
                color="black"
              >{`${order.business?.name}`}</DefaultText>
              <View style={{ flex: 1 }} />
              <DefaultText style={{ textAlign: 'center' }} color="neutral800">
                Pedido
              </DefaultText>
              <DefaultText
                style={{ marginTop: paddings.sm, textAlign: 'center' }}
                size="lg"
              >{`#${order.code}`}</DefaultText>
              <View style={{ flex: 1 }} />
              {/* consumer */}
              {!dispatchByCourier ? (
                <View>
                  <DefaultText style={{ textAlign: 'center' }} color="neutral800">
                    Cliente
                  </DefaultText>
                  <DefaultText style={{ marginTop: paddings.sm, textAlign: 'center' }} size="lg">
                    {order.consumer.name}
                  </DefaultText>
                </View>
              ) : null}
              <View style={{ flex: 1 }} />
              {/* buttons */}
              <View style={{ width: '100%' }}>
                <DefaultButton
                  title={
                    canDismiss
                      ? dispatchByCourier
                        ? 'Dar saída'
                        : 'Recebi o pedido'
                      : 'Aguardando restaurante'
                  }
                  disabled={!canDismiss}
                  onPress={onConfirm}
                />
              </View>
              <LinkButton
                style={{ marginVertical: paddings.lg }}
                textStyle={{ color: colors.error900 }}
                variant="ghost"
                size="md"
                onPress={() => {
                  onDismiss();
                  router.push({
                    pathname: '/(logged)/order/[id]/support',
                    params: { id: order.id },
                  });
                }}
              >
                Tive um problema
              </LinkButton>
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
