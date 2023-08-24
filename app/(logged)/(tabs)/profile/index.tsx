import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import ProfileHome from '@/common/screens/profile/home';
import screens from '@/common/styles/screens';

export default function ProfileScreen() {
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <ProfileHome />
    </DefaultScrollView>
  );

  //     {/* <DefaultListItem
  //       title="Nome do restaurante"
  //       subtitles={['Rua Teodoro Sampaio, 40', '10/07/2023']}
  //       leftView={<FoodIcon />}
  //       rightView={<ArrowRightIcon />}
  //       bottomView={
  //         <View style={{ flexDirection: 'row' }}>
  //           <DefaultBadge title="Cancelar" backgroundColor="white" color="red" borderColor="red" />
  //         </View>
  //       }
  //     /> */}
}
