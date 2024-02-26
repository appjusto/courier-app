import { getPixTypeLabel } from '@/api/profile/pix/getPixTypeLabel';
import { AllPixKeyTypes } from '@/api/profile/pix/pix';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { PixKeyType } from '@appjusto/types/payment/iugu';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface PeriodItemProps {
  text: string;
}

const PeriodItem = ({ text }: PeriodItemProps) => (
  <DefaultText
    style={{ marginVertical: paddings['2xl'], textAlign: 'center' }}
    size="md"
    color="neutral800"
  >
    {text}
  </DefaultText>
);

interface Props extends ModalProps {
  onSelectType: (type: PixKeyType) => void;
}
export const PixTypeModal = ({ onSelectType, ...props }: Props) => {
  // UI
  return (
    <Modal transparent animationType="slide" {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      >
        <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
          <DefaultText style={{ marginVertical: paddings['2xl'], textAlign: 'center' }} size="lg">
            Tipo de chave pix
          </DefaultText>
          {AllPixKeyTypes.map((type) => (
            <Pressable key={type} onPress={() => onSelectType(type)}>
              {({ pressed }) => <PeriodItem text={getPixTypeLabel(type)} />}
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};
