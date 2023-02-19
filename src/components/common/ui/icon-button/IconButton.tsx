import React, { ReactNode } from 'react';

import styles from './IconButton.module.scss';

export type IconButtonProps = {
  size?: IconButtonSize;
  shape?: IconButtonShape;
  color?: IconButtonColor;
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

export enum IconButtonShape {
  CIRCLE = 'circle',
  SQUARE = 'square',
}

export const IconButton: React.FC<
  IconButtonProps & {
    icon: ReactNode;
  }
> = ({
  size = IconButtonSize.NORMAL,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.PRIMARY,
  icon,
  ...rest
}) => {
  return (
    <button
      className={styles[`${shape}-button-icon-${size}-${color}`]}
      {...rest}
    >
      {icon}
    </button>
  );
};
