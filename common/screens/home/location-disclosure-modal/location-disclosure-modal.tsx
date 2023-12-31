import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { isLargeScreen } from '@/common/version/device';
import { Image } from 'expo-image';
import { Modal, ModalProps, View } from 'react-native';

const IMAGE = require('./image.png');
const SIZE = isLargeScreen() ? 360 : 280;
interface Props extends ModalProps {
  onDismiss: () => void;
}

export const LocationDisclosureModal = ({ onDismiss, ...props }: Props) => {
  // UI
  return (
    <Modal animationType="slide" {...props}>
      <DefaultScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.neutral50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={IMAGE} style={{ width: SIZE, height: SIZE }} />
        </View>
        <View style={{ flex: 1, padding: paddings.lg }}>
          <View style={{ flex: 1 }} />
          <DefaultText size="lg" bold>
            Compartilha sua localização com a gente?
          </DefaultText>
          <DefaultText
            size={isLargeScreen() ? 'md' : 'md-body-app'}
            style={{ marginTop: paddings.lg, ...lineHeight.md }}
          >
            No AppJusto, as corridas tocam primeiro para os entregadores mais próximos ao local da
            retirada e esse é o único critério.
          </DefaultText>
          <DefaultText
            size={isLargeScreen() ? 'md' : 'md-body-app'}
            style={{ marginTop: paddings.lg, ...lineHeight.md }}
          >
            Para que possamos enviar corridas próximas à você e acompanhar suas entregas, você
            precisa permitir que a gente tenha acesso à sua localização o tempo todo. Nós só
            coletamos e utilizamos sua localização caso você esteja disponível para aceitar
            corridas.
          </DefaultText>
          <View style={{ flex: 1 }} />
          <DefaultButton
            style={{ marginVertical: paddings.md }}
            title="Continuar"
            onPress={onDismiss}
          />
        </View>
      </DefaultScrollView>
    </Modal>
  );
};
