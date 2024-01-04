import { SxProps, Theme } from '@mui/material/styles';
export enum InputState {
  DISABLED = 'disabled',
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  READONLY = 'readonly',
}

export enum InputSize {
  LARGE = 'large',
  MEDIUM = 'medium',
}

export enum InputType {
  DEFAULT = 'text',
  PASSWORD = 'password',
  SEARCH = 'search',
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  size?: InputSize;
  onChange: (value: string) => void;
  value: string;
  type?: InputType;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  sx?: SxProps<Theme>;
  onDeterredChange?: () => void;
  touched?: boolean;
  disabled?: boolean;
  error?: string;
  readOnly?: boolean;
}
