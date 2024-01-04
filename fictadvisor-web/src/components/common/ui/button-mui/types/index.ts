export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum ButtonSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum ButtonVariant {
  FILLED = 'filled',
  OUTLINE = 'outline',
  TEXT = 'text',
}

export enum ButtonState {
  DEFAULT = 'default',
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
}

export interface ButtonColorsStruct {
  backgroundColor: string[];
  borderColor: string[];
  textColorDisabled: string;
}

export type ButtonColorsMap = Record<
  Exclude<ButtonVariant, ButtonVariant.TEXT>,
  Record<ButtonColor, ButtonColorsStruct>
>;
