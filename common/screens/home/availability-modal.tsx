import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HelmetLargeIcon } from '@/common/icons/helmet-lg';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { CourierMode } from '@appjusto/types';
import { Bike, CarFront } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  onConfirm: (mode: CourierMode) => void;
  onDismiss: () => void;
}
export const AvailabilityModal = ({ onConfirm, onDismiss, ...props }: Props) => {
  // context
  const profile = useContextProfile();
  const mode = profile?.mode;
  // state
  const [selectedMode, setSelectedMode] = useState(mode);
  // UI
  return (
    <Modal animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: paddings.md,
                  height: 6,
                  width: 50,
                  borderRadius: 100,
                  backgroundColor: colors.neutral100,
                }}
              />
              <DefaultText style={{ marginTop: paddings['2xl'] }} size="xl">
                Como você vai fazer suas entregas hoje?
              </DefaultText>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: paddings['2xl'],
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <OnlyIconButton
                    style={{}}
                    iconStyle={{
                      borderWidth: 0,
                      backgroundColor:
                        selectedMode === 'motorcycle' ? colors.success100 : colors.neutral100,
                    }}
                    icon={
                      <HelmetLargeIcon
                        color={
                          selectedMode === 'motorcycle' ? colors.success500 : colors.neutral900
                        }
                      />
                    }
                    size={70}
                    variant="circle"
                    onPress={() => setSelectedMode('motorcycle')}
                  />
                  <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                    Moto
                  </DefaultText>
                </View>
                <View style={{ alignItems: 'center', marginLeft: paddings.xl }}>
                  <OnlyIconButton
                    iconStyle={{
                      borderWidth: 0,
                      backgroundColor:
                        selectedMode === 'bicycling' ? colors.success100 : colors.neutral100,
                    }}
                    icon={
                      <Bike
                        size={33}
                        color={selectedMode === 'bicycling' ? colors.success500 : colors.neutral900}
                      />
                    }
                    size={70}
                    variant="circle"
                    onPress={() => setSelectedMode('bicycling')}
                  />
                  <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                    Bike
                  </DefaultText>
                </View>
                <View style={{ alignItems: 'center', marginLeft: paddings.xl }}>
                  <OnlyIconButton
                    iconStyle={{
                      borderWidth: 0,
                      backgroundColor:
                        selectedMode === 'car' ? colors.success100 : colors.neutral100,
                    }}
                    icon={
                      <CarFront
                        size={33}
                        color={selectedMode === 'car' ? colors.success500 : colors.neutral900}
                      />
                    }
                    size={70}
                    variant="circle"
                    onPress={() => setSelectedMode('car')}
                  />
                  <DefaultText style={{ marginTop: paddings.xs }} size="md" color="black">
                    Carro
                  </DefaultText>
                </View>
              </View>
              <DefaultButton
                style={{ marginVertical: paddings.md }}
                title="Confirmar"
                onPress={() => {
                  if (selectedMode) onConfirm(selectedMode);
                }}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
