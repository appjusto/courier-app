import { ShowToast } from '@/common/components/toast/Toast';
import * as ImagePicker from 'expo-image-picker';

const defaultImageOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 1,
};

export type PickImageFrom = 'gallery' | 'camera';

export const pickImage = async (from: PickImageFrom, aspect: [number, number]) => {
  const options = { ...defaultImageOptions, aspect };
  const result =
    from === 'gallery'
      ? await ImagePicker.launchImageLibraryAsync(options)
      : await ImagePicker.launchCameraAsync(options);
  // https://docs.expo.dev/versions/latest/sdk/imagepicker/#imagepickergetpendingresultasync
  // const pendingResult = (await ImagePicker.getPendingResultAsync()).find(() => true) ?? result;
  const pendingResult = result;
  // ShowToast((JSON.stringify(pendingResult));
  if ('canceled' in pendingResult) {
    if (pendingResult.canceled) {
      return null;
    }
    return pendingResult.assets[0].uri;
  } else {
    console.error(JSON.stringify(pendingResult));
    ShowToast(JSON.stringify(pendingResult));
    return undefined;
  }
};
