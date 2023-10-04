import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  text: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export const ConfirmModal = ({
  text,
  confirmButtonLabel = 'Sim',
  cancelButtonLabel = 'Não',
  onConfirm,
  onCancel,
  ...props
}: Props) => {
  return (
    <Modal transparent animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onCancel}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
              <DefaultText
                style={{ marginVertical: paddings['2xl'], textAlign: 'center' }}
                size="lg"
              >
                {text}
              </DefaultText>
              <DefaultButton variant="destructive" title={confirmButtonLabel} onPress={onConfirm} />
              <DefaultButton
                style={{ marginVertical: paddings.md }}
                variant="outline"
                title={cancelButtonLabel}
                onPress={onCancel}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
