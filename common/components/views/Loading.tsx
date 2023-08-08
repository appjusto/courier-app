import colors, { ColorName } from '@/common/styles/colors';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { DefaultView } from '../containers/DefaultView';

interface Props {
  backgroundColor?: ColorName;
  title?: string;
}

export function Loading({ backgroundColor, title }: Props) {
  return (
    <DefaultView
      style={{
        ...screens.profile,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[backgroundColor ?? 'white'],
      }}
    >
      {title ? <Stack.Screen options={{ title }} /> : null}
      <ActivityIndicator size="large" color={colors.primary} />
    </DefaultView>
  );
}
