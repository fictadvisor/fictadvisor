import React, { useRef, useState } from 'react';
import mergeClassNames from 'merge-class-names';

import styles from '@/components/common/composite/cards/Cards.module.scss';

import {
  CheckIcon,
  DoubleCheckIcon,
} from '../../custom-svg/card-icons/CheckIcon';

import { DivProps } from './Cards';

type PollCard = {
  questionNumber: number;
  question: string;
  numberOfAnswered: number;
  numberOfQuestions: number;
} & DivProps;

export const PollCard: React.FC<PollCard> = ({
  questionNumber,
  question,
  numberOfAnswered,
  numberOfQuestions,
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
      className={mergeClassNames(styles['card'], styles['poll-card-container'])}
      {...rest}
    >
      <div>
        <b>{questionNumber}. Рейтингова система</b>
        <p>{`${numberOfAnswered}/${numberOfQuestions} запитання`}</p>
      </div>
      <div className="icon">
        {showIcon && (isDoubleCheckIcon ? <DoubleCheckIcon /> : <CheckIcon />)}
      </div>
    </div>
  );
};
