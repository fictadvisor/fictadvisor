import React from 'react';
import cn from 'classnames';

import {
  CheckIcon,
  DoubleCheck,
} from '@/components/common/icons/card-icons/DoubleCheck';
import { DivProps } from '@/components/common/ui/cards/types';

import styles from './PollCard.module.scss';

type PollCard = {
  questionNumber: number;
  question?: string;
  numberOfAnswered: number;
  numberOfQuestions: number;
  disabled?: boolean;
  isComment?: boolean;
  isActive: boolean;
} & DivProps;

const PollCard: React.FC<PollCard> = ({
  questionNumber,
  question,
  numberOfAnswered,
  numberOfQuestions,
  disabled,
  isComment,
  isActive,
  ...rest
}) => {
  let isDoubleCheckIcon,
    showIcon = true;
  if (numberOfAnswered >= 1 && numberOfAnswered !== numberOfQuestions) {
    isDoubleCheckIcon = false;
  } else if (numberOfAnswered === numberOfQuestions) {
    isDoubleCheckIcon = true;
  } else if (numberOfAnswered === 0) showIcon = false;

  return (
    <div
      className={cn(
        styles['card'],
        styles['poll-card-container'],
        { [styles['poll-card-container-disabled']]: disabled },
        { [styles['poll-card-container-active']]: isActive },
      )}
      {...rest}
    >
      <div className={styles['main-content']}>
        <b>
          {questionNumber}. {question}
        </b>
        <p>
          {isComment
            ? 'Відкрите запитання'
            : `${numberOfAnswered}/${numberOfQuestions} запитання`}
        </p>
      </div>
      <div className="icon">
        {showIcon && (isDoubleCheckIcon ? <DoubleCheck /> : <CheckIcon />)}
      </div>
    </div>
  );
};

export default PollCard;
