import React, { ReactNode } from 'react';

export type IconButtonProps = {
  size: IconButtonSize;
  shape: IconType;
  color: IconButtonColor;
  icon?: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum SortButtonOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export enum IconButtonSize {
  NORMAL = 'normal',
  LARGE = 'large',
}

export enum IconButtonColor {
  PRIMARY = 'primary',
  ERROR = 'error',
  SUCCESS = 'success',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

export enum IconType {
  CIRCLE = 'circle',
  SQUARE = 'square',
}
