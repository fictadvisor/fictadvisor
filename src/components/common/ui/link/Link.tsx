import React from 'react';
import mergeClassNames from 'merge-class-names';
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
    <Link {...rest} className={mergeClassNames(styles['link'], className)}>
      {text}
    </Link>
  );
};

export default CustomLink;
