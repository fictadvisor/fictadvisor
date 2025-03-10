import { DbUser } from './DbUser';
import { State } from '@fictadvisor/utils';

export class DbSuperhero {
  user: DbUser;
  userId: string;
  dorm: boolean;
  state: State;
  createdAt: Date;
  updatedAt: Date;
}
