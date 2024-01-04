import { FC, useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';

import { SendingStatus } from '@/components/pages/poll-page/components/poll-form/types';
import { GetTeacherQuestionsResponse } from '@/lib/api/poll/types/GetTeacherQuestionsResponse';
import { usePollStore } from '@/store/poll-page/usePollStore';
import theme from '@/styles/theme';
import { Answer, Category, Question } from '@/types/poll';

import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import * as styles from './PollForm.styles';

interface PollFormProps {
  data: GetTeacherQuestionsResponse;
}

const validateResults = (answers: Answer[], questions: Question[]) => {
  for (const question of questions) {
    if (
      question.isRequired &&
      !answers.find(answer => answer.questionId === question.id)
    ) {
      return false;
    }
  }
  return true;
};

const getAllQuestionsArray = (categories: Category[]): Question[] => {
  const questions = categories.reduce<Question[]>(
    (acc, { questions }) => [...acc, ...questions],
    [],
  );

  return questions;
};

const PollForm: FC<PollFormProps> = ({ data }) => {
  const {
    setIsValid,
    answers,
    currentCategory,
    sendingStatus,
    setIsSendingStatus,
    setCurrentQuestions,
    isQuestionsListOpened,
  } = usePollStore();
  const { categories } = data;
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const [questionsArray, setQuestionsArray] = useState<Question[]>([]);
  const [progress, setProgress] = useState<number[]>(
    Array(categories.length).fill(0),
  );

  useEffect(() => {
    setIsSendingStatus(SendingStatus.ANY);
  }, []);

  useEffect(() => {
    setQuestionsArray(getAllQuestionsArray(categories));
  }, [categories]);

  useEffect(() => {
    setCurrentQuestions(categories[currentCategory]);
    setIsValid(validateResults(answers, questionsArray));
  }, [currentCategory, categories, answers, questionsArray]);

  return (
    <Box
      sx={
        sendingStatus === SendingStatus.SUCCESS
          ? styles.successWrapper
          : styles.wrapper
      }
    >
      <Box sx={styles.wrapperBox(isMobile, isQuestionsListOpened)}>
        {sendingStatus !== SendingStatus.SUCCESS && (
          <QuestionsList data={data} progress={progress} />
        )}
      </Box>
      <Box>
        <AnswersSheet
          setProgress={setProgress}
          isTheLast={currentCategory === categories.length - 1}
        />
      </Box>
    </Box>
  );
};

export default PollForm;
