import { useContextApi } from '@/api/ApiContext';
import { PickImageFrom, pickImage } from '@/api/files/pickImage';
import { useProfile } from '@/api/profile/useProfile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { RoundedImageBox } from '@/common/components/views/images/rounded/RoundedImageBox';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Upload } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { PendingStep } from '../pending/PendingStep';

type ImageType = 'selfie' | 'document';

interface Props {
  onUpdateProfile?: () => void;
}

export default function ProfilePersonalImages({ onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const courier = useProfile();
  const courierId = courier?.id;
  const { showActionSheetWithOptions } = useActionSheet();
  // state
  const [selfieUrl, setSelfieUrl] = useState<string | null>();
  const [documentUrl, setDocumentUrl] = useState<string | null>();
  const [checkSelfieTick, setCheckSelfieTick] = useState<number>();
  const [checkDocumentTick, setCheckDocumentTick] = useState<number>();
  // helpers
  const canUploadImages = courier?.situation !== 'approved';
  // const canUploadImages = getEnv() !== 'live' || courier?.situation !== 'approved';
  const fetchSelfie = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.getProfile().getSelfieDownloadURL(courierId, '1024x1024');
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, courierId]);
  const fetchDocument = useCallback(async () => {
    if (!courierId) return;
    try {
      return await api.getProfile().getDocumentDownloadURL(courierId, '1024x1024');
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }, [api, courierId]);
  // side effects
  // initial selfie fetch
  useEffect(() => {
    fetchSelfie().then(setSelfieUrl);
  }, [fetchSelfie]);
  // initial document fetch
  useEffect(() => {
    fetchDocument().then(setDocumentUrl);
  }, [fetchDocument]);
  // selfie fetch after upload
  useEffect(() => {
    if (!checkSelfieTick) return;
    const timeout = setTimeout(async () => {
      const selfie = await fetchSelfie();
      if (selfie) {
        setSelfieUrl(selfie);
        setCheckSelfieTick(undefined);
      } else setCheckSelfieTick((value) => (value ?? 0) + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [checkSelfieTick, fetchSelfie]);
  // selfie fetch after upload
  useEffect(() => {
    if (!checkDocumentTick) return;
    const timeout = setTimeout(async () => {
      const document = await fetchDocument();
      if (document) {
        setDocumentUrl(document);
        setCheckDocumentTick(undefined);
      } else setCheckDocumentTick((value) => (value ?? 0) + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [checkDocumentTick, fetchDocument]);
  // handlers
  const pickAndUpload = async (from: PickImageFrom, type: ImageType, aspect: [number, number]) => {
    if (!courierId) return;
    try {
      const uri = await pickImage(from, aspect);
      if (uri === null) return;
      if (uri === undefined) {
        // TODO: mostrar alerta de erro
        return;
      }
      if (type === 'selfie') {
        setCheckSelfieTick(1);
        await api.getProfile().uploadSelfie(courierId, uri);
      } else if (type === 'document') {
        setCheckDocumentTick(1);
        await api.getProfile().uploadDocument(courierId, uri);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const actionSheetHandler = (type: ImageType, aspect: [number, number]) => {
    if (!canUploadImages) return;
    showActionSheetWithOptions(
      {
        options: ['Tirar uma foto', 'Escolher da galeria', 'Cancelar'],
        cancelButtonIndex: 2,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) await pickAndUpload('camera', type, aspect);
        else if (buttonIndex === 1) await pickAndUpload('gallery', type, aspect);
      }
    );
  };
  // UI
  const title = 'Selfie e documento';
  if (selfieUrl === undefined || documentUrl === undefined) {
    return <Loading backgroundColor="neutral50" title={title} />;
  }
  return (
    <View style={{ flex: 1, padding: paddings.lg }}>
      <DefaultText size="lg">Tire foto do seu rosto e documento</DefaultText>
      <View style={{ flex: 1, marginTop: paddings.lg }}>
        <PendingStep
          index={0}
          title="Foto de rosto"
          variant={selfieUrl ? 'past' : 'next'}
          icon="check"
        />
        <RoundedImageBox
          url={selfieUrl}
          loading={Boolean(checkSelfieTick)}
          onPress={() => actionSheetHandler('selfie', [1, 1])}
        >
          <Upload color={colors.neutral800} />
        </RoundedImageBox>
        <PendingStep
          index={1}
          title="RG ou CNH aberta"
          variant={documentUrl ? 'past' : 'next'}
          icon="check"
        />
        <RoundedImageBox
          url={documentUrl}
          loading={Boolean(checkDocumentTick)}
          onPress={() => actionSheetHandler('document', [8.5, 12])}
        >
          <Upload color={colors.neutral800} />
        </RoundedImageBox>
      </View>

      <View style={{ flex: 1 }} />
      {canUploadImages ? (
        <DefaultButton
          style={{ marginBottom: paddings.lg }}
          title="Salvar e avançar"
          disabled={!selfieUrl || !documentUrl}
          onPress={() => {
            if (onUpdateProfile) onUpdateProfile();
          }}
        />
      ) : null}
    </View>
  );
}
