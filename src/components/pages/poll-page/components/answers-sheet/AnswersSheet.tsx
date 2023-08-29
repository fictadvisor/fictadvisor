import React, { FormEvent, useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useMediaQuery } from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button/Button';
import { TextArea } from '@/components/common/ui/form';
import RadioGroup from '@/components/common/ui/form/radio/RadioGroup';
import { SliderSize } from '@/components/common/ui/form/slider/types';
import FormikSlider from '@/components/common/ui/form/with-formik/slider';
import Progress from '@/components/common/ui/progress';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';
import theme from '@/styles/theme';
import { Answer, Category, Question, QuestionType } from '@/types/poll';

import { SendingStatus } from '../poll-form/PollForm';

import * as sxStyles from './AnswerSheet.style';
import AnswersSaved from './AnswersSaved';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  category: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsListStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isTheLast: boolean;
  isValid: boolean;
  current: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  sendingStatus: SendingStatus;
  setIsSendingStatus: React.Dispatch<React.SetStateAction<SendingStatus>>;
}

const collectAnswers = (answers: Answer[], values: FormikValues) => {
  let resultAnswers = [...answers];
  for (const valueId of Object.keys(values)) {
    const index = resultAnswers.findIndex(el => el.questionId === valueId);
    if (index !== -1) {
      resultAnswers[index].value = values[valueId];
    } else {
      resultAnswers = [
        ...resultAnswers,
        { value: values[valueId], questionId: valueId },
      ];
    }
  }
  return resultAnswers;
};

export const getProgress = (answers: Answer[], questions: Question[]) => {
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

const AnswersSheet: React.FC<AnswersSheetProps> = ({
  category,
  isTheLast,
  current,
  answers,
  setQuestionsListStatus,
  setAnswers,
  setProgress,
  isValid,
  setCurrent,
  sendingStatus,
  setIsSendingStatus,
}) => {
  const toast = useToast();
  // TODO: refactor this shit
  const [initialValues, setInitialValues] = useState<Record<string, string>>(
    {},
  );
  const router = useRouter();
  const disciplineTeacherId = router.query.disciplineTeacherId as string;

  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const numberRowsTextArea = isMobile ? 8 : 4;

  useEffect(() => {
    for (const question of category.questions) {
      if (question.type === QuestionType.SCALE) {
        setInitialValues(prev => ({ ...prev, [question.id]: '1' }));
      }
    }
  }, [category]);

  const answer = (values: FormikValues) => {
    const resultAnswers = collectAnswers(answers, values);
    setAnswers(resultAnswers);
    const count = getProgress(resultAnswers, category.questions);
    setProgress(previousProgress => {
      const temp = [...previousProgress];
      temp[current] = count;
      return temp;
    });
  };

  const handleSubmit = () => {};

  return (
    <div
      className={
        sendingStatus === SendingStatus.SUCCESS
          ? styles.successWrapper
          : styles.wrapper
      }
    >
      {sendingStatus === SendingStatus.LOADING ? (
        <div className={styles.loaderWrapper}>
          <Progress />
        </div>
      ) : sendingStatus === SendingStatus.SUCCESS ? (
        <div className={styles.wrapper}>
          <AnswersSaved />
        </div>
      ) : (
        <>
          <div
            className={styles.toQuestionsList}
            onClick={() => {
              setQuestionsListStatus(true);
            }}
          >
            <ChevronLeftIcon style={{ height: '20px' }} />
            <b>
              {current + 1} . {category.name}
            </b>
          </div>
          <div className={styles.answersWrapper}>
            <Formik
              validateOnMount
              validateOnChange
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form
                  onClick={(event: FormEvent<HTMLFormElement>) => {
                    // TODO: refactor this shit
                    const name = (event.target as HTMLFormElement).name;
                    const value = (event.target as HTMLFormElement).value;
                    if (name && value) {
                      values[name] = String(value);
                      answer(values);
                    }
                  }}
                  onChange={(event: FormEvent<HTMLFormElement>) => {
                    // TODO: refactor this shit
                    const name = (event.target as HTMLFormElement).name;
                    const value = (event.target as HTMLFormElement).value;
                    if (name && value) {
                      values[name] = String(value);
                      answer(values);
                    }
                  }}
                  className={styles['form']}
                >
                  {category.questions.map((question, id) => (
                    <div key={question.id} className={styles['question']}>
                      {question.type === 'TEXT' ? (
                        <p className={styles['question-number']}>
                          Відкрите питання
                        </p>
                      ) : (
                        <p className={styles['question-number']}>
                          Питання {id + 1} / {category.count}
                        </p>
                      )}

                      <p className={styles['question-title']}>
                        {question.text}
                      </p>
                      {question.description && (
                        <p className={styles['question-description']}>
                          {question.description}
                        </p>
                      )}
                      {question.type === 'SCALE' ? (
                        <FormikSlider
                          name={question.id}
                          size={isMobile ? SliderSize.SMALL : SliderSize.MEDIUM}
                        />
                      ) : question.type === 'TOGGLE' ? (
                        <RadioGroup
                          options={[
                            { value: '1', label: 'так' },
                            { value: '0', label: 'ні' },
                          ]}
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '36px',
                          }} //TODO remove inline styles when refactor
                          name={question.id}
                        />
                      ) : (
                        <TextArea
                          rowsNumber={numberRowsTextArea}
                          sx={sxStyles.textArea}
                          name={question.id}
                        />
                      )}

                      {question.criteria && (
                        <p className={styles['question-criteria']}>
                          {question.criteria}
                        </p>
                      )}
                    </div>
                  ))}
                  <Button
                    className={styles['button']}
                    text={
                      isTheLast ? 'Завершити опитування' : 'Наступні питання'
                    }
                    type="submit"
                    disabled={isTheLast && !isValid}
                    onClick={async () => {
                      answer(values);
                      if (!isTheLast) {
                        setCurrent(prev => ++prev);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        setIsSendingStatus(SendingStatus.LOADING);
                        try {
                          for (let i = 0; i < answers.length; i++) {
                            answers[i].value = answers[i].value.trim();

                            if (answers[i].value.length === 0) {
                              answers = answers.filter(
                                item => item !== answers[i],
                              );
                            }
                          }
                          await PollAPI.createTeacherGrade(
                            { answers },
                            disciplineTeacherId,
                          );
                          setIsSendingStatus(SendingStatus.SUCCESS);
                        } catch (error) {
                          const message = getErrorMessage(error);
                          message
                            ? toast.error('Помилка!', message)
                            : toast.error(
                                'Щось пішло не так, спробуй пізніше!',
                              );
                          setIsSendingStatus(SendingStatus.ERROR);
                        }
                      }
                    }}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default AnswersSheet;
