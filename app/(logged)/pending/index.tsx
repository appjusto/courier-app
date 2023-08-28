import { useContextApi } from '@/api/ApiContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import { isProfileValid } from '@/common/profile/isProfileValid';
import { LogoutModal } from '@/common/screens/profile/home/logout-modal';
import { useImagesURLs } from '@/common/screens/profile/images/useImagesURLs';
import { PendingSteps } from '@/common/screens/profile/pending/PendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
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
  const profile = useContextProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selfieUrl, documentUrl, checkSelfieTick, checkDocumentTick } = useImagesURLs(
    stepIndex === 3
  );
  const [logoutVisible, setLogoutVisible] = useState(false);
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
      // @ts-expect-error
      router.push({ pathname: `/pending/pager`, params: { initialPage: stepIndex } });
    }
  };
  // UI
  if (!profile) return <Loading title="Cadastro" />;
  const buttonTitle = canSubmit ? 'Enviar cadastro' : 'Preencher cadastro';
  return (
    <View style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <LogoutModal
        visible={logoutVisible}
        onConfirm={() => api.getAuth().signOut()}
        onCancel={() => setLogoutVisible(false)}
      />
      <DefaultText size="xl" style={{ marginVertical: paddings.xl }}>
        Vamos começar o seu processo de cadastro no AppJusto
      </DefaultText>
      {/* <ProfilePersonalData /> */}
      <PendingSteps steps={steps} index={stepIndex} />
      <MessageBox style={{ marginVertical: paddings.xl }}>
        O tempo estimado pra finalizar é de 10 minutos. Foca que é rapidinho ;)
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
        style={{ marginBottom: paddings.lg }}
        variant="outline"
        title="Sair"
        onPress={() => setLogoutVisible(true)}
      ></DefaultButton>
      <DefaultButton
        title={buttonTitle}
        disabled={!canAdvance}
        loading={!canAdvance}
        onPress={advanceHandler}
      ></DefaultButton>
    </View>
  );
}
