import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { ModalHandle } from '@/common/components/modals/modal-handle';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  timer: number;
  onRequest: () => void;
  onDismiss: () => void;
}
export const RequestCodeModal = ({ timer, onRequest, onDismiss, ...props }: Props) => {
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
            <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
              <ModalHandle />
              <DefaultText style={{ marginTop: paddings['2xl'] }} size="xl">
                Solicitar outro código
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xl'] }} size="md">
                Se você estiver com dificuldades em receber o código, clique no botão abaixo para
                solicitá-lo novamente.
              </DefaultText>
              {timer > 0 ? (
                <DefaultText style={{ marginTop: paddings.lg }} size="md">
                  {`Você poderá solicitar o código em ${timer} segundos...`}
                </DefaultText>
              ) : null}
              <DefaultButton
                style={{ marginTop: paddings['2xl'] }}
                title="Solicitar código de acesso"
                disabled={timer > 0}
                onPress={onRequest}
              />
              <DefaultButton
                style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
                title="Cancelar"
                variant="outline"
                onPress={onDismiss}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
