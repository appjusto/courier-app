import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import { isProfileValid } from '@/common/profile/isProfileValid';
import { useImagesURLs } from '@/common/screens/profile/images/useImagesURLs';
import { PendingSteps } from '@/common/screens/profile/pending/PendingSteps';
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
    title: 'Dados bancários',
  },
  {
    title: 'Documentos e foto',
  },
];

export default function PendingIndex() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // state
  const profile = useProfile<CourierProfile>();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selfieUrl, documentUrl, checkSelfieTick, checkDocumentTick } = useImagesURLs();
  // side effects
  useEffect(() => {
    if (!profile) return;
    let index = 0;
    if (isProfileValid(profile)) index++;
    if (isCompanyValid(profile?.company)) index++;
    if (isBankAccountValid(profile?.bankAccount)) index++;
    if (selfieUrl && documentUrl) index++;
    setStepIndex(index);
  }, [profile, selfieUrl, documentUrl]);
  // handlers
  const canSubmit = stepIndex === steps.length;
  const canAdvance = !loading && !checkSelfieTick && !checkDocumentTick;
  const advanceHandler = () => {
    if (!profile) return;
    if (canSubmit) {
      setLoading(true);
      api
        .getProfile()
        .updateProfile(profile.id, { situation: 'submitted' })
        .then(() => {
          setLoading(false);
          router.replace('/submitted/');
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          // TODO: toast
        });
    } else {
      router.push('/pending/pager');
    }
  };
  // UI
  if (!profile) return <Loading title="Cadastro" />;
  const buttonTitle = canSubmit ? 'Enviar cadastro' : 'Preencher cadastro';
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
      {canSubmit ? (
        <DefaultButton
          style={{ marginBottom: paddings.lg }}
          variant="outline"
          title="Alterar cadastro"
          onPress={() => router.push('/pending/pager')}
        ></DefaultButton>
      ) : null}
      <DefaultButton
        title={buttonTitle}
        disabled={!canAdvance}
        loading={!canAdvance}
        onPress={advanceHandler}
      ></DefaultButton>
    </View>
  );
}
