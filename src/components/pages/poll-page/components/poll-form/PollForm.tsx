import React, { useEffect, useState } from 'react';

import useIsMobile from '@/hooks/use-is-mobile';

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
  const isMobile = useIsMobile(1024);
  const [isQuestionsListOpened, setQuestionsListOpened] = useState(false);

  const [currentCategory, setCurrentCategory] = React.useState(0);

  useEffect(() => {
    setCurrentQuestions(categories[currentCategory]);
  }, [currentCategory, categories]);

  return (
    <div className={styles.wrapper}>
      {(!isMobile || isQuestionsListOpened) && (
        <QuestionsList
          categories={categories}
          teacher={teacher}
          subject={subject}
          progress={progress}
          current={currentCategory}
          setCurrent={setCurrentCategory}
          setQuestionsListStatus={setQuestionsListOpened}
        />
      )}
      {(!isMobile || !isQuestionsListOpened) && (
        <AnswersSheet
          questions={currentQuestions}
          setProgress={setProgress}
          setCurrent={setCurrentCategory}
          isTheLast={currentCategory === categories.length - 1}
          current={currentCategory}
          setQuestionsListStatus={setQuestionsListOpened}
        />
      )}
    </div>
  );
};

export default PollForm;
