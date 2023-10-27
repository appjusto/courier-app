import { EmptyIcon } from '@/common/components/modals/error/icon';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { AccountWithdraw, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';
import { WithdrawItem } from './item';

interface Props extends ViewProps {
  title?: string;
  emptyText?: string;
  withdraws: WithId<AccountWithdraw>[];
}

export const WithdrawList = ({ withdraws, title, emptyText, style, ...props }: Props) => {
  return (
    <View style={[{ padding: paddings.lg }, style]} {...props}>
      {title ? (
        <DefaultText style={{ marginBottom: paddings.lg }} size="lg">
          {title}
        </DefaultText>
      ) : null}
      <View>
        {withdraws.length ? (
          withdraws.map((withdraw) => (
            <Pressable
              key={withdraw.id}
              onPress={() =>
                router.push({
                  pathname: '/(logged)/(tabs)/deliveries/withdraws/[id]/',
                  params: { id: withdraw.id },
                })
              }
            >
              <WithdrawItem withdraw={withdraw} />
            </Pressable>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <EmptyIcon />
            {emptyText ? (
              <DefaultText
                style={{ marginTop: paddings.lg, textAlign: 'center' }}
                color="neutral800"
              >
                {emptyText}
              </DefaultText>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};
