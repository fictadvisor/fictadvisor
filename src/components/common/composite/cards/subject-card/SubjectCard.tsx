import React from 'react';
import mergeClassNames from 'merge-class-names';

import { DivProps } from '@/components/common/composite/cards/Cards';
import styles from '@/components/common/composite/cards/subject-card/SubjectCard.module.scss';

type SubjectCardProps = {
  name: string;
  details?: string;
  rating?: number;
  disabled?: boolean;
} & DivProps;

export const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  details,
  disabled,
  ...rest
}) => {
  return (
    <div
      className={mergeClassNames(
        disabled && styles['card-disabled'],
        styles['subject-card'],
        styles['subject-card-effect'],
      )}
      {...rest}
    >
      <div className={styles['subject-name']}>{name}</div>
      {details && <p>{details}</p>}
    </div>
  );
};
