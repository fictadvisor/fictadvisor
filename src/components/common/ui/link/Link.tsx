import React from 'react';
import cn from 'classnames';
import Link from 'next/dist/client/link';
import { LinkProps } from 'next/link';

import styles from './Link.module.scss';

type CustomLinkProps = {
  text: string;
  className?: string;
} & LinkProps;
const CustomLink: React.FC<CustomLinkProps> = ({
  text,
  className,
  ...rest
}) => {
  return (
    <Link {...rest} className={cn(styles['link'], className)}>
      {text}
    </Link>
  );
};

export default CustomLink;
