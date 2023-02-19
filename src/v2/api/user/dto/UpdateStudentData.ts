import { State } from '@prisma/client';

export class UpdateStudentData {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  groupId?: string;
  state?: State;
}