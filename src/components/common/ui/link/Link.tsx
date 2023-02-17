import React from 'react';
import Link from 'next/dist/client/link';
import { LinkProps } from 'next/link';

import styles from './Link.module.scss';

type CustomLinkProps = {
  text: string;
} & LinkProps;
const CustomLink: React.FC<CustomLinkProps> = ({ text, ...rest }) => {
  return (
    <Link legacyBehavior {...rest}>
      <a className={styles['link']}>{text}</a>
    </Link>
  );
};

export default CustomLink;
