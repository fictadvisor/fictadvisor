import { FC, Fragment } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import cn from 'classnames';
import NextLink from 'next/link';

import styles from './Breadcrumbs.module.scss';

export interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => {
  const breadcrumbs = items.map((item, index) => (
    <Fragment key={index}>
      <div className={styles['breadcrumb']}>
        <NextLink href={item.href}>
          {index === 0 && (
            <HomeIcon className={cn('icon', styles['home-icon'])} />
          )}
          <span> {item.label} </span>
        </NextLink>
      </div>
      {index !== items.length - 1 && (
        <ChevronRightIcon className={cn('icon', styles['arrow-icon'])} />
      )}
    </Fragment>
  ));

  return (
    <div className={cn(styles['wrapper'], className)}>
      <div className={cn(styles['breadcrumb'], styles['mobile'])}>
        <ChevronLeftIcon className={cn('icon', styles['arrow-icon'])} />
        <NextLink href={items[0]?.href}>
          <span> {items[0]?.label} </span>
        </NextLink>
      </div>
      <div className={cn(styles['breadcrumbs-container'], styles['desktop'])}>
        {breadcrumbs}
      </div>
    </div>
  );
};

export default Breadcrumbs;
