import React from 'react';

import { FetchedTeacherPollData } from '../../PollPage';
import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import styles from './PollForm.module.scss';

interface PollFormProps {
  data: FetchedTeacherPollData;
}

const PollForm: React.FC<PollFormProps> = ({ data }) => {
  const { categories, teacher, subject } = data;

  return (
    <div className={styles.wrapper}>
      <QuestionsList
        categories={categories}
        teacher={teacher}
        subject={subject}
      />
      <AnswersSheet />
    </div>
  );
};

export default PollForm;
