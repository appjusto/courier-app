import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { ChevronUp } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { FleetCardParam } from '../../profile/fleets/FleetCardParam';

interface Props extends ViewProps {}

export const HomeFleet = ({ style, ...props }: Props) => {
  // context
  const profile = useContextProfile();
  // state
  const fleet = useObserveFleet(profile?.fleetsIds?.find(() => true));
  const [opened, setOpened] = useState(false);
  // animation
  const animation = useDynamicAnimation(() => ({
    rotate: '0deg',
  }));
  // side effects
  useEffect(() => {
    console.log('animation');
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
    <Pressable onPress={() => setOpened((opened) => !opened)}>
      {({ pressed }) => (
        <View
          style={[
            {
              ...borders.default,
              borderColor: colors.primary300,
              backgroundColor: colors.primary100,
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
              <FleetCardParam
                variant="home"
                text="Distância inicial mínima"
                value={distanceThreshold}
              />
              <FleetCardParam
                variant="home"
                text="Valor adicional por km rodado"
                value={additionalPerKmAfterThreshold}
                style={{ borderBottomWidth: 0, paddingBottom: 0 }}
              />
            </View>
          ) : null}
        </View>
      )}
    </Pressable>
  );
};
