import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { getDomain } from '@/common/constants/urls';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import * as Clipboard from 'expo-clipboard';
import { Copy } from 'lucide-react-native';
import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';

export interface ShareFleetCardProps extends ViewProps {
  fleetId: string;
  fleetName: string;
}

export const ShareFleetCard = ({ fleetId, style, ...props }: ShareFleetCardProps) => {
  // context
  const showToast = useShowToast();
  // handler
  const copyToClipboard = () => {
    const fleetDeeplink = `https://${getDomain()}/fleets/${fleetId}`;
    Clipboard.setStringAsync(fleetDeeplink).then(() => {
      showToast('Link da frota copiado!', 'success');
    });
  };
  // UI
  return (
    <View style={[{}, style]} {...props}>
      <Pressable onPress={copyToClipboard}>
        {({ pressed }) => (
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: paddings.lg,
                ...borders.default,
                borderColor: colors.neutral100,
                backgroundColor: colors.white,
              },
            ]}
          >
            <View style={{ marginLeft: paddings.lg, width: '75%' }}>
              <DefaultText size="sm" color="black">
                Compartilhar frota
              </DefaultText>
              <DefaultText
                size="xs"
                color="neutral800"
                style={{
                  flexWrap: 'wrap',
                  width: '95%',
                  marginTop: 2,
                }}
              >
                Compartilhe o link para chamar outras pessoas para essa frota
              </DefaultText>
            </View>
            <Copy size={24} color={colors.black} />
          </View>
        )}
      </Pressable>
    </View>
  );
};
