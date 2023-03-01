import React, { ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './IconButton.module.scss';

export type IconButtonProps = {
  size?: IconButtonSize;
  shape?: IconButtonShape;
  color?: IconButtonColor;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum IconButtonSize {
  MEDIUM = 'normal',
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
  size = IconButtonSize.MEDIUM,
  shape = IconButtonShape.CIRCLE,
  color = IconButtonColor.PRIMARY,
  icon,
  className,
  ...rest
}) => {
  return (
    <button
      className={mergeClassNames(
        styles[`${shape}-button-icon-${size}-${color}`],
        className,
      )}
      {...rest}
    >
      <div className={mergeClassNames('icon', styles[`${size}-icon`])}>
        {icon}
      </div>
    </button>
  );
};
