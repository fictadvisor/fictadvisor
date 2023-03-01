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
  question?: string;
  numberOfAnswered: number;
  numberOfQuestions: number;
  disabled?: boolean;
  isComment?: boolean;
} & DivProps;

export const PollCard: React.FC<PollCard> = ({
  questionNumber,
  question,
  numberOfAnswered,
  numberOfQuestions,
  disabled,
  isComment,
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
      className={mergeClassNames(
        styles['card'],
        styles['poll-card-container'],
        disabled && styles['poll-card-container-disabled'],
      )}
      {...rest}
    >
      <div>
        <b>
          {isComment ? (
            'Ваш коментар'
          ) : (
            <>
              {questionNumber}. {question}
            </>
          )}
        </b>
        <p>
          {isComment
            ? 'Відкрите запитання'
            : `${numberOfAnswered}/${numberOfQuestions} запитання`}
        </p>
      </div>
      <div className="icon">
        {showIcon && (isDoubleCheckIcon ? <DoubleCheckIcon /> : <CheckIcon />)}
      </div>
    </div>
  );
};
