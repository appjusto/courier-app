import paddings from '@/common/styles/paddings';
import { LatLng } from '@appjusto/types';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { Pressable, View, ViewProps } from 'react-native';
import { getGoogleMapsNavigationLink, getWazeNavigationLink } from './urls';

const WazeLogo = require('../../../../assets/images/waze-logo.png');
const GoogleMapsLogo = require('../../../../assets/images/maps-logo.png');

interface Props extends ViewProps {
  to?: LatLng;
}

export const NavigationIcons = ({ to, style, ...props }: Props) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          right: 0,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', padding: paddings.lg }}>
        <Pressable onPress={() => Linking.openURL(getWazeNavigationLink(to))}>
          <Image source={WazeLogo} style={{ width: 58, height: 58, marginRight: paddings.sm }} />
        </Pressable>
        <Pressable onPress={() => Linking.openURL(getGoogleMapsNavigationLink(to))}>
          <Image source={GoogleMapsLogo} style={{ width: 58, height: 58 }} />
        </Pressable>
      </View>
    </View>
  );
};
