import { useContextApi } from '@/api/ApiContext';
import { PickImageFrom, pickImage } from '@/api/files/pickImage';
import { useProfile } from '@/api/profile/useProfile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { CheckmarkIcon } from '@/common/components/lists/icons/CheckmarkIcon';
import { DocumentIcon } from '@/common/components/profile/icons/DocumentIcon';
import { SelfieIcon } from '@/common/components/profile/icons/SelfieIcon';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';

type ImageType = 'selfie' | 'document';

interface Props {
  onUpdateProfile?: () => void;
}

export default function ProfilePersonalImages({ onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const courier = useProfile();
  const courierId = courier?.id;
  const router = useRouter();
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
    <View style={{ ...screens.default }}>
      <DefaultListItem
        title="Foto do rosto"
        subtitles={['Adicionar selfie']}
        leftView={
          selfieUrl ? (
            <View style={{ top: 2 }}>
              <CheckmarkIcon />
            </View>
          ) : checkSelfieTick ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        rightView={canUploadImages ? <ArrowRightIcon /> : null}
        onPress={() => actionSheetHandler('selfie', [1, 1])}
      />
      <DefaultListItem
        title="RG ou CNH aberta"
        subtitles={['Adicionar foto do documento']}
        leftView={
          documentUrl ? (
            <View style={{ top: 2 }}>
              <CheckmarkIcon />
            </View>
          ) : checkDocumentTick ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        rightView={canUploadImages ? <ArrowRightIcon /> : null}
        onPress={() => actionSheetHandler('document', [8.5, 12])}
      />
      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg, alignItems: 'center' }}>
        <CircledView
          size={160}
          style={{ borderColor: selfieUrl ? colors.neutral50 : colors.black }}
        >
          {selfieUrl ? (
            <Image
              style={{ width: 160, height: 160 }}
              resizeMode="cover"
              source={{ uri: selfieUrl }}
            />
          ) : null}
          {!selfieUrl && !checkSelfieTick ? (
            <Pressable onPress={() => actionSheetHandler('selfie', [1, 1])}>
              <View style={{ alignItems: 'center' }}>
                <SelfieIcon />
                <DefaultText>Foto do rosto</DefaultText>
              </View>
            </Pressable>
          ) : null}
          {!selfieUrl && checkSelfieTick ? (
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size="small" />
            </View>
          ) : null}
        </CircledView>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg, alignItems: 'center' }}>
        <View style={{ padding: paddings.lg, alignItems: 'center' }}>
          <CircledView
            size={160}
            style={{ borderColor: documentUrl ? colors.neutral50 : colors.black }}
          >
            {documentUrl ? (
              <Image
                style={{ width: 160, height: 160 }}
                resizeMode="cover"
                source={{ uri: documentUrl }}
              />
            ) : null}
            {!documentUrl && !checkDocumentTick ? (
              <Pressable onPress={() => actionSheetHandler('document', [8.5, 12])}>
                <View style={{ alignItems: 'center' }}>
                  <DocumentIcon />
                  <DefaultText>RG ou CHN</DefaultText>
                </View>
              </Pressable>
            ) : null}
            {!documentUrl && checkDocumentTick ? (
              <View style={{ alignItems: 'center' }}>
                <ActivityIndicator size="small" />
              </View>
            ) : null}
          </CircledView>
        </View>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg }}>
        {canUploadImages ? (
          <DefaultButton
            title="Avançar"
            disabled={!selfieUrl || !documentUrl}
            onPress={() => {
              if (onUpdateProfile) onUpdateProfile();
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
