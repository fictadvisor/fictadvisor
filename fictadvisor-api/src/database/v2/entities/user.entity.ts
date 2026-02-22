import { DbQuestionAnswer } from './question-answer.entity';
import { DbStudent } from './student.entity';
import { State } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbUser {
  @AutoMap()
    id: string;

  @AutoMap()
    username: string | null;

  @AutoMap()
    email: string;

  @AutoMap()
    telegramId: bigint | null;

  @AutoMap()
    avatar: string | null;

  @AutoMap()
    state: State;

  @AutoMap()
    password: string | null;

  @AutoMap()
    lastPasswordChanged: Date;

  @AutoMap(() => DbStudent)
    student?: DbStudent;

  @AutoMap(() => [DbQuestionAnswer])
    questionAnswers?: DbQuestionAnswer[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
