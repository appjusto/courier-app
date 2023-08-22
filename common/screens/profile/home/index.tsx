import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { SingleListItem } from '@/common/components/lists/SingleListItem';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import {
  BookMinus,
  Building2,
  ChevronRight,
  CircleDollarSign,
  HelpCircle,
  LogOut,
  Settings,
  User2,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import ProfileHeader from './header';

export default function ProfileHome() {
  // context
  const router = useRouter();
  // UI
  return (
    <View style={{ ...screens.headless, padding: paddings.lg }}>
      <ProfileHeader />
      <View style={{ flex: 1, marginTop: paddings.xl }}>
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
        <View style={{ flex: 1 }} />
        <SingleListItem
          title="Ajuda"
          leftView={<HelpCircle color={colors.neutral700} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
        />
        <SingleListItem
          title="Configurações"
          leftView={<Settings color={colors.neutral700} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
        />
        <Pressable>
          {({ pressed }) => (
            <View style={{ margin: paddings.lg, flexDirection: 'row' }}>
              <DefaultText color={pressed ? 'error500' : 'error900'}>Sair</DefaultText>
              <LogOut size={16} color={colors.error500} style={{ marginLeft: paddings.xs }} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
