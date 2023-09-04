import { useFetchBanks } from '@/api/platform/banks/useFetchBanks';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Bank, WithId } from '@appjusto/types';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

interface Props {
  onSelectBank: (id: string) => void;
}

export default function ProfileSelectBank({ onSelectBank }: Props) {
  // state
  const banks = useFetchBanks();
  const [filteredBanks, setFilteredBanks] = useState<WithId<Bank>[]>([]);
  const [name, setName] = useState('');
  // side effects
  useEffect(() => {
    if (!banks) return;
    setFilteredBanks(
      banks.filter(
        (bank) =>
          bank.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
          bank.code.indexOf(name) !== -1
      )
    );
  }, [banks, name]);
  // UI
  const title = 'Escolha seu banco';
  if (!banks) return <Loading backgroundColor="neutral50" title={title} />;
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title }} />
      <View style={{ justifyContent: 'center', marginTop: paddings.lg }}>
        <DefaultText size="lg" style={{ textAlign: 'center' }}>
          Selecione o banco
        </DefaultText>
      </View>
      <View style={{ padding: paddings.lg }}>
        <DefaultInput value={name} placeholder="Nome do seu banco" onChangeText={setName} />
      </View>

      <FlashList
        keyboardShouldPersistTaps="handled"
        data={filteredBanks}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                onSelectBank(item.id);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: 60,
                  padding: paddings.lg,
                  justifyContent: 'center',
                }}
              >
                <DefaultText size="md">{`${item.code} - ${item.name}`}</DefaultText>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={60}
      />
    </View>
  );
}
