import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  dismissLabel?: string;
  onDismiss: () => void;
}
export const CenteredModal = ({ dismissLabel, children, onDismiss, ...props }: Props) => {
  return (
    <Modal transparent animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: paddings['2xl'],
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
              {children}

              <DefaultButton
                style={{ marginVertical: paddings.md }}
                variant="primary"
                title={dismissLabel ?? 'OK'}
                onPress={onDismiss}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
