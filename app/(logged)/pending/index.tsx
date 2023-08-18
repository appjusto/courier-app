import { useProfile } from '@/api/profile/useProfile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import { isProfileValid } from '@/common/profile/isProfileValid';
import { PendingSteps } from '@/common/screens/pending/PendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { CourierProfile } from '@appjusto/types';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
  const profile = useProfile<CourierProfile>();
  const [stepIndex, setStepIndex] = useState(0);
  useEffect(() => {
    if (!profile) return;
    let index = 0;
    if (isProfileValid(profile)) index++;
    if (isCompanyValid(profile?.company)) index++;
    if (isBankAccountValid(profile?.bankAccount)) index++;
    setStepIndex(index);
  }, [profile]);
  // UI
  const buttonTitle = `Preencher cadastro`;
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
