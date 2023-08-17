import useBanks from '@/api/platform/useBanks';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Bank, WithId } from '@appjusto/types';
import { FlashList } from '@shopify/flash-list';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

export default function ProfileSelectBank() {
  // context
  const router = useRouter();
  // state
  const banks = useBanks();
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
    <View style={{ ...screens.profile }}>
      <Stack.Screen options={{ title }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultInput
          value={name}
          title="Banco"
          placeholder="Nome do seu banco"
          onChangeText={setName}
        />
      </View>

      <FlashList
        keyboardShouldPersistTaps="handled"
        data={filteredBanks}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                // @ts-ignore
                router.push({ pathname: `/profile/bank`, params: { bankId: item.id } });
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: 60,
                  padding: paddings.lg,
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
