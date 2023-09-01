import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View } from 'react-native';
import { Period } from './period-control';

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
  onConfirm: (period: Period) => void;
  onCancel: () => void;
}
export const PeriodModal = ({ onConfirm, onCancel, ...props }: Props) => {
  return (
    <Modal animationType="slide" {...props}>
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
                Visualizar por
              </DefaultText>
              <Pressable onPress={() => onConfirm('day')}>
                {({ pressed }) => <PeriodItem text="Dia" />}
              </Pressable>
              <Pressable onPress={() => onConfirm('week')}>
                {({ pressed }) => <PeriodItem text="Semana" />}
              </Pressable>
              <Pressable onPress={() => onConfirm('month')}>
                {({ pressed }) => <PeriodItem text="Mês" />}
              </Pressable>
              <DefaultButton variant="destructive" title="Escolher data" onPress={() => null} />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
