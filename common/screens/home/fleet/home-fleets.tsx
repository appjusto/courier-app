import { useContextFleets } from '@/common/auth/AuthContext';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { HomeFleet } from './home-fleet';

interface Props extends ViewProps {}

export const HomeFleets = ({ style, ...props }: Props) => {
  // state
  const fleets = useContextFleets();
  if (!fleets) return null;
  console.log(fleets.length);
  return (
    <View>
      {fleets.map((fleet, index) => (
        <HomeFleet
          key={fleet.id}
          style={{ marginTop: index > 0 ? paddings.lg : 0 }}
          fleet={fleet}
        />
      ))}
    </View>
  );
};
