import { Image } from 'expo-image';
import { View, ViewProps } from 'react-native';

const EmptyStateImage = require('../../../../assets/images/empty_state.png');

interface Props extends ViewProps {}

export const EmptyIcon = ({ style, ...props }: Props) => {
  return (
    <View style={[{}, style]} {...props}>
      <Image source={EmptyStateImage} style={{ width: 102, height: 106 }} />
    </View>
  );
};
