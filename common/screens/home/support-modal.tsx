import { ModalHandle } from '@/common/components/modals/modal-handle';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { router } from 'expo-router';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  onDismiss: () => void;
}
export const SupportModal = ({ onDismiss, ...props }: Props) => {
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
              <DefaultText style={{ marginTop: paddings['2xl'], textAlign: 'center' }} size="lg">
                Escolha uma opção
              </DefaultText>
              <Pressable
                onPress={() => {
                  onDismiss();
                  openWhatsAppSupportURL('Ajuda com a corrida');
                }}
              >
                <DefaultText
                  style={{ marginTop: paddings['2xl'], textAlign: 'center' }}
                  size="md"
                  color="neutral800"
                >
                  Falar com nosso time
                </DefaultText>
              </Pressable>
              <HR style={{ marginTop: paddings.lg, marginHorizontal: paddings.sm }} />
              <Pressable
                onPress={() => {
                  onDismiss();
                  router.push('/complaint/');
                }}
              >
                <DefaultText
                  style={{
                    marginTop: paddings.lg,
                    marginBottom: paddings['2xl'],
                    textAlign: 'center',
                  }}
                  size="md"
                  color="neutral800"
                >
                  Fazer uma denúncia
                </DefaultText>
              </Pressable>
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
