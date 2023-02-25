import { FC, ReactNode, useContext } from 'react';
import mergeClassNames from 'merge-class-names';

import { TabContext } from '../tab-list/TabList';

import styles from './TabItem.module.scss';

export enum TabItemContentPosition {
  CENTER = 'center',
  LEFT = 'left',
}

interface ITabItemProps {
  className: string;
  text: string;
  position: TabItemContentPosition;
  icon?: ReactNode;
  isDisabled?: boolean;
  count?: number;
  value?: string;
}

export const TabItem: FC<ITabItemProps> = ({
  className,
  text,
  position,
  icon,
  isDisabled,
  count,
  value,
}) => {
  const { onChange } = useContext(TabContext);
  const handleClick = () => {
    onChange(value);
  };
  return (
    <button
      onClick={handleClick}
      className={mergeClassNames(styles[className], styles[position])}
      disabled={isDisabled}
    >
      {icon && <div className={styles['icon']}>{icon}</div>}
      <text className={styles['text']}>{text}</text>
      {count && (
        <div className={styles['count']}>
          <text className={styles['count-text']}>{count}</text>
        </div>
      )}
    </button>
  );
};
