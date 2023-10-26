import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { ModalHandle } from '@/common/components/modals/modal-handle';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { BankAccountPersonType } from '@appjusto/types';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  personType?: BankAccountPersonType;
  onConfirm: () => void;
  onCancel: () => void;
}
export const PersonTypeModal = ({ personType, onConfirm, onCancel, ...props }: Props) => {
  // UI

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
              <ModalHandle />
              <DefaultText style={{ marginTop: paddings['2xl'], ...lineHeight.lg }} size="lg">
                {`Tem certeza que a sua conta bancária é de ${personType}?`}
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xl'], ...lineHeight.md }} size="md">
                {`Essa informação é muito importante para que as transferências sejam feitas corretamente. Só escolha ${personType} caso tenha certeza que sua conta bancária está configurada dessa forma.`}
              </DefaultText>
              <DefaultButton
                style={{ marginTop: paddings['2xl'] }}
                title="Sim, tenho certeza"
                onPress={onConfirm}
              />
              <DefaultButton
                style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
                title={`Não, é ${(personType === 'Pessoa Física'
                  ? 'Pessoa Jurídica'
                  : 'Pessoa Física'
                ).toLocaleLowerCase()}`}
                variant="outline"
                onPress={onCancel}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
