import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View } from 'react-native';
import { EmptyIcon } from './icon';

interface Props extends ModalProps {
  title?: string;
  text: string;
  dismissLabel?: string;
  onDismiss: () => void;
}
export const ErrorModal = ({ title, text, dismissLabel, onDismiss, children, ...props }: Props) => {
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
              <EmptyIcon style={{ alignSelf: 'center' }} />
              {title ? (
                <DefaultText
                  style={{ marginVertical: paddings['2xl'], textAlign: 'center' }}
                  size="lg"
                >
                  {title}
                </DefaultText>
              ) : null}

              <DefaultText size="md" style={{ textAlign: 'center' }}>
                {text}
              </DefaultText>

              {children}

              <DefaultButton
                style={{ marginVertical: paddings.md }}
                variant="outline"
                title={dismissLabel ?? 'Fechar'}
                onPress={onDismiss}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
