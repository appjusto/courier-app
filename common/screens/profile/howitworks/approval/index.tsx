import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Pressable } from 'react-native';
import { ImageApprovalProcess } from './image';

export default function ApprovalProcess() {
  return (
    <DefaultView style={{ padding: paddings.lg, backgroundColor: colors.neutral50 }}>
      <DefaultText style={{ ...lineHeight.lg }} size="lg">
        Funcionamento da aprovação de cadastro
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        Se você está cadastrado na cidade de São Paulo ou trabalha na cidade, faremos a aprovação
        toda sexta-feira ao longo do dia.
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        Para isso, você só precisa estar com a sua inscrição MEI em dia, e enviar todas as
        informações no cadastro.
      </DefaultText>
      <ImageApprovalProcess style={{ marginTop: paddings.xl }} />
      <Pressable onPress={() => null}>
        <MessageBox
          style={{ marginTop: paddings.xl }}
          textStyle={{ color: colors.neutral700 }}
          variant="success"
          title="Não está em São Paulo?"
          iconless
        >
          Não se preocupe, estamos em processo de expansão. Clique aqui para recomendar restaurantes
          da sua cidade para nos ajudar a chegar em outras cidades!
        </MessageBox>
      </Pressable>
    </DefaultView>
  );
}
