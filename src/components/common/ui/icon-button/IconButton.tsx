import React from 'react';

export type IconButtonProps = {
  size: IconButtonSize;
  shape: IconType;
  color: IconButtonColor;
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

export const IconButton: React.FC<
  IconButtonProps & {
    icon: React.FC<IconButtonProps>;
  }
> = ({
  size = IconButtonSize.NORMAL,
  shape = IconType.CIRCLE,
  color = IconButtonColor.PRIMARY,
  icon: Icon,
  ...rest
}) => {
  return <Icon size={size} shape={shape} color={color} {...rest} />;
};
