import screens from '@/common/constants/screens';
import colors, { ColorName } from '@/common/styles/colors';
import { ActivityIndicator } from 'react-native';
import { DefaultView } from './DefaultView';

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
