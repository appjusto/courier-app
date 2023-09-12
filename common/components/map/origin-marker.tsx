import colors from '@/common/styles/colors';
import { CircledView } from '../containers/CircledView';

export const OriginMarker = () => {
  return (
    <CircledView
      size={24}
      style={{
        borderWidth: 0,
        backgroundColor: colors.neutral400,
      }}
    >
      <CircledView
        size={18}
        style={{
          borderWidth: 0,
          backgroundColor: colors.neutral700,
        }}
      >
        <CircledView
          size={12}
          style={{
            borderWidth: 0,
            backgroundColor: colors.black,
          }}
        />
      </CircledView>
    </CircledView>
  );
};
