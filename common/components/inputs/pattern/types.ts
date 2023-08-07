import { DefaultInputProps } from '../default/types';
import patterns from './patterns';

export type PatternInputProps = DefaultInputProps & {
  pattern?: keyof typeof patterns;
  patternObject?: {
    mask?: string;
    parser?: (value: string) => string;
    formatter?: (value: string | undefined) => string;
    blurFormatter?: (value: string | undefined) => string;
  };
};
