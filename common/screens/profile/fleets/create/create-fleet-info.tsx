import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { useRef } from 'react';
import { View, ViewProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends ViewProps {
  name: string;
  description: string;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  onSave: () => void;
}

const NAME_LIMIT = 26;
const DESCRIPTION_LIMIT = 140;

export const CreateFleetInfo = ({
  name,
  setName,
  description,
  setDescription,
  style,
  onSave,
  ...props
}: Props) => {
  // refs
  const nameRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  // UI
  return (
    <View style={[{ padding: paddings.lg }, style]} {...props}>
      <DefaultText style={{ ...lineHeight.lg }} size="lg">
        Preencha as informações da sua frota
      </DefaultText>
      <DefaultInput
        style={{ marginTop: paddings.xl }}
        ref={nameRef}
        title="Nome da frota"
        placeholder={`Nome da frota em até ${NAME_LIMIT} caracteres`}
        value={name}
        returnKeyType="next"
        blurOnSubmit={false}
        limit={NAME_LIMIT}
        onChangeText={setName}
        onSubmitEditing={() => descriptionRef.current?.focus()}
      />
      <DefaultInput
        ref={descriptionRef}
        style={{ marginTop: paddings.lg }}
        title="Descrição"
        placeholder={`Descreva sua frota em até ${DESCRIPTION_LIMIT} caracteres`}
        value={description}
        limit={DESCRIPTION_LIMIT}
        multiline
        returnKeyType="next"
        blurOnSubmit
        onChangeText={setDescription}
      />
      <MessageBox style={{ marginVertical: paddings.xl }}>
        As frotas só aparecerem como opção para o cliente quando houver pelo menos 5 pessoas
        disponíveis para realizar a entrega.
      </MessageBox>
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginVertical: paddings.lg }}
        title="Salvar e avançar"
        disabled={!name.length || !description.length}
        onPress={onSave}
      />
    </View>
  );
};
