import { FC } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import mergeClassNames from 'merge-class-names';

import styles from './Breadcrumbs.module.scss';

interface Breadcrumb {
  label: string;
  href: string;
}
interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => {
  const breadcrumbs = items.map((item, index) => (
    <>
      <div key={index} className={styles['breadcrumb']}>
        <a href={item.href}>
          {index === 0 && (
            <HomeIcon
              className={mergeClassNames('icon', styles['home-icon'])}
            />
          )}
          <span> {item.label} </span>
        </a>
      </div>
      {index !== items.length - 1 && (
        <ChevronRightIcon
          className={mergeClassNames('icon', styles['arrow-icon'])}
        />
      )}
    </>
  ));

  return (
    <div className={mergeClassNames(styles['wrapper'], className)}>
      <div className={mergeClassNames(styles['breadcrumb'], styles['mobile'])}>
        <ChevronLeftIcon
          className={mergeClassNames('icon', styles['arrow-icon'])}
        />
        <a href={items[0]?.href}>
          <span> {items[0]?.label} </span>
        </a>
      </div>
      <div
        className={mergeClassNames(
          styles['breadcrumbs-container'],
          styles['desktop'],
        )}
      >
        {breadcrumbs}
      </div>
    </div>
  );
};

export default Breadcrumbs;
