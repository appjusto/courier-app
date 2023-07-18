import { DefaultInputProps } from '../default/types';
import patterns from './patterns';

export type PatternInputProps = DefaultInputProps & {
  pattern: keyof typeof patterns;
};
