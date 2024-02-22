import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useSearchFleets } from '@/api/search/useSearchFleets';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/fleet-card';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { FlashList } from '@shopify/flash-list';
import { Stack, router } from 'expo-router';
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
    <View style={{ ...screens.default, padding: paddings.lg }}>
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
      <View style={{ height: paddings.xl }} />
      <FlashList
        data={fleets}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                // TODO
              }}
            >
              <FleetCard style={{ marginBottom: paddings.lg }} fleet={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={460}
        ListFooterComponent={<View style={{ height: paddings.lg }} />}
      />
      <View style={{ padding: paddings.lg }}>
        <LinkButton
          style={{ alignSelf: 'center' }}
          size="md"
          variant="ghost"
          onPress={() => router.push('/(logged)/fleets/create')}
        >
          Criar nova frota
        </LinkButton>
      </View>
    </View>
  );
}
