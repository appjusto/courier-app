import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useSearchFleets } from '@/api/search/useSearchFleets';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/FleetCard';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function FleetsSearch() {
  // state
  const [fleetName, setFleetName] = useState('');
  const { fleets } = useSearchFleets(fleetName);
  // tracking
  useTrackScreenView('Frotas disponíveis');
  // UI
  const title = 'Frotas disponíveis';
  if (!fleets) return <Loading title={title} />;
  return (
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="lg">Escolha sua frota</DefaultText>
      <DefaultText style={{ marginTop: paddings.lg }} color="neutral700">
        Você pode escolhar a frota que deseja fazer parte. Frotas com mais participantes tem mais
        chances de corridas melhores.
      </DefaultText>
      <DefaultInput
        style={{ marginTop: paddings.lg }}
        title="Pesquisa pelo nome"
        placeholder="Frota"
        value={fleetName}
        keyboardType="default"
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={setFleetName}
      />
      <FlashList
        data={fleets}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => {}}>
              <FleetCard style={{ marginTop: paddings.lg }} fleet={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={460}
        ListFooterComponent={<View style={{ height: paddings.xl }} />}
      />
    </DefaultScrollView>
  );
}
