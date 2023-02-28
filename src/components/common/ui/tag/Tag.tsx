import React, { FC, ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Tag.module.scss';

export enum TagVariant {
  FILLED = 'filled-background-color',
  DARKER = 'darker-background-color',
  OUTLINE = 'outline-background-color',
}
export enum TagSize {
  SMALL = 'small-tag',
  MEDIUM = 'medium-tag',
}
export enum TagColor {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  GRAY = 'gray',
  VIOLET = 'violet',
  MINT = 'mint',
  ORANGE = 'orange',
}

interface TagProps {
  text?: string;
  variant?: TagVariant;
  color?: TagColor;
  size?: TagSize;
  icon?: ReactNode;
  className?: string;
}

const Tag: FC<TagProps> = ({
  text,
  variant = TagVariant.FILLED,
  color = TagColor.PRIMARY,
  size = TagSize.MEDIUM,
  icon,
  className,
}) => {
  const tagClassName = mergeClassNames(
    styles['tag'],
    styles[size],
    styles[color + '-' + variant],
    className,
  );
  return (
    <div className={tagClassName}>
      <div className={'icon-container'}>{icon}</div>
      {text && <p className={styles[size + '-body']}>{text}</p>}
    </div>
  );
};

export default Tag;
