import { create } from 'zustand';

import { SendingStatus } from '@/components/pages/poll-page/components/poll-form/types';
import { Answer, QuestionDisplay, QuestionType } from '@/types/poll';
import { Category } from '@/types/poll';
type Action = {
  setIsValid: (newValue: boolean) => void;
  setQuestionsListOpened: (newValue: boolean) => void;
  setCurrentQuestions: (newValue: Category) => void;
  setAnswers: (newAnswers: Answer[]) => void;
  setCurrentCategory: (newCategory: number) => void;
  setIsSendingStatus: (newStatus: SendingStatus) => void;
};

type State = {
  isValid: boolean;
  isQuestionsListOpened: boolean;
  currentQuestions: Category;
  answers: Answer[];
  currentCategory: number;
  sendingStatus: SendingStatus;
};

const initialValue: State = {
  isQuestionsListOpened: false,
  isValid: false,
  currentQuestions: {
    name: '',
    count: 1,
    questions: [
      {
        id: '',
        name: '',
        criteria: '',
        isRequired: true,
        text: '',
        type: QuestionType.TOGGLE,
        description: '',
        display: QuestionDisplay.AMOUNT,
      },
    ],
  },
  answers: [],
  currentCategory: 0,
  sendingStatus: SendingStatus.ANY,
};

export const usePollStore = create<State & Action>()(set => ({
  ...initialValue,

  setQuestionsListOpened: (newValue: boolean) =>
    set({ isQuestionsListOpened: newValue }),
  setIsValid: (newValue: boolean) => set({ isValid: newValue }),
  setCurrentQuestions: (newValue: Category) =>
    set({ currentQuestions: newValue }),
  setAnswers: (newAnswers: Answer[]) => set({ answers: newAnswers }),
  setCurrentCategory: (newCategory: number) =>
    set({ currentCategory: newCategory }),
  setIsSendingStatus: (newStatus: SendingStatus) =>
    set({ sendingStatus: newStatus }),
}));
