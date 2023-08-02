import { DefaultBadge } from '@/common/components/badges/DefaultBadge';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { FoodIcon } from '@/common/components/lists/icons/FoodIcon';
import { DefaultScrollView } from '@/common/components/views/DefaultScrollView';
import screens from '@/common/constants/screens';
import colors from '@/common/styles/colors';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Profile() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView
      style={{ ...screens.default, backgroundColor: colors.gray50 }}
    >
      <Stack.Screen options={{ title: 'Seus dados' }} />
      <DefaultListItem
        title="Dados pessoais"
        subtitles={['Seu nome, e-mail, CPF, celular e data de nascimento']}
        onPress={() => router.push('/profile/personal')}
      />
      <DefaultListItem
        title="Formas de pagamento"
        subtitles={['Gerenciar suas formas de pagamento']}
      />
      <DefaultListItem
        title="Nome do restaurante"
        subtitles={['Rua Teodoro Sampaio, 40', '10/07/2023']}
        leftView={<FoodIcon />}
        rightView={<ArrowRightIcon />}
        bottomView={
          <View style={{ flexDirection: 'row' }}>
            <DefaultBadge
              title="Cancelar"
              backgroundColor="white"
              color="red"
              borderColor="red"
            />
          </View>
        }
      />
    </DefaultScrollView>
  );
}
