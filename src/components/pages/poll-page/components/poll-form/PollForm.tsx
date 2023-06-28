import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

import theme from '@/styles/theme';

import { Category, FetchedTeacherPollData, Question } from '../../PollPage';
import AnswersSheet from '../answers-sheet/AnswersSheet';
import QuestionsList from '../questions-list/QuestionsList';

import styles from './PollForm.module.scss';

interface PollFormProps {
  data: FetchedTeacherPollData;
}

export interface Answer {
  questionId: string;
  value: string;
}

export enum SendingStatus {
  ANY = 'any',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
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

const getAllQuestionsArray = (categories: Category[]) => {
  let AllQuestions = [];
  for (const category of categories) {
    AllQuestions = AllQuestions.concat(category.questions);
  }
  return AllQuestions;
};

const PollForm: React.FC<PollFormProps> = ({ data }) => {
  const [isValid, setIsValid] = useState(false);
  const { categories, teacher, subject } = data;
  const [currentQuestions, setCurrentQuestions] = React.useState(categories[0]);
  const [progress, setProgress] = React.useState<number[]>(
    Array(categories.length).fill(0),
  );
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const [isQuestionsListOpened, setQuestionsListOpened] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentCategory, setCurrentCategory] = React.useState(0);
  const [questionsArray, setQuestionsArray] = useState<Question[]>([]);
  const [sendingStatus, setIsSendingStatus] = useState<SendingStatus>(
    SendingStatus.ANY,
  );
  useEffect(() => {
    setQuestionsArray(getAllQuestionsArray(categories));
  }, [categories]);

  useEffect(() => {
    setCurrentQuestions(categories[currentCategory]);
    setIsValid(validateResults(answers, questionsArray));
  }, [currentCategory, categories, answers, questionsArray]);

  return (
    <div
      className={
        sendingStatus === SendingStatus.SUCCESS
          ? styles.successWrapper
          : styles.wrapper
      }
    >
      <div
        style={{
          display: !isMobile || isQuestionsListOpened ? 'block' : 'none',
        }}
      >
        {sendingStatus !== SendingStatus.SUCCESS && (
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
      </div>
      <div
        style={{
          display: !isMobile || !isQuestionsListOpened ? 'block' : 'none',
        }}
      >
        <AnswersSheet
          questions={currentQuestions}
          setProgress={setProgress}
          setCurrent={setCurrentCategory}
          isTheLast={currentCategory === categories.length - 1}
          current={currentCategory}
          setQuestionsListStatus={setQuestionsListOpened}
          answers={answers}
          setAnswers={setAnswers}
          isValid={isValid}
          sendingStatus={sendingStatus}
          setIsSendingStatus={setIsSendingStatus}
        />
      </div>
    </div>
  );
};

export default PollForm;
