import { ErrorIcon } from '@/common/components/modals/error/icon';
import { DefaultText } from '@/common/components/texts/DefaultText';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { LedgerEntry, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';
import { LedgerEntryItem } from './ledger-entry-item';

interface Props extends ViewProps {
  title?: string;
  entries: WithId<LedgerEntry>[];
  emptyText?: string;
}

export const LedgerEntriesList = ({
  entries,
  title,
  emptyText,
  style,
  children,
  ...props
}: Props) => {
  // UI
  return (
    <View
      style={[{ padding: paddings.lg, ...borders.default, borderColor: colors.neutral100 }, style]}
      {...props}
    >
      {title ? (
        <DefaultText style={{ marginBottom: paddings.lg }} size="lg">
          {title}
        </DefaultText>
      ) : null}
      <View>
        {entries.length ? (
          entries.map((entry) => (
            <Pressable
              key={entry.id}
              onPress={() =>
                router.push({ pathname: '/(logged)/ledger/[id]', params: { id: entry.id } })
              }
            >
              <LedgerEntryItem entry={entry} />
            </Pressable>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ErrorIcon />
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

        {children}
      </View>
    </View>
  );
};
