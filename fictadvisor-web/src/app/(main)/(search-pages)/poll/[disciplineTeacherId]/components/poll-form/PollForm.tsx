import { FC, useEffect, useState } from 'react';
import {
  CategoryResponse,
  DisciplineTeacherQuestionsResponse,
  QuestionResponse,
} from '@fictadvisor/utils/responses';
import { Box, useMediaQuery } from '@mui/material';

import { SendingStatus } from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/poll-form/types';
import { usePollStore } from '@/store/poll-page/usePollStore';
import theme from '@/styles/theme';
import { Answer, Category } from '@/types/poll';

import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import * as styles from './PollForm.styles';

interface PollFormProps {
  data: DisciplineTeacherQuestionsResponse;
  disciplineTeacherId: string;
}

const validateResults = (answers: Answer[], questions: QuestionResponse[]) => {
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

const getAllQuestionsArray = (
  categories: CategoryResponse[],
): QuestionResponse[] => {
  const questions = categories.reduce<QuestionResponse[]>(
    (acc, { questions }) => [...acc, ...questions],
    [],
  );

  return questions;
};

const PollForm: FC<PollFormProps> = ({ data, disciplineTeacherId }) => {
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
  const [questionsArray, setQuestionsArray] = useState<QuestionResponse[]>([]);
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
    setCurrentQuestions(categories[currentCategory] as Category);
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
      <Box sx={styles.questionListWrapperBox(isMobile, isQuestionsListOpened)}>
        {sendingStatus !== SendingStatus.SUCCESS && (
          <QuestionsList data={data} progress={progress} />
        )}
      </Box>
      <Box sx={styles.answersSheetWrapperBox(isMobile, isQuestionsListOpened)}>
        <AnswersSheet
          setProgress={setProgress}
          isTheLast={currentCategory === categories.length - 1}
          disciplineTeacherId={disciplineTeacherId}
        />
      </Box>
    </Box>
  );
};

export default PollForm;
