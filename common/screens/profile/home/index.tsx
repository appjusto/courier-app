import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { BookMinus, Building2, ChevronRight, CircleDollarSign, User2 } from 'lucide-react-native';
import { View } from 'react-native';
import ProfileHeader from './header';

export default function ProfileHome() {
  // context
  const router = useRouter();
  // UI
  return (
    <View style={{ ...screens.headless, padding: paddings.lg }}>
      <ProfileHeader />
      <View style={{ marginTop: paddings.xl }}>
        <DefaultListItem
          title="Dados pessoais"
          subtitles={['Seu nome, e-mail, CPF, celular e data de nascimento']}
          leftView={<User2 size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/personal')}
        />
        <DefaultListItem
          title="Dados da sua PJ"
          subtitles={['CNPJ, razão social e endereço da sua PJ']}
          leftView={<Building2 size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/company')}
        />
        <DefaultListItem
          title="Dados bancários"
          subtitles={['Banco, agência e conta corrente da sua PJ']}
          leftView={<BookMinus size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/bank')}
        />
        <DefaultListItem
          title="Selfie e documento"
          subtitles={['Sua selfie e a imagem do seu documento']}
          leftView={<CircleDollarSign size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/images')}
        />
      </View>
    </View>
  );
}
