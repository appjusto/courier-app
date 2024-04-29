import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { pickImage } from '@/api/files/pickImage';
import { useStorageFile } from '@/api/storage/useStorageFile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedImageBox } from '@/common/components/views/images/rounded/RoundedImageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { onSimulator } from '@/common/version/device';
import crashlytics from '@react-native-firebase/crashlytics';
import { useCameraPermissions, useMediaLibraryPermissions } from 'expo-image-picker';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Upload } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

type ImageType = 'package' | 'front';

export default function ConfirmWithoutCodeScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // state
  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();
  const [mediaPermissionStatus, requestMediaPermission] = useMediaLibraryPermissions();
  const [deliveredTo, setDeliveredTo] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [packageBase64, setPackageBase64] = useState('');
  const [frontBase64, setFrontBase64] = useState('');
  const { downloadURL: frontUrl, upload: uploadFront } = useStorageFile(
    api.orders().getOrderPODFrontPath(orderId)
  );
  const { downloadURL: packageUrl, upload: uploadPackage } = useStorageFile(
    api.orders().getOrderPODPackagePath(orderId)
  );
  useTrackScreenView('Confirmar sem código');
  // handlers
  const handleError = (error: unknown) => {
    if (error instanceof Error) crashlytics().recordError(error);
    const message = handleErrorMessage(error);
    showToast(message, 'error');
  };
  const pickAndUpload = async (type: ImageType) => {
    try {
      if (onSimulator()) {
        if (!mediaPermissionStatus?.granted) {
          const status = await requestMediaPermission();
          if (!status.granted) {
            showToast('Você precisa permitir o acesso à suas mídias.', 'error');
            return;
          }
        }
      } else {
        if (!cameraPermissionStatus?.granted) {
          const status = await requestCameraPermission();
          if (!status.granted) {
            showToast('Você precisa permitir o acesso à câmera para tirar foto.', 'error');
            return;
          }
        }
      }
      const { uri, base64 } = await pickImage(onSimulator() ? 'gallery' : 'camera');
      if (uri === null) return;
      if (uri === undefined) {
        handleError(new Error('Não foi possível obter a imagem. Verifique as permissões.'));
        return;
      }
      if (type === 'package') {
        if (base64) setPackageBase64(base64);
        await uploadPackage(uri);
      } else if (type === 'front') {
        if (base64) setFrontBase64(base64);
        await uploadFront(uri);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const confirmWithoutCodeHandler = useCallback(() => {
    setLoading(true);
    api
      .orders()
      .completeDelivery({ orderId, deliveredTo, comment })
      .catch((error: unknown) => {
        setLoading(false);
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  }, [orderId, deliveredTo, comment, api, showToast]);

  // UI
  return (
    <DefaultKeyboardAwareScrollView>
      <Stack.Screen options={{ title: 'Confirmação sem código' }} />
      {/* <SafeAreaView> */}
      <View
        style={{ flex: 1, padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}
      >
        <DefaultText size="lg">Confirmar entrega sem código</DefaultText>
        <DefaultText style={{ marginTop: paddings.xs }}>
          O código deve ser informado pelo cliente no momento da entrega do pedido:
        </DefaultText>
        <DefaultInput
          style={{ marginTop: paddings.lg }}
          title="Nome do recebedor"
          placeholder="Nome de quem recebeu"
          value={deliveredTo}
          onChangeText={setDeliveredTo}
        />
        <DefaultInput
          style={{ marginTop: paddings.lg }}
          title="Descrição adicional"
          placeholder="Ex: entregue na portaria"
          value={comment}
          onChangeText={setComment}
        />
        <DefaultText style={{ marginTop: paddings.lg }}>
          Agora, tire uma foto da encomenda e da fachada do local de entrega:
        </DefaultText>
        <View style={{ flexDirection: 'row' }}>
          <RoundedImageBox
            url={packageBase64 ? `data:image/jpg;base64,${packageBase64}` : null}
            onPress={() => pickAndUpload('package').then(null)}
          >
            <Upload color={colors.black} />
          </RoundedImageBox>
          <RoundedImageBox
            style={{ marginLeft: paddings.lg }}
            url={frontBase64 ? `data:image/jpg;base64,${frontBase64}` : null}
            onPress={() => pickAndUpload('front').then(null)}
          >
            <Upload color={colors.black} />
          </RoundedImageBox>
        </View>
        <View style={{ flex: 1 }} />
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          title="Confirmar entrega"
          disabled={!deliveredTo || loading || !packageUrl || !frontUrl}
          loading={loading}
          onPress={confirmWithoutCodeHandler}
        />
        <DefaultButton
          style={{ marginVertical: paddings.lg }}
          title="Confirmar entrega com código"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>
      {/* </SafeAreaView> */}
    </DefaultKeyboardAwareScrollView>
  );
}
