import { FC, ReactNode, useContext } from 'react';
import mergeClassNames from 'merge-class-names';

import { TabContext } from '../tab-list/TabList';

import styles from './TabItem.module.scss';

export enum TabItemContentPosition {
  CENTER = 'center',
  LEFT = 'left',
}

export enum TabItemContentSize {
  NORMAL = 'tab-normal',
  SMAll = 'tab-small',
}

interface ITabItemProps {
  className?: string;
  text: string;
  position: TabItemContentPosition;
  icon?: ReactNode;
  isDisabled?: boolean;
  count?: string;
  value?: string;
  size: TabItemContentSize;
}

export const TabItem: FC<ITabItemProps> = ({
  className,
  text,
  position,
  icon,
  isDisabled,
  count,
  value,
  size,
}) => {
  const { onChange, currentValue } = useContext(TabContext);
  const handleClick = () => {
    onChange(value);
  };

  const isActive = currentValue === value;

  return (
    <button
      onClick={handleClick}
      className={mergeClassNames(
        styles[className],
        styles[position],
        styles[size],
        styles[isActive ? 'tab-active' : ''],
      )}
      disabled={isDisabled}
    >
      {icon && <div className={styles['icon']}>{icon}</div>}
      <span className={styles['text']}>{text}</span>
      {count && (
        <div className={styles['count']}>
          <span className={styles['count-text']}>{count}</span>
        </div>
      )}
    </button>
  );
};
