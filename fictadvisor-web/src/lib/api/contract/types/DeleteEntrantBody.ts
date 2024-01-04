import { Fullname } from '@/types/contract';

export enum EntrantDeleteOptions {
  PRIORITY = 'priority',
  CONTRACT = 'contract',
  ENTRANT = 'entrant',
}

export interface DeleteEntrantBody extends Fullname {
  action: EntrantDeleteOptions;
}
