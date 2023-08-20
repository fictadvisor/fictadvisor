import React from 'react';
import cn from 'classnames';

import { DivProps } from '@/components/common/ui/cards/types';
import Tooltip from '@/components/common/ui/tooltip';

import styles from './TeacherHeaderCard.module.scss';
type TeacherHeaderCardProps = {
  name: string;
  description: string;
  url?: string;
} & DivProps;

const TeacherHeaderCard: React.FC<TeacherHeaderCardProps> = ({
  name,
  description,
  url = '/images/lecturer-avatar.png',
  ...rest
}) => {
  return (
    <div
      className={cn(styles['card'], styles['header-lecturer-card-container'])}
      {...rest}
    >
      <img src={url} alt="картинка викладача" />
      <div className={styles['header-lecturer-card-info']}>
        <h4 className={styles['card-name']}>{name}</h4>
        <Tooltip title={description} arrow={true} placement={'right'}>
          <div className={styles['lecturer-description']}>{description}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default TeacherHeaderCard;
