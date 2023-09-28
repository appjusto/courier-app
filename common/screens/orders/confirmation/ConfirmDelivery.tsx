import { useContextApi } from '@/api/ApiContext';
import { pickImage } from '@/api/files/pickImage';
import { getNextDispatchingState } from '@/api/orders/dispatching-state/getNextDispatchingState';
import { useStorageFile } from '@/api/storage/useStorageFile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CodeInput } from '@/common/components/inputs/code-input/CodeInput';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedImageBox } from '@/common/components/views/images/rounded/RoundedImageBox';
import { useToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { onSimulator } from '@/common/version/device';
import { Order, WithId } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { useCameraPermissions, useMediaLibraryPermissions } from 'expo-image-picker';
import { Upload } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  order: WithId<Order>;
}

type ImageType = 'package' | 'front';

export const ConfirmDelivery = ({ order, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // params
  const orderId = order.id;
  const { dispatchingState } = order;
  const nextDispatchingState = getNextDispatchingState(order);
  // state
  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();
  const [mediaPermissionStatus, requestMediaPermission] = useMediaLibraryPermissions();
  const [code, setCode] = useState('');
  const [confirmWithoutCode, setConfirmWithoutCode] = useState(false);
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
  // handlers
  const confirmHandler = useCallback(() => {
    if (nextDispatchingState) return;
    if (code.length !== 3) {
      showToast('Preencha o código de confirmação para finalizar a entrega', 'error');
      return;
    }
    setLoading(true);
    api
      .orders()
      .completeDelivery({ orderId, handshakeResponse: code })
      .then(() => {
        setLoading(false);
      })
      .catch((error: unknown) => {
        setLoading(false);
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  }, [orderId, nextDispatchingState, code, api, showToast]);
  const confirmWithoutCodeHandler = useCallback(() => {
    if (nextDispatchingState) return;
    setLoading(true);
    api
      .orders()
      .completeDelivery({ orderId, deliveredTo, comment })
      .then(() => {
        setLoading(false);
      })
      .catch((error: unknown) => {
        setLoading(false);
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  }, [orderId, nextDispatchingState, deliveredTo, comment, api, showToast]);
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
  // UI
  if (dispatchingState !== 'arrived-destination') return null;
  if (!confirmWithoutCode)
    return (
      <View
        style={[{ flex: 1, padding: paddings.xl, backgroundColor: colors.neutral50 }, style]}
        {...props}
      >
        <View style={{ padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}>
          <DefaultText size="lg">Código de confirmação</DefaultText>
          <DefaultText style={{ marginTop: paddings.xs }}>
            O código deve ser informado pelo cliente no momento da entrega do pedido:
          </DefaultText>
          <CodeInput
            style={{ marginTop: paddings.lg, justifyContent: 'flex-start' }}
            value={code}
            onChange={setCode}
          />
          <DefaultButton
            style={{ marginTop: paddings.lg }}
            title="Confirmar entrega"
            disabled={code.length !== 3 || loading}
            loading={loading}
            onPress={confirmHandler}
          />
        </View>
        <View style={{ flex: 1 }} />
        <DefaultButton
          style={{ marginBottom: paddings.lg }}
          title="Confirmar entrega sem código"
          variant="outline"
          onPress={() => setConfirmWithoutCode(true)}
        />
      </View>
    );
  return (
    <View style={{ flex: 1, padding: paddings.xl, backgroundColor: colors.neutral50 }}>
      <View style={{ padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}>
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
          <RoundedImageBox url={packageBase64} onPress={() => pickAndUpload('package').then(null)}>
            <Upload color={colors.black} />
          </RoundedImageBox>
          <RoundedImageBox
            style={{ marginLeft: paddings.lg }}
            url={frontBase64}
            onPress={() => pickAndUpload('front').then(null)}
          >
            <Upload color={colors.black} />
          </RoundedImageBox>
        </View>
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          title="Confirmar entrega"
          disabled={!deliveredTo || loading || !packageUrl || !frontUrl}
          loading={loading}
          onPress={confirmWithoutCodeHandler}
        />
      </View>
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginBottom: paddings.lg }}
        title="Confirmar entrega com código"
        variant="outline"
        onPress={() => setConfirmWithoutCode(false)}
      />
    </View>
  );
};
