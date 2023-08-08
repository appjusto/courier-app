import colors, { ColorName } from '@/common/styles/colors';
import screens from '@/common/styles/screens';
import { ActivityIndicator } from 'react-native';
import { DefaultView } from '../containers/DefaultView';

interface Props {
  backgroundColor?: ColorName;
}

export function Loading({ backgroundColor }: Props) {
  return (
    <DefaultView
      style={{
        ...screens.profile,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[backgroundColor ?? 'white'],
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </DefaultView>
  );
}
