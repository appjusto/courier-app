import { useObserveActiveFleet } from '@/api/fleets/useObserveActiveFleet';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { router } from 'expo-router';
import { ChevronUp } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { HomeFleetParam } from '../../profile/fleets/home-fleet-param';
import { ShareFleetCard } from './share-fleet-card';

interface Props extends ViewProps {}

export const HomeFleet = ({ style, ...props }: Props) => {
  // state
  const fleet = useObserveActiveFleet();
  const [opened, setOpened] = useState(false);
  // animation
  const animation = useDynamicAnimation(() => ({
    rotate: '0deg',
  }));
  // side effects
  useEffect(() => {
    animation.animateTo({
      rotate: opened ? '0deg' : '180deg',
    });
  }, [opened, animation]);
  // UI
  const fleetName = fleet ? 'Frota ' + fleet.name : '-';
  const minimumFee = fleet ? formatCurrency(fleet.minimumFee) : '-';
  const distanceThreshold = fleet ? formatDistance(fleet.distanceThreshold) : '-';
  const additionalPerKmAfterThreshold = fleet
    ? formatCurrency(fleet.additionalPerKmAfterThreshold)
    : '-';
  return (
    <Pressable
      onPress={() => {
        setOpened((opened) => !opened);
      }}
    >
      {({ pressed }) => (
        <View
          style={[
            {
              ...borders.default,
              borderColor: colors.neutral200,
              backgroundColor: colors.neutral50,
              padding: paddings.lg,
            },
            style,
          ]}
          {...props}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <DefaultText size="xs">Você está na</DefaultText>
              <DefaultText size="md" color="black">
                {fleetName}
              </DefaultText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RoundedText
                size="md"
                style={{
                  borderColor: colors.black,
                  backgroundColor: colors.white,
                  marginRight: paddings.sm,
                  borderWidth: 1,
                  paddingVertical: paddings.sm,
                }}
              >
                {minimumFee}
              </RoundedText>
              <MotiView state={animation} transition={{ duration: 1000 }}>
                <ChevronUp size={24} color={colors.neutral900} />
              </MotiView>
            </View>
          </View>
          {opened ? (
            <View style={{ marginTop: paddings.lg }}>
              <HomeFleetParam
                variant="home"
                text="Distância coberta pelo valor mínimo da corrida"
                value={distanceThreshold}
              />
              <HomeFleetParam
                variant="home"
                text="Valor adicional por km rodado"
                value={additionalPerKmAfterThreshold}
                style={{ borderBottomWidth: 0, paddingBottom: 0 }}
              />
              <ShareFleetCard
                style={{ marginTop: paddings.lg }}
                fleetId={fleet?.id}
                fleetName={fleetName}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: paddings.lg,
                }}
              >
                <View style={{ flex: 1 }}>
                  <DefaultButton
                    title="Trocar de frota"
                    variant="outline"
                    onPress={() => router.push('/fleets/search')}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: paddings.lg }}>
                  <DefaultButton
                    title="Ver detalhes"
                    onPress={() => {
                      if (!fleet) return;
                      router.push({ pathname: '/(logged)/fleets/[id]', params: { id: fleet.id } });
                    }}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
};
