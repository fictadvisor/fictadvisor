import { DbQuestionAnswer } from './DbQuestionAnswer';
import { DbStudent } from './DbStudent';
import { State } from '@prisma/client/fictadvisor';

export class DbUser {
  id: string;
  username: string | null;
  email: string;
  telegramId: bigint | null;
  avatar: string | null;
  state: State;
  password: string | null;
  lastPasswordChanged: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
  student?: DbStudent;
  questionAnswers?: DbQuestionAnswer[];
}
