import { DefaultBadge } from '@/common/components/badges/DefaultBadge';
import { DefaultListItem } from '@/common/components/lists/DefaultListItem';
import { ArrowRightIcon } from '@/common/components/lists/icons/ArrowRightIcon';
import { FoodIcon } from '@/common/components/lists/icons/FoodIcon';
import { DefaultView } from '@/common/components/views/DefaultView';
import screens from '@/common/constants/screens';
import colors from '@/common/styles/colors';
import { View } from 'react-native';

export default function Home() {
  return (
    <DefaultView style={{ ...screens.default, backgroundColor: colors.gray50 }}>
      <DefaultListItem
        title="Seus dados"
        subtitles={['Atualize seus dados pessoais']}
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
    </DefaultView>
  );
}
