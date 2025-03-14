import React, { FormEvent, useMemo } from 'react';
import { QuestionType } from '@fictadvisor/utils/enums';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';

import * as sxStyles from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/answers-sheet/AnswerSheet.style';
import { createValidationSchema } from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/answers-sheet/validation';
import { SendingStatus } from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/poll-form/types';
import SingleQuestion from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/single-question/SingleQuestion';
import Button from '@/components/common/ui/button-mui/Button';
import Progress from '@/components/common/ui/progress';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';
import { usePollStore } from '@/store/poll-page/usePollStore';
import { Answer, Question } from '@/types/poll';

import AnswersSaved from './AnswersSaved';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  isTheLast: boolean;
  disciplineTeacherId: string;
}

const getProgress = (answers: Answer[], questions: Question[]) => {
  let count = 0;
  const resultAnswers = [...answers];
  for (const question of questions) {
    const isCompleted = resultAnswers.find(
      answer => answer.questionId === question.id,
    );
    if (isCompleted) count++;
  }
  return count;
};

const setCollectAnswers = (answers: Answer[], values: FormikValues) => {
  const resultAnswersMap = new Map(
    answers.map(answer => [answer.questionId, answer]),
  );

  for (const [valueId, value] of Object.entries(values)) {
    const existingAnswer = resultAnswersMap.get(valueId);
    if (existingAnswer) {
      existingAnswer.value = value;
    } else {
      resultAnswersMap.set(valueId, { value, questionId: valueId });
    }
  }

  return Array.from(resultAnswersMap.values());
};

const AnswersSheet: React.FC<AnswersSheetProps> = ({
  setProgress,
  isTheLast,
  disciplineTeacherId,
}) => {
  const {
    setCurrentCategory,
    currentCategory,
    answers,
    setAnswers,
    isValid,
    sendingStatus,
    setIsSendingStatus,
    currentQuestions,
    setQuestionsListOpened,
  } = usePollStore(state => ({
    setCurrentCategory: state.setCurrentCategory,
    currentCategory: state.currentCategory,
    answers: state.answers,
    setAnswers: state.setAnswers,
    isValid: state.isValid,
    sendingStatus: state.sendingStatus,
    setIsSendingStatus: state.setIsSendingStatus,
    currentQuestions: state.currentQuestions,
    setQuestionsListOpened: state.setQuestionsListOpened,
  }));
  const toast = useToast();

  const initialValues: Record<string, string> = useMemo(() => {
    return currentQuestions?.questions
      .filter(question => question.type === QuestionType.SCALE)
      .reduce(
        (initialVals, question) => {
          initialVals[question.id] = '1';
          return initialVals;
        },
        {} as Record<string, string>,
      );
  }, [currentQuestions]);

  const handleFormEvent = (
    event: FormEvent<HTMLFormElement>,
    values: Record<string, string>,
  ) => {
    const name = (event.target as HTMLFormElement).name;
    const value = (event.target as HTMLFormElement).value;
    if (name && value) {
      updateAnswer({ ...values, [name]: value });
    }
  };

  const updateAnswer = (values: FormikValues) => {
    const resultAnswers = setCollectAnswers(answers, values);
    setAnswers(resultAnswers);
    const count = getProgress(resultAnswers, currentQuestions?.questions);
    setProgress(previousProgress => {
      const temp = [...previousProgress];
      temp[currentCategory] = count;
      return temp;
    });
    return resultAnswers;
  };

  const handleSubmit = (value: Record<string, string>) => {
    const answers = updateAnswer({ ...initialValues, ...value });
    if (!isTheLast) {
      setCurrentCategory(currentCategory + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSendingStatus(SendingStatus.LOADING);
    sendData(answers);
  };

  const sendData = async (answers: Answer[]) => {
    try {
      const formattedAnswers = answers
        .map(answer => ({
          ...answer,
          value: answer.value.toString().trim(),
        }))
        .filter(answer => answer.value);

      await PollAPI.createTeacherGrade(disciplineTeacherId, {
        answers: formattedAnswers,
      });
      setIsSendingStatus(SendingStatus.SUCCESS);
      setAnswers([]);
    } catch (error) {
      const message = getErrorMessage(error);
      const errorMessage =
        message === 'Value is wrong'
          ? 'Текст повинен містити не менше 20 символів'
          : message || 'Щось пішло не так, спробуй пізніше!';
      toast.error('Помилка!', errorMessage);
      setIsSendingStatus(SendingStatus.ERROR);
    }
  };

  return (
    <Box
      sx={
        sendingStatus === SendingStatus.SUCCESS
          ? sxStyles.successWrapper
          : sxStyles.wrapper
      }
    >
      {sendingStatus === SendingStatus.LOADING && (
        <Box sx={sxStyles.loaderWrapper}>
          <Progress />
        </Box>
      )}
      {sendingStatus === SendingStatus.SUCCESS && (
        <Box sx={sxStyles.answersSavedWrapper}>
          <AnswersSaved />
        </Box>
      )}
      {sendingStatus != SendingStatus.LOADING &&
        sendingStatus != SendingStatus.SUCCESS && (
          <>
            <Box
              sx={sxStyles.toQuestionsList}
              onClick={() => {
                setQuestionsListOpened(true);
              }}
            >
              <Box sx={sxStyles.chevronIcon}>
                <ChevronLeftIcon height="20px" />
              </Box>
              <Typography sx={sxStyles.questionName}>
                {currentCategory + 1} . {currentQuestions?.name}
              </Typography>
            </Box>
            <Box sx={sxStyles.answersWrapper}>
              <Formik
                validationSchema={createValidationSchema(currentQuestions)}
                validateOnMount
                validateOnChange
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form
                    onClick={(event: FormEvent<HTMLFormElement>) =>
                      handleFormEvent(event, values)
                    }
                    onChange={(event: FormEvent<HTMLFormElement>) =>
                      handleFormEvent(event, values)
                    }
                    className={styles['form']}
                  >
                    {currentQuestions?.questions.map((question, key) => (
                      <SingleQuestion
                        key={question.id}
                        question={question}
                        id={key}
                        count={currentQuestions.count}
                      />
                    ))}
                    <Button
                      sx={sxStyles.button}
                      text={
                        isTheLast ? 'Завершити опитування' : 'Наступні питання'
                      }
                      type="submit"
                      disabled={isTheLast && !isValid}
                    />
                  </Form>
                )}
              </Formik>
            </Box>
          </>
        )}
    </Box>
  );
};
export default AnswersSheet;
