import { useContextApi } from '@/api/ApiContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultBadge } from '@/common/components/badges/DefaultBadge';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { SingleListItem } from '@/common/components/lists/SingleListItem';
import { ConfirmModal } from '@/common/components/modals/confirm-modal';
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
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  User2,
  Wallet,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import ProfileHeader from './header';

export default function ProfileHome() {
  // context
  const router = useRouter();
  const api = useContextApi();
  const profile = useContextProfile();
  // state
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  // UI
  return (
    <View style={{ ...screens.headless, padding: paddings.lg }}>
      <ConfirmModal
        visible={logoutModalVisible}
        text="Tem certeza que deseja sair?"
        cancelButtonLabel="Não, quero continuar logado"
        onConfirm={() => {
          setLogoutModalVisible(false);
          api.auth().signOut();
        }}
        onCancel={() => setLogoutModalVisible(false)}
      />
      <ProfileHeader />
      <View style={{ flex: 1, marginTop: paddings.lg }}>
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
          leftView={<CircleDollarSign size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/bank')}
        />
        <DefaultListItem
          title="Selfie e documento"
          subtitles={['Sua selfie e a imagem do seu documento']}
          leftView={<BookMinus size={20} color={colors.black} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/images')}
        />

        {profile?.tags?.includes('safe') ? (
          <DefaultListItem
            title="Saque instantâneo"
            subtitles={['Configure seu PIX e receba imediatamente']}
            leftView={<Wallet size={20} color={colors.black} />}
            rightView={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <DefaultBadge
                  title="Novo"
                  color="success900"
                  backgroundColor="success100"
                  borderColor="success100"
                ></DefaultBadge>
                <ChevronRight
                  style={{ marginLeft: paddings.sm }}
                  size={16}
                  color={colors.neutral800}
                />
              </View>
            }
            onPress={() => router.push('/profile/pix')}
          />
        ) : null}

        <View style={{ flex: 1 }} />
        <SingleListItem
          title="Suporte"
          leftView={<HelpCircle color={colors.neutral700} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/help/')}
        />
        <SingleListItem
          title="Configurações"
          leftView={<Settings color={colors.neutral700} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/settings/')}
        />
        <SingleListItem
          title="Sobre o AppJusto"
          leftView={<FileText color={colors.neutral700} size={20} />}
          rightView={<ChevronRight size={16} color={colors.neutral800} />}
          onPress={() => router.push('/profile/about/')}
        />

        <Pressable onPress={() => setLogoutModalVisible(true)}>
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
