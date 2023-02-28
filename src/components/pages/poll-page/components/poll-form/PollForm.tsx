import React from 'react';

import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import styles from './PollForm.module.scss';

const PollForm = () => {
  return (
    <div className={styles.wrapper}>
      <QuestionsList />
      <AnswersSheet />
    </div>
  );
};

export default PollForm;
