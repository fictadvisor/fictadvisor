import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/dist/client/link';
import { LinkProps } from 'next/link';

import styles from './Link.module.scss';

export enum LinkColor {
  WHITE = 'white-link',
  BLUE = 'blue-link',
}

type CustomLinkProps = {
  text: string;
  color?: LinkColor.WHITE | LinkColor.BLUE;
  arrow?: boolean;
} & LinkProps;

const CustomLink: React.FC<CustomLinkProps> = ({
  arrow,
  text,
  color = LinkColor.WHITE,
  ...rest
}) => {
  if (arrow)
    return (
      <span className={styles[color]}>
        <Link {...rest}>
          <ArrowLeftIcon className="icon" />
          <span>{text}</span>
        </Link>
      </span>
    );

  return (
    <span className={styles[color]}>
      <Link {...rest}>
        <span>{text}</span>
      </Link>
    </span>
  );
};

export default CustomLink;
