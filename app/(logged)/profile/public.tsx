import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { FullDate, formatTimestamp } from '@/common/formatters/timestamp';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Copy, Share2, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { RefObject, useRef } from 'react';
import { Pressable, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Selfie from '../../../common/screens/profile/images/selfie';

export default function PublicProfileScreen() {
  // context
  const profile = useContextProfile();
  const showToast = useShowToast();
  // state
  const fleet = useObserveFleet(profile?.fleetsIds?.find(() => true));
  // refs
  const ref = useRef<ViewShot>() as RefObject<ViewShot>;
  // tracking
  useTrackScreenView('Perfil público9');
  // handlers
  const shareProfile = () => {
    if (!ref.current?.capture) {
      showToast('Não foi possível criar a imagem com seus resultados.', 'error');
      return;
    }
    ref.current
      .capture()
      .then((uri) => {
        console.log('do something with ', uri);
        Sharing.shareAsync(`file://${uri}`, { mimeType: 'image/jpeg' }).catch((error) => {
          console.error(error);
          if (error instanceof Error) crashlytics().recordError(error);
          showToast('Não foi possível compartilhar a imagem dos seus resultados.', 'error');
        });
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) crashlytics().recordError(error);
        showToast('Não foi possível criar a imagem com seus resultados.', 'error');
      });
  };
  // UI
  if (!profile || !fleet) return <Loading title="Seu perfil" />;
  const minimumFee = formatCurrency(fleet.minimumFee);
  const distanceThreshold = formatDistance(fleet.distanceThreshold);
  const additionalPerKmAfterThreshold = formatCurrency(fleet.additionalPerKmAfterThreshold);
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen
        options={{
          title: `Seu perfil`,
          headerRight: (props) => (
            <Pressable onPress={shareProfile}>
              {() => <Share2 size={16} color={colors.neutral900} />}
            </Pressable>
          ),
        }}
      />
      <ViewShot ref={ref}>
        <DefaultView style={{ padding: paddings.lg }}>
          {/* basic info */}
          <View style={{ marginTop: paddings.xl, alignItems: 'center' }}>
            <Selfie size={100} />
            <DefaultText style={{ marginTop: paddings.sm }} size="xl">
              {profile.name}
            </DefaultText>
            <DefaultText style={{ marginTop: paddings.sm }} color="neutral800">
              {profile.about ?? ''}
            </DefaultText>
          </View>
          {/* code */}
          <View
            style={{
              marginTop: paddings.lg,
              padding: paddings.lg,
              backgroundColor: colors.primary100,
              ...borders.default,
              borderColor: colors.primary300,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <DefaultText size="xs">Código</DefaultText>
                <DefaultText size="md" color="black">
                  {profile.code}
                </DefaultText>
              </View>
              <Copy size={24} color={colors.neutral900} />
            </View>
          </View>
          {/* statistics */}
          <View
            style={{
              marginTop: paddings.lg,
              padding: paddings.lg,
              ...borders.default,
              borderColor: colors.neutral100,
            }}
          >
            <DefaultText size="md">Estatísticas do entregador</DefaultText>
            <View
              style={{
                marginTop: paddings.lg,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <DefaultText size="xs">Nº de corridas</DefaultText>
                <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                  {profile.statistics.deliveries}
                </DefaultText>
              </View>
              <View>
                <DefaultText size="xs">Avaliações</DefaultText>
                <View
                  style={{ marginTop: paddings.xs, flexDirection: 'row', alignItems: 'center' }}
                >
                  <ThumbsUp size={16} color={colors.primary500} />
                  <DefaultText style={{ marginLeft: paddings.xs }} size="md" color="primary900">
                    {profile.statistics.positiveReviews}
                  </DefaultText>
                  <ThumbsDown
                    style={{ marginLeft: paddings.sm }}
                    size={16}
                    color={colors.neutral500}
                  />
                  <DefaultText style={{ marginLeft: paddings.xs }} size="md" color="neutral700">
                    {profile.statistics.negativeReviews}
                  </DefaultText>
                </View>
              </View>
              {profile.timestamps.approved ? (
                <View>
                  <DefaultText size="xs">Membro desde</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                    {formatTimestamp(profile.timestamps.approved, FullDate)}
                  </DefaultText>
                </View>
              ) : null}
            </View>
          </View>
          {/* fleet */}
          <View
            style={{
              marginTop: paddings.lg,
              padding: paddings.lg,
              ...borders.default,
              borderColor: colors.neutral100,
            }}
          >
            <RoundedText
              style={{ backgroundColor: colors.primary100 }}
              color="primary900"
            >{`Frota ${fleet.name}`}</RoundedText>
            <View
              style={{
                marginTop: paddings.lg,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <DefaultText size="xs">Mínimo</DefaultText>
                <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                  {minimumFee}
                </DefaultText>
              </View>
              <View>
                <DefaultText size="xs">Até</DefaultText>
                <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                  {distanceThreshold}
                </DefaultText>
              </View>
              <View>
                <DefaultText size="xs">Adicional / KM</DefaultText>
                <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                  {additionalPerKmAfterThreshold}
                </DefaultText>
              </View>
            </View>
          </View>
        </DefaultView>
      </ViewShot>
    </DefaultScrollView>
  );
}
