import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import screens from '@/common/styles/screens';
import { Stack, router } from 'expo-router';

export default function Profile() {
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
        title="Escolha sua frota"
        subtitles={['Na frota é onde as condições de participação são definidas']}
        rightView={<ArrowRightIcon />}
        onPress={() => null}
      /> */}
      <DefaultListItem
        title="Notificações"
        subtitles={['Escolha as notificações que você quer receber']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/notifications/')}
      />
      {/* <DefaultListItem
        title="Central de ajuda"
        subtitles={['Tire suas dúvidas ou nos envie uma mensagem']}
        rightView={<ArrowRightIcon />}
        onPress={() => null}
      /> */}
      <DefaultListItem
        title="Ajuda e tudo sobre o AppJusto"
        subtitles={['Tire todas as suas dúvidas sobre a plataforma']}
        rightView={<ArrowRightIcon />}
        onPress={() => router.push('/profile/about')}
      />
      {/* <DefaultListItem
        title="Termos de uso e política de privacidade"
        subtitles={['Leia os termos de uso']}
        rightView={<ArrowRightIcon />}
        onPress={() => null}
      /> */}
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
