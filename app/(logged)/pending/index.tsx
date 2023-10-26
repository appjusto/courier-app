import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useStorageFile } from '@/api/storage/useStorageFile';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { ConfirmModal } from '@/common/components/modals/confirm-modal';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import { isProfileValid } from '@/common/profile/isProfileValid';
import { PendingSteps } from '@/common/screens/profile/pending/PendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const STEPS = ['Dados pessoais', 'Dados da sua PJ', 'Dados bancários', 'Documentos e foto'];

export default function PendingIndex() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // state
  const profile = useContextProfile();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  // const { selfieUrl, fetchSelfie, documentUrl, fetchDocument, checkSelfieTick, checkDocumentTick } =
  //   useImagesURLs(false);
  const { downloadURL: selfieUrl, loading: loadingSelfie } = useStorageFile(
    api.profile().getSelfiePath()
  );
  const { downloadURL: documentUrl, loading: loadingDocument } = useStorageFile(
    api.profile().getDocumentPath()
  );
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  // tracking
  useTrackScreenView('Cadastro Checklist');
  // side effects
  useEffect(() => {
    if (!profile) return;
    let index = 0;
    if (isProfileValid(profile)) {
      index++;
      if (isCompanyValid(profile?.company)) {
        index++;
        if (isBankAccountValid(profile?.bankAccount)) {
          index++;
          if (selfieUrl && documentUrl) {
            index++;
          }
        }
      }
    }
    setStepIndex(index);
  }, [profile, selfieUrl, documentUrl]);
  // handlers
  const canSubmit = stepIndex === STEPS.length;
  const canAdvance = !loading && !loadingSelfie && !loadingDocument;
  const advanceHandler = () => {
    if (!profile) return;
    if (canSubmit) {
      setLoading(true);
      api
        .profile()
        .submitProfile()
        .then(() => {
          setLoading(false);
          // router.replace('/submitted/');
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          // TODO: toast
        });
    } else {
      router.push({ pathname: `/pending/pager`, params: { initialPage: stepIndex } });
    }
  };
  // UI
  if (!profile) return <Loading title="Cadastro" />;
  const buttonTitle = canSubmit ? 'Enviar cadastro' : 'Preencher cadastro';
  return (
    <View style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Cadastro', headerBackVisible: false }} />
      <ConfirmModal
        visible={logoutModalVisible}
        text="Tem certeza que deseja sair?"
        cancelButtonLabel="Não, quero continuar logado"
        onConfirm={() => {
          setLogoutModalVisible(false);
          api.auth().signOut();
        }}
        onCancel={() => setLogoutModalVisible(false)}
      />
      <DefaultText size="xl" style={{ marginVertical: paddings.xl }}>
        Vamos começar o seu processo de cadastro no AppJusto
      </DefaultText>
      {/* <ProfilePersonalData /> */}
      <PendingSteps steps={STEPS} index={stepIndex} />
      <MessageBox style={{ marginVertical: paddings.xl }}>
        O tempo estimado pra finalizar é de 10 minutos. Foca que é rapidinho ;)
      </MessageBox>
      <View style={{ flex: 1 }} />
      <DefaultButton
        title={buttonTitle}
        disabled={!canAdvance}
        loading={!canAdvance}
        onPress={advanceHandler}
      />
      {canSubmit ? (
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          variant="outline"
          title="Alterar cadastro"
          onPress={() => router.push('/pending/pager')}
        />
      ) : null}
      <LinkButton
        style={{ alignSelf: 'center' }}
        variant="ghost"
        size="medium"
        onPress={() => setLogoutModalVisible(true)}
      >
        Sair
      </LinkButton>
    </View>
  );
}
