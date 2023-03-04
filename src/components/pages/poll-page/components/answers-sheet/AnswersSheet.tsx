import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import { AlertColor, AlertVariant } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup/AlertPopup';
import ArrowButton from '@/components/common/ui/arrow-button/ArrowButton';
import Button from '@/components/common/ui/button/Button';
import { RadioGroup, Slider, TextArea } from '@/components/common/ui/form';
import Loader from '@/components/common/ui/loader/Loader';
import { PollAPI } from '@/lib/api/poll/PollAPI';

import { Category } from '../../PollPage';
import { Answer } from '../poll-form/PollForm';

import AnswersSaved from './AnswersSaved';

import styles from './AnswersSheet.module.scss';

interface AnswersSheetProps {
  questions: Category;
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setQuestionsListStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isTheLast: boolean;
  isValid: boolean;
  current: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const initialValues = {};

enum SendingStatus {
  ANY = 'any',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const collectAnswers = (answers: Answer[], values) => {
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

export const getProgress = (answers: Answer[], questions) => {
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
  questions,
  isTheLast,
  current,
  answers,
  setQuestionsListStatus,
  setAnswers,
  setProgress,
  isValid,
  setCurrent,
}) => {
  for (const question of questions.questions) {
    if (question.type === 'SCALE') {
      initialValues[question.id] = 1;
    }
  }
  const handleSubmit = data => {
    console.log('answered data', data);
  };

  const [sendingStatus, setIsSendingStatus] = useState<SendingStatus>(
    SendingStatus.ANY,
  );
  const router = useRouter();
  const disciplineTeacherId = router.query.disciplineTeacherId as string;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    for (const question of questions.questions) {
      if (question.type === 'SCALE') {
        initialValues[question.id] = '1';
      }
    }
  }, [questions]);

  const answer = values => {
    const resultAnswers = collectAnswers(answers, values);
    setAnswers(resultAnswers);
    const count = getProgress(resultAnswers, questions.questions);
    setProgress(previousProgress => {
      const temp = [...previousProgress];
      temp[current] = count;
      return temp;
    });
  };

  return (
    <div className={styles.wrapper}>
      {sendingStatus === SendingStatus.LOADING ? (
        <div className={styles.loaderWrapper}>
          <Loader />
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
            <ArrowButton className={styles.arrow} />
            <b>
              {current + 1} . {questions.name}
            </b>
          </div>
          <div className={styles.answersWrapper}>
            <Formik
              validateOnMount
              validateOnChange
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values }) => (
                <Form
                  onChange={() => {
                    answer(values);
                  }}
                  className={styles['form']}
                >
                  {questions.questions.map((question, id) => (
                    <div key={question.id} className={styles['question']}>
                      {question.type === 'TEXT' ? (
                        <p className={styles['question-number']}>
                          Відкрите питання
                        </p>
                      ) : (
                        <p className={styles['question-number']}>
                          Питання {id + 1} / {questions.count}
                        </p>
                      )}

                      <b className={styles['question-title']}>
                        {question.name}
                      </b>
                      {question.description && (
                        <p className={styles['question-description']}>
                          {question.description}
                        </p>
                      )}
                      {question.type === 'SCALE' ? (
                        <Slider
                          className={styles['slider']}
                          name={question.id}
                        />
                      ) : question.type === 'TOGGLE' ? (
                        <RadioGroup
                          className={styles['options']}
                          options={[
                            { value: '1', label: 'так' },
                            { value: '0', label: 'ні' },
                          ]}
                          name={question.id}
                        />
                      ) : (
                        <TextArea
                          className={styles['textarea']}
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
                      } else {
                        setIsSendingStatus(SendingStatus.LOADING);
                        try {
                          setErrorMessage('');
                          console.log(answers);
                          const data = await PollAPI.createTeacherGrade(
                            { answers },
                            disciplineTeacherId,
                          );
                          console.log(data);
                          setIsSendingStatus(SendingStatus.SUCCESS);
                        } catch (e) {
                          setErrorMessage(e.response.data.message);
                          setIsSendingStatus(SendingStatus.ERROR);
                        }
                      }
                    }}
                  />
                </Form>
              )}
            </Formik>
          </div>
          {errorMessage && (
            <AlertPopup
              title="Помилка"
              description={errorMessage}
              variant={AlertVariant.FILLED}
              color={AlertColor.ERROR}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AnswersSheet;
