export enum EntrantDeleteOptions {
  PRIORITY = 'priority',
  CONTRACT = 'contract',
  ENTRANT = 'entrant',
}

export interface DeleteEntrantBody {
  firstName: string;
  lastName: string;
  middleName?: string;

  action: EntrantDeleteOptions;
}
