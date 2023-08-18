import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { PendingSteps } from '@/common/screens/pending/PendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

const steps = [
  {
    title: 'Dados pessoais',
  },
  {
    title: 'Dados da sua PJ',
  },
  {
    title: 'Documentos e foto',
  },
  {
    title: 'Dados bancários',
  },
];

export default function PendingIndex() {
  // context
  const router = useRouter();
  // state
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
  // UI
  const buttonTitle = `Preencher ${step.title}`;
  return (
    <View style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <DefaultText size="xl" style={{ marginVertical: paddings.xl }}>
        Vamos começar o seu processo de cadastro no AppJusto
      </DefaultText>
      {/* <ProfilePersonalData /> */}
      <PendingSteps steps={steps} index={stepIndex} />
      <MessageBox style={{ marginVertical: paddings.xl }}>
        Inicie o processo em um momento tranquilo para que você possa finalizar todas as etapas
        necessárias.
      </MessageBox>
      <View style={{ flex: 1 }} />
      <DefaultButton
        title={buttonTitle}
        onPress={() => router.push('/pending/pager')}
      ></DefaultButton>
    </View>
  );
}
