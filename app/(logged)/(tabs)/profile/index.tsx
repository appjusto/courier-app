import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { DefaultScrollView } from '@/common/components/views/DefaultScrollView';
import screens from '@/common/constants/screens';
import { Stack, useRouter } from 'expo-router';

export default function Profile() {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultScrollView style={{ ...screens.profile }}>
      <Stack.Screen options={{ title: 'Seus dados' }} />
      <DefaultListItem
        title="Dados pessoais"
        subtitles={['Seu nome, e-mail, CPF, celular e data de nascimento']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/personal')}
      />
      <DefaultListItem
        title="Selfie e documento"
        subtitles={['Sua selfie e a imagem do seu documento']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/images')}
      />
      <DefaultListItem
        title="Dados da sua PJ"
        subtitles={['CNPJ, razão social e endereço da sua PJ']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/company')}
      />
      <DefaultListItem
        title="Dados bancários"
        subtitles={['Banco, agência e conta corrente da sua PJ']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/bank')}
      />
      {/* <DefaultListItem
        title="Nome do restaurante"
        subtitles={['Rua Teodoro Sampaio, 40', '10/07/2023']}
        leftView={<FoodIcon />}
        rightView={<ArrowRightIcon />}
        bottomView={
          <View style={{ flexDirection: 'row' }}>
            <DefaultBadge title="Cancelar" backgroundColor="white" color="red" borderColor="red" />
          </View>
        }
      /> */}
    </DefaultScrollView>
  );
}
