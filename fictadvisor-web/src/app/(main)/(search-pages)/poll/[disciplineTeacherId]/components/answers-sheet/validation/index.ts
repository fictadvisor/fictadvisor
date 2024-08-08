import { QuestionType } from '@fictadvisor/utils/enums';
import * as yup from 'yup';
import { AnyObject } from 'yup';

import { Category, Question } from '@/types/poll';

export const createValidationSchema = (currentQuestions: Category) => {
  const validationSchemaObject: Record<
    string,
    yup.StringSchema<string | undefined, AnyObject, undefined, ''>
  > = {};

  currentQuestions?.questions.forEach((question: Question) => {
    if (question.type === QuestionType.TEXT) {
      validationSchemaObject[question.id] = yup
        .string()
        .min(20, 'Текст повинен містити не менше 20 символів');
    }
  });

  return yup.object().shape(validationSchemaObject);
};
