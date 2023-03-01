import React, { useEffect } from 'react';

import { FetchedTeacherPollData } from '../../PollPage';
import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import styles from './PollForm.module.scss';

interface PollFormProps {
  data: FetchedTeacherPollData;
}

const PollForm: React.FC<PollFormProps> = ({ data }) => {
  const { categories, teacher, subject } = data;
  const [currentQuestions, setCurrentQuestions] = React.useState(categories[0]);
  const [progress, setProgress] = React.useState<number[]>(
    Array(categories.length).fill(0),
  );
  const [currentCategory, setCurrentCategory] = React.useState(0);

  useEffect(() => {
    setCurrentQuestions(categories[currentCategory]);
  }, [currentCategory, categories]);

  return (
    <div className={styles.wrapper}>
      <QuestionsList
        categories={categories}
        teacher={teacher}
        subject={subject}
        progress={progress}
        current={currentCategory}
        setCurrent={setCurrentCategory}
      />
      <AnswersSheet
        questions={currentQuestions}
        setProgress={setProgress}
        setCurrent={setCurrentCategory}
      />
    </div>
  );
};

export default PollForm;
