import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, View } from 'react-native';
import { LocationIcon } from './location-icon';

interface Props extends ModalProps {
  onDismiss: () => void;
}
export const LocationDisclosureModal = ({ onDismiss, ...props }: Props) => {
  // UI
  return (
    <Modal animationType="slide" {...props}>
      <View style={{ flex: 1, backgroundColor: colors.white }} {...props}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.neutral50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LocationIcon />
        </View>
        <View style={{ flex: 1, padding: paddings.lg }}>
          <View style={{ flex: 1 }} />
          <DefaultText size="lg">Compartilha sua localização com a gente?</DefaultText>
          <DefaultText size="md" style={{ marginTop: paddings.lg, ...lineHeight.md }}>
            No AppJusto, as corridas tocam primeiro para os entregadores mais próximos ao local da
            retirada e esse é o único critério.
          </DefaultText>
          <DefaultText size="md" style={{ marginTop: paddings.lg }}>
            Para que possamos enviar corridas próximas à você e acompanhar suas entregas, você
            precisa permitir que a gente tenha acesso à sua localização o tempo todo. Nós só
            coletamos e utilizamos sua localização caso você esteja disponível para aceitar
            corridas.
          </DefaultText>
          <View style={{ flex: 1 }} />
          <DefaultButton
            style={{ marginVertical: paddings.md }}
            title="Autorizar"
            onPress={onDismiss}
          />
        </View>
      </View>
    </Modal>
  );
};
