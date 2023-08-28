import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import paddings from '@/common/styles/paddings';
import { Pressable } from 'react-native';
import { ImageApprovalProcess } from './image';

export default function ApprovalProcess() {
  return (
    <DefaultView style={{ padding: paddings.lg }}>
      <DefaultText size="lg">Funcionamento da aprovação de cadastro</DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginTop: paddings.sm,
        }}
      >
        Se você está cadastrado na cidade de São Paulo ou trabalha na cidade, faremos a aprovação
        toda sexta-feira ao longo do dia.
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginTop: paddings.sm,
        }}
      >
        Para isso, você só precisa estar com a sua inscrição MEI em dia, e enviar todas as
        informações no cadastro.'
      </DefaultText>
      <ImageApprovalProcess />
      <Pressable onPress={() => null}>
        <MessageBox>
          Não está em São Paulo? Não se preocupe, estamos em processo de expansão. Clique aqui para
          recomendar restaurantes da sua cidade para nos ajudar a chegar em outras cidades!
        </MessageBox>
      </Pressable>
    </DefaultView>
  );
}
