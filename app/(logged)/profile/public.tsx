import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextFleets, useContextProfile } from '@/common/auth/AuthContext';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { FullDate, formatTimestamp } from '@/common/formatters/timestamp';
import { ProfileCode } from '@/common/screens/profile/code/profile-code';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import typography from '@/common/styles/typography';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Share2, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import Selfie from '../../../common/screens/profile/images/selfie';

export default function PublicProfileScreen() {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const showToast = useShowToast();
  const fleets = useContextFleets();
  // refs
  const aboutRef = useRef<TextInput>(null);
  const ref = useRef<ViewShot>() as RefObject<ViewShot>;
  // state
  const [about, setAbout] = useState<string>();
  const [aboutFocused, setAboutFocused] = useState(false);
  // tracking
  useTrackScreenView('Perfil público');
  // side effects
  useEffect(() => {
    if (profile?.about && about === undefined) setAbout(profile.about ?? '');
  }, [profile, about]);
  // handlers
  const updateProfileHandler = () => {
    if (!profile?.id) return;
    api
      .profile()
      .updateProfile({ about })
      .then(() => {
        aboutRef.current?.blur();
        showToast('Seu perfil foi atualizado!', 'success');
      })
      .catch((error) => {
        console.error(error);
        showToast('Não foi possível atualizar seu perfil. Tente novamente', 'error');
      });
  };
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
  if (!profile || !fleets) return <Loading title="Seu perfil" />;
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
            <DefaultInput
              ref={aboutRef}
              style={{ marginTop: paddings.sm, width: '100%' }}
              inputStyle={{ ...typography.sm }}
              containerStyle={{ borderColor: colors.neutral200 }}
              title={!about ? 'Sobre você' : ''}
              placeholder="Que tal falar um pouco sobre você para que o cliente te conheça melhor?"
              keyboardType="default"
              multiline
              value={about}
              onChangeText={setAbout}
              onFocus={() => setAboutFocused(true)}
              onBlur={() => {
                setAboutFocused(false);
                updateProfileHandler();
              }}
            />
            {aboutFocused ? (
              <LinkButton
                variant="ghost"
                style={{ alignSelf: 'flex-end' }}
                onPress={updateProfileHandler}
              >
                Salvar
              </LinkButton>
            ) : null}
          </View>
          {/* financial goal */}
          {/* <View
            style={{
              marginTop: paddings.lg,
              padding: paddings.lg,
              ...borders.default,
              borderColor: colors.neutral100,
            }}
          >
            <DefaultText size="md">Meta financeira</DefaultText>
            <View
              style={{
                marginTop: paddings.xs,
              }}
            >
              <DefaultText size="xs">
                Adicione uma meta financeira para incentivar os clientes a dar uma caixinha
              </DefaultText>
              <DefaultButton
                style={{ marginTop: paddings.lg }}
                onPress={() => null}
                title="Adicionar meta financeira"
              />
            </View>
          </View> */}
          {/* code */}
          <ProfileCode />
          {/* statistics */}
          <View
            style={{
              marginTop: paddings.lg,
              padding: paddings.lg,
              ...borders.default,
              borderColor: colors.neutral100,
            }}
          >
            <DefaultText size="md">Estatísticas</DefaultText>
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
          {/* fleets */}
          {fleets.map((fleet) => {
            const minimumFee = formatCurrency(fleet.minimumFee);
            const distanceThreshold = formatDistance(fleet.distanceThreshold);
            const additionalPerKmAfterThreshold = formatCurrency(
              fleet.additionalPerKmAfterThreshold
            );

            return (
              <View
                key={fleet.id}
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
            );
          })}
        </DefaultView>
      </ViewShot>
    </DefaultScrollView>
  );
}
