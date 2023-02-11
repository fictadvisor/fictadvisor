import { FC, ReactNode } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from './Tab.module.scss';

export enum TabContentPosition {
  CENTRE = 'centre',
  LEFT = 'left',
}

interface TabProps {
  className: string;
  text: string;
  position: TabContentPosition;
  icon?: ReactNode;
  isDisabled?: boolean;
  count?: number;
}

const Tab: FC<TabProps> = props => {
  const handleClick = () => {};
  return (
    <div>
      <button
        className={mergeClassNames(
          styles[props.className],
          styles[props.position],
        )}
        disabled={props.isDisabled}
        onClick={handleClick}
      >
        {props.icon && <div className="icon">{props.icon}</div>}
        <text className="text">{props.text}</text>
        {props.count && (
          <div className={styles['count']}>
            <text className={styles['count-text']}>{props.count}</text>
          </div>
        )}
      </button>
    </div>
  );
};

export default Tab;
