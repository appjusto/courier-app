import { useContextApi } from '@/api/ApiContext';
import { PickImageFrom, pickImage } from '@/api/files/pickImage';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { RoundedImageBox } from '@/common/components/views/images/rounded/RoundedImageBox';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Upload } from 'lucide-react-native';
import { View } from 'react-native';
import { PendingStep } from '../pending/PendingStep';
import { useImagesURLs } from './useImagesURLs';

type ImageType = 'selfie' | 'document';

interface Props {
  onUpdateProfile?: () => void;
}

export default function ProfilePersonalImages({ onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = profile?.id;
  const approved = profile?.situation === 'approved';
  const canUploadImages = !approved;
  const { showActionSheetWithOptions } = useActionSheet();
  // state
  const {
    selfieUrl,
    documentUrl,
    checkSelfieTick,
    setCheckSelfieTick,
    checkDocumentTick,
    setCheckDocumentTick,
  } = useImagesURLs(approved);
  // helpers

  // const canUploadImages = getEnv() !== 'live' || courier?.situation !== 'approved';
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
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <DefaultText size="lg">
        {profile?.situation === 'approved'
          ? 'Selfie e documento'
          : 'Tire foto do seu rosto e documento'}
      </DefaultText>
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
          style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
          title="Salvar e avançar"
          disabled={!selfieUrl || !documentUrl}
          onPress={() => {
            if (onUpdateProfile) onUpdateProfile();
          }}
        />
      ) : null}
    </DefaultScrollView>
  );
}
