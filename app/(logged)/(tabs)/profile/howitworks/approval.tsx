import { DefaultView } from '@/common/components/containers/DefaultView';
import { ImageApprovalProcess } from '@/common/components/profile/howitworks/approval/image';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { AlertBox } from '@/common/components/views/AlertBox';
import paddings from '@/common/styles/paddings';
import { Stack } from 'expo-router';
import { Pressable, ScrollView } from 'react-native';

export default function ApprovalProcess() {
  // context
  // const router = useRouter();
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Aprovação de cadastro' }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultText size="2xl">Funcionamento da aprovação de cadastro</DefaultText>
        <DefaultText
          size="sm"
          color="gray700"
          style={{
            marginTop: paddings.sm,
          }}
        >
          Se você está cadastrado na cidade de São Paulo ou trabalha na cidade, faremos a aprovação
          toda sexta-feira ao longo do dia.
        </DefaultText>
        <DefaultText
          size="sm"
          color="gray700"
          style={{
            marginTop: paddings.sm,
          }}
        >
          Para isso, você só precisa estar com a sua inscrição MEI em dia, e enviar todas as
          informações no cadastro.'
        </DefaultText>
        <ImageApprovalProcess />
        <Pressable onPress={() => null}>
          <AlertBox
            style={{ marginTop: paddings.lg }}
            title="Não está em São Paulo?"
            description="Não se preocupe, estamos em processo de expansão. Clique aqui para recomendar restaurantes
        da sua cidade para nos ajudar a chegar em outras cidades!"
          />
        </Pressable>
      </DefaultView>
    </ScrollView>
  );
}
